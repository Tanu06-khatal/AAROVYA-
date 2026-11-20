package com.aarovya.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.aarovya.entities.MedicalRecord;

public interface MedicalRecordRepository
        extends JpaRepository<MedicalRecord, Long> {

    List<MedicalRecord> findByPatientProfile_PatientProfileId(Long patientId);

    List<MedicalRecord> findByStatus(String status);

    List<MedicalRecord> findByStatusNot(String status);

    List<MedicalRecord> findByPatientProfile_PatientProfileIdAndStatusNot(
            Long patientId, String status);

    Optional<MedicalRecord> findByMedicalRecordIdAndStatusNot(
            Long recordId, String status);
}