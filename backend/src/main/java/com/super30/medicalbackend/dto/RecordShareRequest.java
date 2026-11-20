package com.super30.medicalbackend.dto;

import java.time.LocalDateTime;

import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;

public record RecordShareRequest(
        @NotNull @Positive Long receiverId,
        @NotNull @Positive Long timelineId,
        @Future LocalDateTime expiresAt,
        @Size(max = 300) String purpose) {

    public RecordShareRequest(Long receiverId, Long timelineId, LocalDateTime expiresAt) {
        this(receiverId, timelineId, expiresAt, "Medical record sharing");
    }
}
