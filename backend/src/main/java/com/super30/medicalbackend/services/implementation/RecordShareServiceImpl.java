package com.super30.medicalbackend.services.implementation;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.super30.medicalbackend.dao.ConsentDao;
import com.super30.medicalbackend.dao.MedicalTimelineDao;
import com.super30.medicalbackend.dao.RecordShareDao;
import com.super30.medicalbackend.dto.RecordShareRequest;
import com.super30.medicalbackend.dto.RecordShareResponse;
import com.super30.medicalbackend.entities.Consent;
import com.super30.medicalbackend.entities.MedicalTimeline;
import com.super30.medicalbackend.entities.RecordShare;
import com.super30.medicalbackend.enums.AuditAction;
import com.super30.medicalbackend.enums.ConsentStatus;
import com.super30.medicalbackend.enums.ShareStatus;
import com.super30.medicalbackend.exception.ResourceNotFoundException;
import com.super30.medicalbackend.exception.UnauthorizedAccessException;
import com.super30.medicalbackend.services.AuditLogService;
import com.super30.medicalbackend.services.RecordShareService;

@Service
@Transactional
public class RecordShareServiceImpl implements RecordShareService {

    private final RecordShareDao shares;
    private final MedicalTimelineDao records;
    private final ConsentDao consents;
    private final AuditLogService audit;

    public RecordShareServiceImpl(RecordShareDao shares, MedicalTimelineDao records,
                                  ConsentDao consents, AuditLogService audit) {
        this.shares = shares;
        this.records = records;
        this.consents = consents;
        this.audit = audit;
    }

    @Override
    public RecordShareResponse request(Long actorId, RecordShareRequest request) {
        MedicalTimeline timeline = records.findById(request.timelineId())
                .orElseThrow(() -> new ResourceNotFoundException("Medical record not found"));
        if (!actorId.equals(timeline.getPatientId())) {
            audit.record(actorId, AuditAction.RECORD_ACCESS_DENIED, "MEDICAL_TIMELINE", timeline.getTimelineId());
            throw new UnauthorizedAccessException("Only the record owner may request sharing");
        }
        if (actorId.equals(request.receiverId())) {
            throw new IllegalArgumentException("A record cannot be shared with its owner");
        }

        RecordShare share = shares.findByTimelineIdAndReceiverId(
                request.timelineId(), request.receiverId()).orElse(null);
        if (share != null && share.isExpired()) {
            share.markExpired();
        }
        if (share != null && (share.getStatus() == ShareStatus.PENDING
                || share.getStatus() == ShareStatus.ACTIVE)) {
            throw new IllegalArgumentException("A pending or active share already exists");
        }
        if (share == null) {
            share = new RecordShare(actorId, request.receiverId(), request.timelineId(), request.purpose(), request.expiresAt());
        } else {
            share.setPurpose(request.purpose());
            share.requestAgain(request.expiresAt());
        }
        share = shares.save(share);
        audit.record(actorId, AuditAction.RECORD_SHARED, "RECORD_SHARE", share.getShareId());
        return RecordShareResponse.from(share);
    }

    @Override
    public RecordShareResponse get(Long actorId, Long shareId) {
        RecordShare share = required(shareId);
        if (!actorId.equals(share.getOwnerId()) && !actorId.equals(share.getReceiverId())) {
            audit.record(actorId, AuditAction.RECORD_ACCESS_DENIED, "RECORD_SHARE", shareId);
            throw new UnauthorizedAccessException("Only the owner or receiver may view this share");
        }
        return RecordShareResponse.from(expireIfNeeded(share));
    }

    @Override
    public List<RecordShareResponse> byOwner(Long actorId, Long ownerId) {
        requirePathIdentity(actorId, ownerId);
        return refreshExpired(shares.findByOwnerIdOrderByRequestedAtDesc(ownerId));
    }

    @Override
    public List<RecordShareResponse> byReceiver(Long actorId, Long receiverId) {
        requirePathIdentity(actorId, receiverId);
        return refreshExpired(shares.findByReceiverIdOrderByRequestedAtDesc(receiverId));
    }

    @Override
    @Transactional(noRollbackFor = IllegalArgumentException.class)
    public RecordShareResponse accept(Long actorId, Long shareId) {
        RecordShare share = required(shareId);
        requireReceiver(actorId, share, shareId);
        if (share.isExpired()) {
            share.markExpired();
            shares.save(share);
            throw new IllegalArgumentException("The share request has expired");
        }
        boolean awaitingResponse = share.getStatus() == ShareStatus.PENDING
                || (share.getStatus() == ShareStatus.ACTIVE && share.getRespondedAt() == null);
        if (!awaitingResponse) {
            throw new IllegalArgumentException("Only a pending request can be accepted");
        }
        share.accept();

        // Harmonize with Consent: ensure active consent exists for this scope
        Long patientId = records.findById(share.getTimelineId())
                .map(MedicalTimeline::getPatientId)
                .orElse(share.getOwnerId());
        if (!consents.hasValidConsentForRecord(patientId, actorId, share.getTimelineId(), LocalDateTime.now())) {
            consents.save(new Consent(patientId, actorId, share.getTimelineId(),
                    share.getPurpose() != null ? share.getPurpose() : "Medical record sharing",
                    share.getExpiresAt()));
        }

        audit.record(actorId, AuditAction.SHARE_ACCEPTED, "RECORD_SHARE", shareId);
        return RecordShareResponse.from(share);
    }

    @Override
    @Transactional(noRollbackFor = IllegalArgumentException.class)
    public RecordShareResponse reject(Long actorId, Long shareId) {
        RecordShare share = required(shareId);
        requireReceiver(actorId, share, shareId);
        if (share.isExpired()) {
            share.markExpired();
            shares.save(share);
            throw new IllegalArgumentException("The share request has expired");
        }
        boolean awaitingResponse = share.getStatus() == ShareStatus.PENDING
                || (share.getStatus() == ShareStatus.ACTIVE && share.getRespondedAt() == null);
        if (!awaitingResponse) {
            throw new IllegalArgumentException("Only a pending request can be rejected");
        }
        share.reject();
        audit.record(actorId, AuditAction.SHARE_REJECTED, "RECORD_SHARE", shareId);
        return RecordShareResponse.from(share);
    }

    @Override
    @Transactional(noRollbackFor = IllegalArgumentException.class)
    public RecordShareResponse revoke(Long actorId, Long shareId) {
        RecordShare share = required(shareId);
        if (!actorId.equals(share.getOwnerId())) {
            audit.record(actorId, AuditAction.RECORD_ACCESS_DENIED, "RECORD_SHARE", shareId);
            throw new UnauthorizedAccessException("Only the owner may revoke a share");
        }
        if (share.isExpired()) {
            share.markExpired();
            shares.save(share);
            throw new IllegalArgumentException("The share has expired");
        }
        if (share.getStatus() != ShareStatus.ACTIVE || share.getRespondedAt() == null) {
            throw new IllegalArgumentException("Only an accepted active share can be revoked");
        }
        share.revoke();

        // Harmonize with Consent: revoke matching consent
        List<Consent> matchingConsents = consents.findByPatientIdAndGrantedToUserId(share.getOwnerId(), share.getReceiverId());
        for (Consent c : matchingConsents) {
            if (Objects.equals(c.getTimelineId(), share.getTimelineId()) && c.getStatus() == ConsentStatus.GRANTED) {
                c.revoke();
            }
        }

        audit.record(actorId, AuditAction.SHARE_REVOKED, "RECORD_SHARE", shareId);
        return RecordShareResponse.from(share);
    }

    @Override
    public boolean canAccess(Long actorId, Long timelineId) {
        RecordShare share = shares.findByTimelineIdAndReceiverId(timelineId, actorId).orElse(null);
        if (share == null) return false;
        if (share.isExpired() && share.getStatus() != ShareStatus.REVOKED
                && share.getStatus() != ShareStatus.REJECTED && share.getStatus() != ShareStatus.EXPIRED) {
            share.markExpired();
        }
        if (share.getStatus() != ShareStatus.ACTIVE || share.getRespondedAt() == null) return false;
        Long patientId = records.findById(timelineId).map(MedicalTimeline::getPatientId).orElse(null);
        return patientId != null && consents.hasValidConsentForRecord(
                patientId, actorId, timelineId, LocalDateTime.now());
    }

    @Override
    public List<RecordShareResponse> mine(Long actorId) { return byOwner(actorId, actorId); }

    @Override
    public List<RecordShareResponse> received(Long actorId) { return byReceiver(actorId, actorId); }

    private RecordShare required(Long shareId) {
        return shares.findById(shareId)
                .orElseThrow(() -> new ResourceNotFoundException("Share request not found"));
    }

    private RecordShare expireIfNeeded(RecordShare share) {
        if (share.isExpired() && share.getStatus() != ShareStatus.REVOKED
                && share.getStatus() != ShareStatus.REJECTED && share.getStatus() != ShareStatus.EXPIRED) {
            share.markExpired();
        }
        return share;
    }

    private List<RecordShareResponse> refreshExpired(List<RecordShare> values) {
        return values.stream().map(this::expireIfNeeded).map(RecordShareResponse::from).toList();
    }

    private void requireReceiver(Long actorId, RecordShare share, Long shareId) {
        if (!actorId.equals(share.getReceiverId())) {
            Long targetShareId = share.getShareId() != null ? share.getShareId() : shareId;
            audit.record(actorId, AuditAction.RECORD_ACCESS_DENIED, "RECORD_SHARE", targetShareId);
            throw new UnauthorizedAccessException("Only the receiver may respond to this request");
        }
    }

    private void requirePathIdentity(Long actorId, Long pathUserId) {
        if (!actorId.equals(pathUserId)) {
            audit.record(actorId, AuditAction.RECORD_ACCESS_DENIED, "USER", pathUserId);
            throw new UnauthorizedAccessException("Path user ID must match the authenticated user");
        }
    }
}
