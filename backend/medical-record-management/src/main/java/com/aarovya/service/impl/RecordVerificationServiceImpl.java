
package com.aarovya.service.impl;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;

import com.aarovya.dto.request.RecordVerificationRequest;
import com.aarovya.dto.response.RecordVerificationResponse;
import com.aarovya.entities.MedicalRecord;
import com.aarovya.entities.RecordVerification;
import com.aarovya.exception.ResourceNotFoundException;
import com.aarovya.repository.MedicalRecordRepository;
import com.aarovya.repository.RecordVerificationRepository;
import com.aarovya.service.RecordVerificationService;

@Service
@RequiredArgsConstructor
@Transactional
public class RecordVerificationServiceImpl
        implements RecordVerificationService {

    private final RecordVerificationRepository verificationRepository;
    private final MedicalRecordRepository recordRepository;

    private static final Set<String> ALLOWED_STATUSES =
            Set.of("VERIFIED", "REJECTED");

    @Override
    public RecordVerificationResponse verifyMedicalRecord(
            Long recordId, RecordVerificationRequest request) {

        MedicalRecord record = recordRepository
                .findByMedicalRecordIdAndStatusNot(recordId, "DELETED")
                .orElseThrow(() ->
                        new ResourceNotFoundException("Medical record not found"));

        String status = request.getVerificationStatus()
                .trim().toUpperCase();

        if (!ALLOWED_STATUSES.contains(status)) {
            throw new IllegalArgumentException(
                    "Status must be VERIFIED or REJECTED");
        }

        RecordVerification verification = new RecordVerification();
        verification.setVerificationStatus(status);
        verification.setVerifiedByRole(
                request.getVerifiedByRole().trim().toUpperCase());
        verification.setVerifiedByUserId(request.getVerifiedByUserId());
        verification.setRemarks(request.getRemarks());
        verification.setMedicalRecord(record);
        verification.setVerifiedAt(LocalDateTime.now());

        return toResponse(verificationRepository.save(verification));
    }

    @Override
    @Transactional(readOnly = true)
    public List<RecordVerificationResponse> getVerificationsByRecordId(
            Long recordId) {

        if (!recordRepository.existsById(recordId)) {
            throw new ResourceNotFoundException("Medical record not found");
        }

        return verificationRepository
                .findByMedicalRecord_MedicalRecordId(recordId)
                .stream()
                .map(this::toResponse)
                .toList();
    }

    private RecordVerificationResponse toResponse(
            RecordVerification verification) {

        RecordVerificationResponse response =
                new RecordVerificationResponse();

        response.setVerificationId(verification.getVerificationId());
        response.setVerificationStatus(
                verification.getVerificationStatus());
        response.setVerifiedByRole(verification.getVerifiedByRole());
        response.setVerifiedByUserId(verification.getVerifiedByUserId());
        response.setRemarks(verification.getRemarks());
        response.setMedicalRecordId(
                verification.getMedicalRecord().getMedicalRecordId());
        response.setVerifiedAt(verification.getVerifiedAt());

        return response;
    }
}
