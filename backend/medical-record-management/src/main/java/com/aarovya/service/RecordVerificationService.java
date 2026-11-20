
package com.aarovya.service;

import java.util.List;

import com.aarovya.dto.request.RecordVerificationRequest;
import com.aarovya.dto.response.RecordVerificationResponse;

public interface RecordVerificationService {

    RecordVerificationResponse verifyMedicalRecord(
            Long recordId,
            RecordVerificationRequest request
    );

    List<RecordVerificationResponse> getVerificationsByRecordId(
            Long recordId
    );
}
