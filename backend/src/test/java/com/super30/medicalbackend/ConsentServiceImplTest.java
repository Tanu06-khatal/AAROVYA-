package com.super30.medicalbackend;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.super30.medicalbackend.dao.ConsentDao;
import com.super30.medicalbackend.dao.MedicalTimelineDao;
import com.super30.medicalbackend.dto.ConsentRequest;
import com.super30.medicalbackend.entities.Consent;
import com.super30.medicalbackend.entities.MedicalTimeline;
import com.super30.medicalbackend.enums.AuditAction;
import com.super30.medicalbackend.enums.ConsentStatus;
import com.super30.medicalbackend.exception.ResourceNotFoundException;
import com.super30.medicalbackend.exception.UnauthorizedAccessException;
import com.super30.medicalbackend.services.AuditLogService;
import com.super30.medicalbackend.services.implementation.ConsentServiceImpl;

@ExtendWith(MockitoExtension.class)
class ConsentServiceImplTest {
    private static final Long PATIENT = 101L;
    private static final Long RECIPIENT = 202L;
    private static final Long TIMELINE = 303L;
    private static final Long CONSENT = 404L;

    @Mock private ConsentDao consents;
    @Mock private MedicalTimelineDao timelines;
    @Mock private AuditLogService audit;
    @InjectMocks private ConsentServiceImpl service;

    private Consent consent() {
        return new Consent(PATIENT, RECIPIENT, TIMELINE, "Consultation", LocalDateTime.now().plusDays(5));
    }

    @Test void grantsConsentSuccessfully() {
        MedicalTimeline timeline = new MedicalTimeline();
        timeline.setPatientId(PATIENT);
        when(timelines.findById(TIMELINE)).thenReturn(Optional.of(timeline));
        when(consents.findByPatientIdAndGrantedToUserId(PATIENT, RECIPIENT)).thenReturn(List.of());
        when(consents.existsValidConsentForScope(eq(PATIENT), eq(RECIPIENT), eq(TIMELINE), any()))
                .thenReturn(false);
        when(consents.save(any(Consent.class))).thenAnswer(call -> call.getArgument(0));

        var response = service.grant(PATIENT,
                new ConsentRequest(RECIPIENT, TIMELINE, "Consultation", LocalDateTime.now().plusDays(5)));

        assertEquals(PATIENT, response.patientId());
        assertEquals(RECIPIENT, response.grantedToUserId());
        assertEquals(ConsentStatus.GRANTED, response.status());
        assertNotNull(response.grantedAt());
        verify(audit).record(PATIENT, AuditAction.CONSENT_GRANTED, "CONSENT", null);
    }

    @Test void getsConsentByIdForPatientOrRecipient() {
        Consent existing = consent();
        when(consents.findById(CONSENT)).thenReturn(Optional.of(existing));
        assertEquals(ConsentStatus.GRANTED, service.get(PATIENT, CONSENT).status());
        assertEquals(ConsentStatus.GRANTED, service.get(RECIPIENT, CONSENT).status());
    }

    @Test void listsConsentsForPatient() {
        when(consents.findByPatientIdOrderByGrantedAtDesc(PATIENT)).thenReturn(List.of(consent()));
        assertEquals(1, service.byPatient(PATIENT, PATIENT).size());
    }

    @Test void listsConsentsForRecipient() {
        when(consents.findByGrantedToUserIdOrderByGrantedAtDesc(RECIPIENT)).thenReturn(List.of(consent()));
        assertEquals(1, service.byRecipient(RECIPIENT, RECIPIENT).size());
    }

    @Test void revokesConsent() {
        Consent existing = consent();
        when(consents.findById(CONSENT)).thenReturn(Optional.of(existing));
        assertEquals(ConsentStatus.REVOKED, service.revoke(PATIENT, CONSENT).status());
        assertNotNull(existing.getRevokedAt());
        verify(audit).record(PATIENT, AuditAction.CONSENT_REVOKED, "CONSENT", CONSENT);
    }

    @Test void onlyPatientMayRevokeConsent() {
        when(consents.findById(CONSENT)).thenReturn(Optional.of(consent()));
        assertThrows(UnauthorizedAccessException.class, () -> service.revoke(RECIPIENT, CONSENT));
        verify(audit).record(RECIPIENT, AuditAction.RECORD_ACCESS_DENIED, "CONSENT", CONSENT);
    }

    @Test void rejectsDuplicateActiveConsent() {
        MedicalTimeline timeline = new MedicalTimeline();
        timeline.setPatientId(PATIENT);
        when(timelines.findById(TIMELINE)).thenReturn(Optional.of(timeline));
        when(consents.findByPatientIdAndGrantedToUserId(PATIENT, RECIPIENT)).thenReturn(List.of(consent()));
        assertThrows(IllegalArgumentException.class, () -> service.grant(PATIENT,
                new ConsentRequest(RECIPIENT, TIMELINE, "Consultation", null)));
        verify(consents, never()).save(any(Consent.class));
    }

    @Test void expiredConsentIsMarkedAndCannotGrantAccess() {
        Consent expired = new Consent(PATIENT, RECIPIENT, TIMELINE, "Consultation", LocalDateTime.now().minusDays(1));
        MedicalTimeline timeline = new MedicalTimeline();
        timeline.setPatientId(PATIENT);
        when(timelines.findById(TIMELINE)).thenReturn(Optional.of(timeline));
        when(consents.findByPatientIdAndGrantedToUserId(PATIENT, RECIPIENT)).thenReturn(List.of(expired));
        when(consents.hasValidConsentForRecord(eq(PATIENT), eq(RECIPIENT), eq(TIMELINE), any())).thenReturn(false);

        assertFalse(service.hasValidConsent(PATIENT, RECIPIENT, TIMELINE));
        assertEquals(ConsentStatus.EXPIRED, expired.getStatus());
    }

    @Test void checksValidAndInvalidConsent() {
        MedicalTimeline timeline = new MedicalTimeline();
        timeline.setPatientId(PATIENT);
        when(timelines.findById(TIMELINE)).thenReturn(Optional.of(timeline));
        when(consents.findByPatientIdAndGrantedToUserId(PATIENT, RECIPIENT)).thenReturn(List.of());
        when(consents.hasValidConsentForRecord(eq(PATIENT), eq(RECIPIENT), eq(TIMELINE), any()))
                .thenReturn(true, false);
        assertTrue(service.hasValidConsent(PATIENT, RECIPIENT, TIMELINE));
        assertFalse(service.hasValidConsent(PATIENT, RECIPIENT, TIMELINE));
    }

    @Test void handlesNonexistentConsent() {
        when(consents.findById(CONSENT)).thenReturn(Optional.empty());
        assertThrows(ResourceNotFoundException.class, () -> service.get(PATIENT, CONSENT));
    }
}
