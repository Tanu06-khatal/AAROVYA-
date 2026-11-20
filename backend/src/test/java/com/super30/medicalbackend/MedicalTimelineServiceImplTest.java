package com.super30.medicalbackend;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.super30.medicalbackend.dao.MedicalTimelineDao;
import com.super30.medicalbackend.dto.MedicalTimelineRequest;
import com.super30.medicalbackend.entities.MedicalTimeline;
import com.super30.medicalbackend.enums.AuditAction;
import com.super30.medicalbackend.enums.RecordType;
import com.super30.medicalbackend.exception.ResourceNotFoundException;
import com.super30.medicalbackend.exception.UnauthorizedAccessException;
import com.super30.medicalbackend.services.AuditLogService;
import com.super30.medicalbackend.services.RecordShareService;
import com.super30.medicalbackend.services.implementation.MedicalTimelineServiceImpl;

@ExtendWith(MockitoExtension.class)
class MedicalTimelineServiceImplTest {

    private static final Long PATIENT = 101L;
    private static final Long OTHER_USER = 202L;
    private static final Long TIMELINE_ID = 303L;

    @Mock private MedicalTimelineDao dao;
    @Mock private AuditLogService audit;
    @Mock private RecordShareService sharing;
    @InjectMocks private MedicalTimelineServiceImpl service;

    private MedicalTimeline timeline;

    @BeforeEach
    void setUp() {
        timeline = new MedicalTimeline();
        timeline.setTimelineId(TIMELINE_ID);
        timeline.setPatientId(PATIENT);
        timeline.setRecordType(RecordType.DIAGNOSIS);
        timeline.setTitle("Routine checkup");
        timeline.setDescription("Blood pressure normal");
        timeline.setRecordDate(LocalDate.now());
    }

    @Test
    void createsTimelineForAuthenticatedPatient() {
        when(dao.save(any(MedicalTimeline.class))).thenAnswer(call -> {
            MedicalTimeline saved = call.getArgument(0);
            saved.setTimelineId(TIMELINE_ID);
            return saved;
        });

        MedicalTimelineRequest req = new MedicalTimelineRequest(PATIENT, RecordType.DIAGNOSIS,
                "Routine checkup", "Blood pressure normal", LocalDate.now(), 55L);

        var res = service.create(PATIENT, req);

        assertEquals(TIMELINE_ID, res.timelineId());
        assertEquals(PATIENT, res.patientId());
        assertEquals("Routine checkup", res.title());
        assertEquals(55L, res.recordId());
        verify(audit).record(PATIENT, AuditAction.RECORD_CREATED, "MEDICAL_TIMELINE", TIMELINE_ID);
    }

    @Test
    void rejectsCreateWhenPatientIdMismatch() {
        MedicalTimelineRequest req = new MedicalTimelineRequest(OTHER_USER, RecordType.DIAGNOSIS,
                "Fake Record", "Description", LocalDate.now());

        assertThrows(UnauthorizedAccessException.class, () -> service.create(PATIENT, req));
        verify(audit).record(PATIENT, AuditAction.RECORD_ACCESS_DENIED, "MEDICAL_TIMELINE", null);
        verify(dao, never()).save(any());
    }

    @Test
    void retrievesRecordForOwner() {
        when(dao.findById(TIMELINE_ID)).thenReturn(Optional.of(timeline));

        var res = service.get(PATIENT, TIMELINE_ID);

        assertEquals(TIMELINE_ID, res.timelineId());
        verify(audit).record(PATIENT, AuditAction.RECORD_VIEWED, "MEDICAL_TIMELINE", TIMELINE_ID);
    }

    @Test
    void retrievesRecordForAuthorizedRecipient() {
        when(dao.findById(TIMELINE_ID)).thenReturn(Optional.of(timeline));
        when(sharing.canAccess(OTHER_USER, TIMELINE_ID)).thenReturn(true);

        var res = service.get(OTHER_USER, TIMELINE_ID);

        assertEquals(TIMELINE_ID, res.timelineId());
        verify(audit).record(OTHER_USER, AuditAction.RECORD_VIEWED, "MEDICAL_TIMELINE", TIMELINE_ID);
    }

    @Test
    void rejectsGetForUnauthorizedUser() {
        when(dao.findById(TIMELINE_ID)).thenReturn(Optional.of(timeline));
        when(sharing.canAccess(OTHER_USER, TIMELINE_ID)).thenReturn(false);

        assertThrows(UnauthorizedAccessException.class, () -> service.get(OTHER_USER, TIMELINE_ID));
        verify(audit).record(OTHER_USER, AuditAction.RECORD_ACCESS_DENIED, "MEDICAL_TIMELINE", TIMELINE_ID);
    }

    @Test
    void updatesRecordForOwner() {
        when(dao.findById(TIMELINE_ID)).thenReturn(Optional.of(timeline));

        MedicalTimelineRequest updateReq = new MedicalTimelineRequest(PATIENT, RecordType.PRESCRIPTION,
                "Updated Title", "Updated notes", LocalDate.now(), 99L);

        var res = service.update(PATIENT, TIMELINE_ID, updateReq);

        assertEquals("Updated Title", res.title());
        assertEquals(RecordType.PRESCRIPTION, res.recordType());
        verify(audit).record(PATIENT, AuditAction.RECORD_UPDATED, "MEDICAL_TIMELINE", TIMELINE_ID);
    }

    @Test
    void rejectsUpdateForNonOwner() {
        when(dao.findById(TIMELINE_ID)).thenReturn(Optional.of(timeline));

        MedicalTimelineRequest updateReq = new MedicalTimelineRequest(OTHER_USER, RecordType.PRESCRIPTION,
                "Hacked", "Notes", LocalDate.now());

        assertThrows(UnauthorizedAccessException.class, () -> service.update(OTHER_USER, TIMELINE_ID, updateReq));
        verify(audit).record(OTHER_USER, AuditAction.RECORD_ACCESS_DENIED, "MEDICAL_TIMELINE", TIMELINE_ID);
    }

    @Test
    void deletesRecordForOwner() {
        when(dao.findById(TIMELINE_ID)).thenReturn(Optional.of(timeline));

        service.delete(PATIENT, TIMELINE_ID);

        verify(dao).delete(timeline);
        verify(audit).record(PATIENT, AuditAction.RECORD_DELETED, "MEDICAL_TIMELINE", TIMELINE_ID);
    }

    @Test
    void listsTimelineForOwner() {
        when(dao.findByPatientIdOrderByRecordDateDescCreatedAtDesc(PATIENT)).thenReturn(List.of(timeline));

        var list = service.history(PATIENT, PATIENT);

        assertEquals(1, list.size());
        assertEquals(TIMELINE_ID, list.get(0).timelineId());
    }

    @Test
    void rejectsHistoryForDifferentUser() {
        assertThrows(UnauthorizedAccessException.class, () -> service.history(OTHER_USER, PATIENT));
        verify(audit).record(OTHER_USER, AuditAction.RECORD_ACCESS_DENIED, "MEDICAL_TIMELINE", PATIENT);
    }

    @Test
    void throwsNotFoundForUnknownRecord() {
        when(dao.findById(999L)).thenReturn(Optional.empty());
        assertThrows(ResourceNotFoundException.class, () -> service.get(PATIENT, 999L));
    }
}
