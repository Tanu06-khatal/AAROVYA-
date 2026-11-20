
package com.aarovya.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RecordVerificationRequest {

    @NotBlank(message = "Verification status is required")
    private String verificationStatus;

    @NotBlank(message = "Verifier role is required")
    @Size(max = 30)
    private String verifiedByRole;

    @NotNull(message = "Verifier user ID is required")
    @Positive(message = "Verifier user ID must be positive")
    private Long verifiedByUserId;

    @Size(max = 1000)
    private String remarks;
}
