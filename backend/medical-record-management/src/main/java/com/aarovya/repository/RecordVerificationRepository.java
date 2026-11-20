package com.aarovya.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.aarovya.entities.RecordVerification;

public interface RecordVerificationRepository
        extends JpaRepository<RecordVerification, Long> {

    List<RecordVerification> findByMedicalRecord_MedicalRecordId(Long recordId);

    List<RecordVerification> findByVerificationStatus(String status);
}