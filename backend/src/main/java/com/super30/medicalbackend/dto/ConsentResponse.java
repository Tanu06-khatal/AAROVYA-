
package com.super30.medicalbackend.dto;

import java.time.LocalDateTime;
import com.super30.medicalbackend.entities.Consent;
import com.super30.medicalbackend.enums.ConsentStatus;

public record ConsentResponse(Long consentId, Long patientId, Long grantedToUserId, Long timelineId,
        String purpose, ConsentStatus status, LocalDateTime grantedAt, LocalDateTime expiresAt,
        LocalDateTime revokedAt, LocalDateTime createdAt, LocalDateTime updatedAt) {
 public static ConsentResponse from(Consent c){return new ConsentResponse(c.getConsentId(),c.getPatientId(),c.getGrantedToUserId(),c.getTimelineId(),c.getPurpose(),c.getStatus(),c.getGrantedAt(),c.getExpiresAt(),c.getRevokedAt(),c.getCreatedAt(),c.getUpdatedAt());}
}
