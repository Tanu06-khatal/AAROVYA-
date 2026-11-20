package com.super30.medicalbackend.dto;

import java.time.LocalDateTime;

import com.super30.medicalbackend.entities.RecordShare;
import com.super30.medicalbackend.enums.ShareStatus;

public record RecordShareResponse(
        Long shareId,
        Long ownerId,
        Long receiverId,
        Long timelineId,
        String purpose,
        ShareStatus status,
        LocalDateTime requestedAt,
        LocalDateTime respondedAt,
        LocalDateTime expiresAt,
        LocalDateTime revokedAt,
        LocalDateTime createdAt,
        LocalDateTime updatedAt) {

    public static RecordShareResponse from(RecordShare share) {
        return new RecordShareResponse(
                share.getShareId(),
                share.getOwnerId(),
                share.getReceiverId(),
                share.getTimelineId(),
                share.getPurpose(),
                share.getStatus(),
                share.getRequestedAt(),
                share.getRespondedAt(),
                share.getExpiresAt(),
                share.getRevokedAt(),
                share.getCreatedAt(),
                share.getUpdatedAt());
    }
}
