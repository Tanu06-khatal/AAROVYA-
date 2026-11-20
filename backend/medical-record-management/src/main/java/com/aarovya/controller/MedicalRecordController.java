
package com.aarovya.controller;

import java.util.List;

import jakarta.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import lombok.RequiredArgsConstructor;

import com.aarovya.dto.request.CreateMedicalRecordRequest;
import com.aarovya.dto.request.UpdateMedicalRecordRequest;
import com.aarovya.dto.response.MedicalRecordResponse;

import com.aarovya.service.MedicalRecordService;

@RestController
@RequestMapping("/api/medical-records")
@RequiredArgsConstructor
public class MedicalRecordController {

    private final MedicalRecordService medicalRecordService;

    // Create a medical record
    @PostMapping
    public ResponseEntity<MedicalRecordResponse> createMedicalRecord(
            @Valid @RequestBody CreateMedicalRecordRequest request) {

        MedicalRecordResponse response =
                medicalRecordService.createMedicalRecord(request);

        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    // Get all medical records
    @GetMapping
    public ResponseEntity<List<MedicalRecordResponse>> getAllMedicalRecords() {

        return ResponseEntity.ok(
                medicalRecordService.getAllMedicalRecords());
    }

    // Get medical record by ID
    @GetMapping("/{recordId}")
    public ResponseEntity<MedicalRecordResponse> getMedicalRecordById(
            @PathVariable Long recordId) {

        return ResponseEntity.ok(
                medicalRecordService.getMedicalRecordById(recordId));
    }

    // Get records of a particular patient
    @GetMapping("/patient/{patientId}")
    public ResponseEntity<List<MedicalRecordResponse>> getRecordsByPatientId(
            @PathVariable Long patientId) {

        return ResponseEntity.ok(
                medicalRecordService.getMedicalRecordsByPatientId(patientId));
    }

    // Update a medical record
    @PutMapping("/{recordId}")
    public ResponseEntity<MedicalRecordResponse> updateMedicalRecord(
            @PathVariable Long recordId,
            @Valid @RequestBody UpdateMedicalRecordRequest request) {

        return ResponseEntity.ok(
                medicalRecordService.updateMedicalRecord(recordId, request));
    }

    // Soft delete a medical record
    @DeleteMapping("/{recordId}")
    public ResponseEntity<Void> deleteMedicalRecord(
            @PathVariable Long recordId) {

        medicalRecordService.deleteMedicalRecord(recordId);

        return ResponseEntity.noContent().build();
    }
}
