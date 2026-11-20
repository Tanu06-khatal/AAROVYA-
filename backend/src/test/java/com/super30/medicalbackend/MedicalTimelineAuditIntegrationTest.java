package com.super30.medicalbackend;

import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

import java.time.LocalDate;
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
import com.super30.medicalbackend.exception.UnauthorizedAccessException;
import com.super30.medicalbackend.services.AuditLogService;
import com.super30.medicalbackend.services.RecordShareService;
import com.super30.medicalbackend.services.implementation.MedicalTimelineServiceImpl;

@ExtendWith(MockitoExtension.class)
class MedicalTimelineAuditIntegrationTest {
    private static final Long PATIENT = 101L;
    private static final Long TIMELINE_ID = 201L;
    @Mock private MedicalTimelineDao timelines;
    @Mock private AuditLogService audit;
    @Mock private RecordShareService shares;
    @InjectMocks private MedicalTimelineServiceImpl service;
    private MedicalTimeline timeline;

    @BeforeEach void setUp() {
        timeline = new MedicalTimeline();
        timeline.setTimelineId(TIMELINE_ID);
        timeline.setPatientId(PATIENT);
        timeline.setRecordType(RecordType.DIAGNOSIS);
        timeline.setTitle("Example");
        timeline.setRecordDate(LocalDate.now());
    }

    @Test void logsMedicalTimelineCreateUpdateViewAndDelete() {
        when(timelines.save(any(MedicalTimeline.class))).thenAnswer(call -> {
            MedicalTimeline saved = call.getArgument(0);
            saved.setTimelineId(TIMELINE_ID);
            return saved;
        });
        when(timelines.findById(TIMELINE_ID)).thenReturn(Optional.of(timeline));
        MedicalTimelineRequest request = new MedicalTimelineRequest(PATIENT, RecordType.DIAGNOSIS,
                "Example", "private clinical text", LocalDate.now());

        service.create(PATIENT, request);
        service.get(PATIENT, TIMELINE_ID);
        service.update(PATIENT, TIMELINE_ID, request);
        service.delete(PATIENT, TIMELINE_ID);

        verify(audit).record(PATIENT, AuditAction.RECORD_CREATED, "MEDICAL_TIMELINE", TIMELINE_ID);
        verify(audit).record(PATIENT, AuditAction.RECORD_VIEWED, "MEDICAL_TIMELINE", TIMELINE_ID);
        verify(audit).record(PATIENT, AuditAction.RECORD_UPDATED, "MEDICAL_TIMELINE", TIMELINE_ID);
        verify(audit).record(PATIENT, AuditAction.RECORD_DELETED, "MEDICAL_TIMELINE", TIMELINE_ID);
    }

    @Test void logsDeniedMedicalRecordAccessWithoutLoggingRecordContents() {
        when(timelines.findById(TIMELINE_ID)).thenReturn(Optional.of(timeline));
        when(shares.canAccess(999L, TIMELINE_ID)).thenReturn(false);

        assertThrows(UnauthorizedAccessException.class, () -> service.get(999L, TIMELINE_ID));

        verify(audit).record(999L, AuditAction.RECORD_ACCESS_DENIED, "MEDICAL_TIMELINE", TIMELINE_ID);
        verify(audit, never()).record(anyLong(), eq(AuditAction.RECORD_VIEWED), anyString(), anyLong());
    }
}
