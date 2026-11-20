package com.super30.medicalbackend.services.implementation;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.super30.medicalbackend.dao.MedicalTimelineDao;
import com.super30.medicalbackend.dto.MedicalTimelineRequest;
import com.super30.medicalbackend.dto.MedicalTimelineResponse;
import com.super30.medicalbackend.entities.MedicalTimeline;
import com.super30.medicalbackend.enums.AuditAction;
import com.super30.medicalbackend.exception.ResourceNotFoundException;
import com.super30.medicalbackend.exception.UnauthorizedAccessException;
import com.super30.medicalbackend.services.AuditLogService;
import com.super30.medicalbackend.services.MedicalTimelineService;
import com.super30.medicalbackend.services.RecordShareService;

@Service
@Transactional
public class MedicalTimelineServiceImpl implements MedicalTimelineService {

    private final MedicalTimelineDao dao;
    private final AuditLogService audit;
    private final RecordShareService sharing;

    public MedicalTimelineServiceImpl(MedicalTimelineDao dao, AuditLogService audit, RecordShareService sharing) {
        this.dao = dao;
        this.audit = audit;
        this.sharing = sharing;
    }

    private MedicalTimeline required(Long id) {
        return dao.findById(id).orElseThrow(() -> new ResourceNotFoundException("Medical record not found"));
    }

    private void owner(Long actor, MedicalTimeline r) {
        if (!actor.equals(r.getPatientId())) {
            audit.record(actor, AuditAction.RECORD_ACCESS_DENIED, "MEDICAL_TIMELINE", r.getTimelineId());
            throw new UnauthorizedAccessException("Only the record owner may perform this action");
        }
    }

    @Override
    public MedicalTimelineResponse create(Long actor, MedicalTimelineRequest q) {
        if (!actor.equals(q.patientId())) {
            audit.record(actor, AuditAction.RECORD_ACCESS_DENIED, "MEDICAL_TIMELINE", null);
            throw new UnauthorizedAccessException("Patient identity must match authenticated user");
        }
        MedicalTimeline r = new MedicalTimeline();
        r.setPatientId(actor);
        r.setRecordType(q.recordType());
        r.setTitle(q.title().trim());
        r.setDescription(q.description());
        r.setRecordDate(q.recordDate());
        if (q.recordId() != null) {
            r.setRecordId(q.recordId());
        }
        r = dao.save(r);
        audit.record(actor, AuditAction.RECORD_CREATED, "MEDICAL_TIMELINE", r.getTimelineId());
        return MedicalTimelineResponse.from(r);
    }

    @Override
    public MedicalTimelineResponse get(Long actor, Long id) {
        MedicalTimeline r = required(id);
        if (!actor.equals(r.getPatientId()) && !sharing.canAccess(actor, id)) {
            audit.record(actor, AuditAction.RECORD_ACCESS_DENIED, "MEDICAL_TIMELINE", id);
            throw new UnauthorizedAccessException("No access to this medical record");
        }
        audit.record(actor, AuditAction.RECORD_VIEWED, "MEDICAL_TIMELINE", id);
        return MedicalTimelineResponse.from(r);
    }

    @Override
    public List<MedicalTimelineResponse> history(Long actor, Long patient) {
        if (!actor.equals(patient)) {
            audit.record(actor, AuditAction.RECORD_ACCESS_DENIED, "MEDICAL_TIMELINE", patient);
            throw new UnauthorizedAccessException("Only the patient may view their complete history");
        }
        audit.record(actor, AuditAction.RECORD_VIEWED, "MEDICAL_TIMELINE", null);
        return dao.findByPatientIdOrderByRecordDateDescCreatedAtDesc(patient)
                .stream()
                .map(MedicalTimelineResponse::from)
                .toList();
    }

    @Override
    public List<MedicalTimelineResponse> mine(Long actor) {
        return history(actor, actor);
    }

    @Override
    public MedicalTimelineResponse update(Long actor, Long id, MedicalTimelineRequest q) {
        MedicalTimeline r = required(id);
        owner(actor, r);
        if (!actor.equals(q.patientId())) {
            audit.record(actor, AuditAction.RECORD_ACCESS_DENIED, "MEDICAL_TIMELINE", id);
            throw new UnauthorizedAccessException("Patient identity cannot be changed");
        }
        r.setRecordType(q.recordType());
        r.setTitle(q.title().trim());
        r.setDescription(q.description());
        r.setRecordDate(q.recordDate());
        if (q.recordId() != null) {
            r.setRecordId(q.recordId());
        }
        audit.record(actor, AuditAction.RECORD_UPDATED, "MEDICAL_TIMELINE", id);
        return MedicalTimelineResponse.from(r);
    }

    @Override
    public void delete(Long actor, Long id) {
        MedicalTimeline r = required(id);
        owner(actor, r);
        dao.delete(r);
        audit.record(actor, AuditAction.RECORD_DELETED, "MEDICAL_TIMELINE", id);
    }

    @Override
    public MedicalTimelineResponse shared(Long actor, Long id) {
        return get(actor, id);
    }
}
