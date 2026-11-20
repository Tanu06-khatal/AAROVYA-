
package com.super30.medicalbackend.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import jakarta.validation.constraints.Future;
import java.time.LocalDateTime;

public record ConsentRequest(
        @NotNull @Positive Long grantedToUserId,
        @Positive Long timelineId,
        @NotBlank @Size(max = 300) String purpose,
        @Future LocalDateTime expiresAt) { }
