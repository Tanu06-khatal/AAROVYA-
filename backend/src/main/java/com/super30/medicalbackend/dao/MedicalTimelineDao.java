package com.super30.medicalbackend.dao;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.super30.medicalbackend.entities.MedicalTimeline;
public interface MedicalTimelineDao extends JpaRepository<MedicalTimeline, Long> {
 List<MedicalTimeline> findByPatientIdOrderByRecordDateDescCreatedAtDesc(Long patientId);
}
