
package com.aarovya.controller;

import java.util.List;

import jakarta.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import lombok.RequiredArgsConstructor;

import com.aarovya.dto.request.RecordVerificationRequest;
import com.aarovya.dto.response.RecordVerificationResponse;
import com.aarovya.service.RecordVerificationService;

@RestController
@RequestMapping("/api/record-verifications")
@RequiredArgsConstructor
public class RecordVerificationController {

    private final RecordVerificationService verificationService;

    @PostMapping("/{recordId}")
    public ResponseEntity<RecordVerificationResponse> verifyRecord(
            @PathVariable Long recordId,
            @Valid @RequestBody RecordVerificationRequest request) {

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(verificationService.verifyMedicalRecord(
                        recordId, request));
    }

    @GetMapping("/record/{recordId}")
    public ResponseEntity<List<RecordVerificationResponse>> getVerifications(
            @PathVariable Long recordId) {

        return ResponseEntity.ok(
                verificationService.getVerificationsByRecordId(recordId));
    }
}
