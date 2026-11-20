
package com.aarovya.dto.response;

import java.time.LocalDateTime;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RecordVerificationResponse {

    private Long verificationId;

    private String verificationStatus;

    private String verifiedByRole;

    private Long verifiedByUserId;

    private String remarks;

    private Long medicalRecordId;

    private LocalDateTime verifiedAt;
}
