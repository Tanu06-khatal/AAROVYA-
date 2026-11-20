package com.aarovya.dao;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.aarovya.entities.DoctorProfile;

@Repository
public interface DoctorProfileDao
        extends JpaRepository<DoctorProfile, Long> {

    Optional<DoctorProfile> findByUser_UserId(Long userId);

    Optional<DoctorProfile> findByMedicalRegistrationNumber(
            String medicalRegistrationNumber);

    boolean existsByUser_UserId(Long userId);
}
