package com.aarovya.service;

import java.util.List;

import com.aarovya.dto.request.CreateMedicalRecordRequest;
import com.aarovya.dto.request.UpdateMedicalRecordRequest;
import com.aarovya.dto.response.MedicalRecordResponse;

public interface MedicalRecordService {

    MedicalRecordResponse createMedicalRecord(
            CreateMedicalRecordRequest request);

    List<MedicalRecordResponse> getAllMedicalRecords();

    MedicalRecordResponse getMedicalRecordById(Long recordId);

    List<MedicalRecordResponse> getMedicalRecordsByPatientId(Long patientId);

    MedicalRecordResponse updateMedicalRecord(
            Long recordId,
            UpdateMedicalRecordRequest request);

    void deleteMedicalRecord(Long recordId);
}