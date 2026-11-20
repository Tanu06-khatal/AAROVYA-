package com.aarovya.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import com.aarovya.entities.MedicalDocument;

public interface MedicalDocumentRepository
        extends JpaRepository<MedicalDocument, Long> {

    List<MedicalDocument> findByMedicalRecord_MedicalRecordId(Long recordId);
}