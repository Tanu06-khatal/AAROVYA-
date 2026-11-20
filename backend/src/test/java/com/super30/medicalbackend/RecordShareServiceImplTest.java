package com.super30.medicalbackend;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

import java.time.LocalDateTime;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.super30.medicalbackend.dao.ConsentDao;
import com.super30.medicalbackend.dao.MedicalTimelineDao;
import com.super30.medicalbackend.dao.RecordShareDao;
import com.super30.medicalbackend.dto.RecordShareRequest;
import com.super30.medicalbackend.entities.Consent;
import com.super30.medicalbackend.entities.MedicalTimeline;
import com.super30.medicalbackend.entities.RecordShare;
import com.super30.medicalbackend.enums.AuditAction;
import com.super30.medicalbackend.enums.ConsentStatus;
import com.super30.medicalbackend.enums.ShareStatus;
import com.super30.medicalbackend.exception.UnauthorizedAccessException;
import com.super30.medicalbackend.services.AuditLogService;
import com.super30.medicalbackend.services.implementation.RecordShareServiceImpl;

@ExtendWith(MockitoExtension.class)
class RecordShareServiceImplTest {
    private static final Long OWNER = 10L, RECEIVER = 20L, TIMELINE = 30L, SHARE_ID = 40L;

    @Mock private RecordShareDao shares;
    @Mock private MedicalTimelineDao timelines;
    @Mock private ConsentDao consents;
    @Mock private AuditLogService audit;
    @InjectMocks private RecordShareServiceImpl service;
    private MedicalTimeline timeline;

    @BeforeEach void setUp() {
        timeline = new MedicalTimeline();
        timeline.setTimelineId(TIMELINE);
        timeline.setPatientId(OWNER);
    }

    @Test void createsShareRequestForOwnedTimeline() {
        when(timelines.findById(TIMELINE)).thenReturn(Optional.of(timeline));
        when(shares.findByTimelineIdAndReceiverId(TIMELINE, RECEIVER)).thenReturn(Optional.empty());
        when(shares.save(any(RecordShare.class))).thenAnswer(call -> call.getArgument(0));
        var response = service.request(OWNER, new RecordShareRequest(RECEIVER, TIMELINE, LocalDateTime.now().plusDays(2)));
        assertEquals(OWNER, response.ownerId());
        assertEquals(RECEIVER, response.receiverId());
        assertEquals(TIMELINE, response.timelineId());
        assertEquals(ShareStatus.PENDING, response.status());
        verify(audit).record(OWNER, AuditAction.RECORD_SHARED, "RECORD_SHARE", null);
    }

    @Test void acceptsRequestOnlyForReceiver() {
        when(shares.findById(SHARE_ID)).thenReturn(Optional.of(new RecordShare(OWNER, RECEIVER, TIMELINE, null)));
        var response = service.accept(RECEIVER, SHARE_ID);
        assertEquals(ShareStatus.ACTIVE, response.status());
        assertNotNull(response.respondedAt());
        verify(audit).record(RECEIVER, AuditAction.SHARE_ACCEPTED, "RECORD_SHARE", SHARE_ID);
    }

    @Test void rejectsRequestOnlyForReceiver() {
        when(shares.findById(SHARE_ID)).thenReturn(Optional.of(new RecordShare(OWNER, RECEIVER, TIMELINE, null)));
        var response = service.reject(RECEIVER, SHARE_ID);
        assertEquals(ShareStatus.REJECTED, response.status());
        assertNotNull(response.respondedAt());
        verify(audit).record(RECEIVER, AuditAction.SHARE_REJECTED, "RECORD_SHARE", SHARE_ID);
    }

    @Test void ownerCanRevokeAcceptedShare() {
        RecordShare share = new RecordShare(OWNER, RECEIVER, TIMELINE, null);
        share.accept();
        when(shares.findById(SHARE_ID)).thenReturn(Optional.of(share));
        var response = service.revoke(OWNER, SHARE_ID);
        assertEquals(ShareStatus.REVOKED, response.status());
        assertNotNull(response.revokedAt());
        verify(audit).record(OWNER, AuditAction.SHARE_REVOKED, "RECORD_SHARE", SHARE_ID);
    }

    @Test void preventsDuplicatePendingRequest() {
        when(timelines.findById(TIMELINE)).thenReturn(Optional.of(timeline));
        when(shares.findByTimelineIdAndReceiverId(TIMELINE, RECEIVER))
                .thenReturn(Optional.of(new RecordShare(OWNER, RECEIVER, TIMELINE, null)));
        assertThrows(IllegalArgumentException.class,
                () -> service.request(OWNER, new RecordShareRequest(RECEIVER, TIMELINE, null)));
        verify(shares, never()).save(any(RecordShare.class));
    }

    @Test void expiredShareDoesNotGrantAccess() {
        RecordShare expired = new RecordShare(OWNER, RECEIVER, TIMELINE, LocalDateTime.now().minusMinutes(1));
        expired.accept();
        when(shares.findByTimelineIdAndReceiverId(TIMELINE, RECEIVER)).thenReturn(Optional.of(expired));
        assertFalse(service.canAccess(RECEIVER, TIMELINE));
        assertEquals(ShareStatus.EXPIRED, expired.getStatus());
    }

    @Test void rejectsNonOwnerShareCreation() {
        when(timelines.findById(TIMELINE)).thenReturn(Optional.of(timeline));
        assertThrows(UnauthorizedAccessException.class,
                () -> service.request(999L, new RecordShareRequest(RECEIVER, TIMELINE, null)));
        verify(shares, never()).save(any(RecordShare.class));
    }

    @Test void rejectsAcceptAndRejectByNonReceiverAndRevokeByNonOwner() {
        when(shares.findById(SHARE_ID)).thenReturn(Optional.of(new RecordShare(OWNER, RECEIVER, TIMELINE, null)));
        assertThrows(UnauthorizedAccessException.class, () -> service.accept(OWNER, SHARE_ID));
        assertThrows(UnauthorizedAccessException.class, () -> service.reject(OWNER, SHARE_ID));
        assertThrows(UnauthorizedAccessException.class, () -> service.revoke(RECEIVER, SHARE_ID));
        verify(audit, times(3)).record(anyLong(), eq(AuditAction.RECORD_ACCESS_DENIED),
                eq("RECORD_SHARE"), eq(SHARE_ID));
    }

    @Test void grantsAccessOnlyForAcceptedUnexpiredShareWithConsent() {
        RecordShare active = new RecordShare(OWNER, RECEIVER, TIMELINE, LocalDateTime.now().plusDays(1));
        active.accept();
        MedicalTimeline ownedTimeline = new MedicalTimeline();
        ownedTimeline.setPatientId(OWNER);
        when(shares.findByTimelineIdAndReceiverId(TIMELINE, RECEIVER)).thenReturn(Optional.of(active));
        when(timelines.findById(TIMELINE)).thenReturn(Optional.of(ownedTimeline));
        when(consents.hasValidConsentForRecord(eq(OWNER), eq(RECEIVER), eq(TIMELINE), any())).thenReturn(true);
        assertTrue(service.canAccess(RECEIVER, TIMELINE));
    }
}
