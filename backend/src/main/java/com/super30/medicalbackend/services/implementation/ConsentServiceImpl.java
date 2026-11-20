
package com.super30.medicalbackend.services.implementation;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.super30.medicalbackend.dao.ConsentDao;
import com.super30.medicalbackend.dao.MedicalTimelineDao;
import com.super30.medicalbackend.dto.ConsentRequest;
import com.super30.medicalbackend.dto.ConsentResponse;
import com.super30.medicalbackend.entities.Consent;
import com.super30.medicalbackend.entities.MedicalTimeline;
import com.super30.medicalbackend.enums.AuditAction;
import com.super30.medicalbackend.enums.ConsentStatus;
import com.super30.medicalbackend.exception.ResourceNotFoundException;
import com.super30.medicalbackend.exception.UnauthorizedAccessException;
import com.super30.medicalbackend.services.AuditLogService;
import com.super30.medicalbackend.services.ConsentService;
@Service @Transactional
public class ConsentServiceImpl implements ConsentService {
    private final ConsentDao consents;
    private final MedicalTimelineDao timelines;
    private final AuditLogService audit;

    public ConsentServiceImpl(ConsentDao consents, MedicalTimelineDao timelines, AuditLogService audit) {
        this.consents = consents;
        this.timelines = timelines;
        this.audit = audit;
    }

    @Override
    public ConsentResponse grant(Long actorId, ConsentRequest request) {
        if (request == null || request.grantedToUserId() == null || request.grantedToUserId() <= 0
                || (request.timelineId() != null && request.timelineId() <= 0)
                || request.purpose() == null || request.purpose().isBlank()
                || request.purpose().trim().length() > 300
                || (request.expiresAt() != null && !request.expiresAt().isAfter(LocalDateTime.now()))) {
            throw new IllegalArgumentException("Consent request fields or expiry date are invalid");
        }
        if (actorId.equals(request.grantedToUserId())) {
            throw new IllegalArgumentException("A patient cannot grant consent to themselves");
        }
        if (request.timelineId() != null) {
            ownerRecord(actorId, request.timelineId());
        }

        LocalDateTime now = LocalDateTime.now();
        List<Consent> existing = consents.findByPatientIdAndGrantedToUserId(actorId, request.grantedToUserId());
        for (Consent consent : existing) {
            if (Objects.equals(consent.getTimelineId(), request.timelineId())) {
                if (consent.expireIfNeeded(now)) consents.save(consent);
                if (consent.getStatus() == ConsentStatus.GRANTED) {
                    throw new IllegalArgumentException("Valid consent already exists for this scope");
                }
            }
        }
        consents.flush();
        if (consents.existsValidConsentForScope(actorId, request.grantedToUserId(), request.timelineId(), now)) {
            throw new IllegalArgumentException("Valid consent already exists for this scope");
        }

        Consent consent = consents.save(new Consent(actorId, request.grantedToUserId(),
                request.timelineId(), request.purpose().trim(), request.expiresAt()));
        audit.record(actorId, AuditAction.CONSENT_GRANTED, "CONSENT", consent.getConsentId());
        return ConsentResponse.from(consent);
    }

    @Override
    public ConsentResponse get(Long actorId, Long consentId) {
        Consent consent = required(consentId);
        requirePatientOrRecipient(actorId, consent);
        expireIfNeeded(consent);
        return ConsentResponse.from(consent);
    }

    @Override
    public List<ConsentResponse> byPatient(Long actorId, Long patientId) {
        requireSameIdentity(actorId, patientId);
        return refreshExpired(consents.findByPatientIdOrderByGrantedAtDesc(patientId));
    }

    @Override
    public List<ConsentResponse> byRecipient(Long actorId, Long userId) {
        requireSameIdentity(actorId, userId);
        return refreshExpired(consents.findByGrantedToUserIdOrderByGrantedAtDesc(userId));
    }

    @Override
    @Transactional(noRollbackFor = IllegalArgumentException.class)
    public ConsentResponse revoke(Long actorId, Long consentId) {
        Consent consent = required(consentId);
        if (!actorId.equals(consent.getPatientId())) {
            audit.record(actorId, AuditAction.RECORD_ACCESS_DENIED, "CONSENT", consentId);
            throw new UnauthorizedAccessException("Only the patient who granted consent may revoke it");
        }
        if (expireIfNeeded(consent)) {
            throw new IllegalArgumentException("Expired consent cannot be revoked");
        }
        if (consent.getStatus() != ConsentStatus.GRANTED) {
            throw new IllegalArgumentException("Only currently granted consent can be revoked");
        }
        consent.revoke();
        audit.record(actorId, AuditAction.CONSENT_REVOKED, "CONSENT", consentId);
        return ConsentResponse.from(consent);
    }

    @Override
    public boolean hasValidConsent(Long patientId, Long userId, Long timelineId) {
        if (timelineId != null) {
            MedicalTimeline timeline = timelines.findById(timelineId).orElse(null);
            if (timeline == null || !patientId.equals(timeline.getPatientId())) return false;
        }
        List<Consent> matching = consents.findByPatientIdAndGrantedToUserId(patientId, userId).stream()
                .filter(c -> timelineId == null ? c.getTimelineId() == null
                        : c.getTimelineId() == null || c.getTimelineId().equals(timelineId)).toList();
        matching.forEach(this::expireIfNeeded);
        return consents.hasValidConsentForRecord(patientId, userId, timelineId, LocalDateTime.now());
    }

    /** Legacy lookup retained for integrations using the previous record-scoped controller. */
    @Override
    public List<ConsentResponse> forRecord(Long actorId, Long timelineId) {
        ownerRecord(actorId, timelineId);
        return consents.findByPatientIdOrderByGrantedAtDesc(actorId).stream()
                .filter(c -> c.getTimelineId() == null || c.getTimelineId().equals(timelineId))
                .map(c -> { expireIfNeeded(c); return ConsentResponse.from(c); }).toList();
    }

    @Override
    public ConsentResponse revoke(Long actorId, Long timelineId, Long granteeId) {
        Consent consent = consents.findByPatientIdAndGrantedToUserId(actorId, granteeId).stream()
                .filter(c -> Objects.equals(c.getTimelineId(), timelineId)).findFirst()
                .orElseThrow(() -> new ResourceNotFoundException("Consent not found"));
        return revoke(actorId, consent.getConsentId());
    }

    private List<ConsentResponse> refreshExpired(List<Consent> values) {
        values.forEach(this::expireIfNeeded);
        return values.stream().map(ConsentResponse::from).toList();
    }

    private boolean expireIfNeeded(Consent consent) {
        return consent.expireIfNeeded(LocalDateTime.now());
    }

    private Consent required(Long consentId) {
        return consents.findById(consentId)
                .orElseThrow(() -> new ResourceNotFoundException("Consent not found"));
    }

    private MedicalTimeline ownerRecord(Long actorId, Long timelineId) {
        MedicalTimeline record = timelines.findById(timelineId)
                .orElseThrow(() -> new ResourceNotFoundException("Medical record not found"));
        if (!actorId.equals(record.getPatientId())) {
            audit.record(actorId, AuditAction.RECORD_ACCESS_DENIED, "MEDICAL_TIMELINE", timelineId);
            throw new UnauthorizedAccessException("Only the patient who owns the record may grant consent");
        }
        return record;
    }

    private void requirePatientOrRecipient(Long actorId, Consent consent) {
        if (!actorId.equals(consent.getPatientId()) && !actorId.equals(consent.getGrantedToUserId())) {
            audit.record(actorId, AuditAction.RECORD_ACCESS_DENIED, "CONSENT", consent.getConsentId());
            throw new UnauthorizedAccessException("Only the patient or consent recipient may view this consent");
        }
    }

    private void requireSameIdentity(Long actorId, Long requestedUserId) {
        if (!actorId.equals(requestedUserId)) {
            audit.record(actorId, AuditAction.RECORD_ACCESS_DENIED, "USER", requestedUserId);
            throw new UnauthorizedAccessException("Path user ID must match the authenticated user");
        }
    }
}
