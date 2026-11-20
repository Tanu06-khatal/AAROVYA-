
package com.aarovya.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import jakarta.persistence.EntityManager;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;

import com.aarovya.dto.request.CreateMedicalRecordRequest;
import com.aarovya.dto.request.UpdateMedicalRecordRequest;
import com.aarovya.dto.response.MedicalRecordResponse;

import com.aarovya.entities.MedicalRecord;
import com.aarovya.entities.PatientProfile;
import com.aarovya.entities.RecordCategory;

import com.aarovya.exception.ResourceNotFoundException;

import com.aarovya.repository.MedicalRecordRepository;
import com.aarovya.repository.RecordCategoryRepository;

import com.aarovya.service.MedicalRecordService;

@Service
@RequiredArgsConstructor
@Transactional
public class MedicalRecordServiceImpl implements MedicalRecordService {

    private final MedicalRecordRepository medicalRecordRepository;
    private final RecordCategoryRepository recordCategoryRepository;
    private final EntityManager entityManager;

    @Override
    public MedicalRecordResponse createMedicalRecord(
            CreateMedicalRecordRequest request) {

        PatientProfile patient = entityManager.find(
                PatientProfile.class,
                request.getPatientProfileId());

        if (patient == null) {
            throw new ResourceNotFoundException(
                    "Patient not found with ID: "
                    + request.getPatientProfileId());
        }

        MedicalRecord record = new MedicalRecord();

        record.setRecordTitle(request.getRecordTitle());
        record.setDescription(request.getDescription());
        record.setRecordDate(request.getRecordDate());
        record.setDoctorName(request.getDoctorName());
        record.setHospitalName(request.getHospitalName());

        record.setPatientProfile(patient);
        record.setStatus("ACTIVE");

        if (request.getCategoryId() != null) {
            RecordCategory category = recordCategoryRepository
                    .findById(request.getCategoryId())
                    .orElseThrow(() -> new ResourceNotFoundException(
                            "Category not found with ID: "
                            + request.getCategoryId()));

            if (!category.isActive()) {
                throw new IllegalArgumentException(
                        "Selected category is inactive");
            }

            record.setRecordCategory(category);
        }

        MedicalRecord savedRecord =
                medicalRecordRepository.save(record);

        return convertToResponse(savedRecord);
    }

    @Override
    @Transactional(readOnly = true)
    public List<MedicalRecordResponse> getAllMedicalRecords() {

        return medicalRecordRepository.findByStatusNot("DELETED")
                .stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public MedicalRecordResponse getMedicalRecordById(Long recordId) {

        MedicalRecord record = findActiveRecord(recordId);

        return convertToResponse(record);
    }

    @Override
    @Transactional(readOnly = true)
    public List<MedicalRecordResponse> getMedicalRecordsByPatientId(
            Long patientId) {

        PatientProfile patient = entityManager.find(
                PatientProfile.class, patientId);

        if (patient == null) {
            throw new ResourceNotFoundException(
                    "Patient not found with ID: " + patientId);
        }

        return medicalRecordRepository
                .findByPatientProfile_PatientProfileIdAndStatusNot(
                        patientId, "DELETED")
                .stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public MedicalRecordResponse updateMedicalRecord(
            Long recordId,
            UpdateMedicalRecordRequest request) {

        MedicalRecord record = findActiveRecord(recordId);

        record.setRecordTitle(request.getRecordTitle());
        record.setDescription(request.getDescription());
        record.setRecordDate(request.getRecordDate());
        record.setDoctorName(request.getDoctorName());
        record.setHospitalName(request.getHospitalName());

        if (request.getCategoryId() != null) {

            RecordCategory category = recordCategoryRepository
                    .findById(request.getCategoryId())
                    .orElseThrow(() -> new ResourceNotFoundException(
                            "Category not found with ID: "
                            + request.getCategoryId()));

            if (!category.isActive()) {
                throw new IllegalArgumentException(
                        "Selected category is inactive");
            }

            record.setRecordCategory(category);

        } else {
            record.setRecordCategory(null);
        }

        MedicalRecord updatedRecord =
                medicalRecordRepository.save(record);

        return convertToResponse(updatedRecord);
    }

    @Override
    public void deleteMedicalRecord(Long recordId) {

        MedicalRecord record = findActiveRecord(recordId);

        record.setStatus("DELETED");

        medicalRecordRepository.save(record);
    }

    private MedicalRecord findActiveRecord(Long recordId) {

        return medicalRecordRepository
                .findByMedicalRecordIdAndStatusNot(recordId, "DELETED")
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Medical record not found with ID: " + recordId));
    }

    private MedicalRecordResponse convertToResponse(
            MedicalRecord record) {

        MedicalRecordResponse response =
                new MedicalRecordResponse();

        response.setMedicalRecordId(record.getMedicalRecordId());
        response.setRecordTitle(record.getRecordTitle());
        response.setDescription(record.getDescription());
        response.setRecordDate(record.getRecordDate());
        response.setDoctorName(record.getDoctorName());
        response.setHospitalName(record.getHospitalName());
        response.setStatus(record.getStatus());

        response.setPatientProfileId(
                record.getPatientProfile().getPatientProfileId());

        if (record.getRecordCategory() != null) {

            response.setCategoryId(
                    record.getRecordCategory().getCategoryId());

            response.setCategoryName(
                    record.getRecordCategory().getCategoryName());
        }

        response.setCreatedAt(record.getCreatedAt());
        response.setUpdatedAt(record.getUpdatedAt());

        return response;
    }
}
