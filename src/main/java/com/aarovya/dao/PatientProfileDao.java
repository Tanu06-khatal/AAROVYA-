package com.aarovya.dao;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.aarovya.entities.PatientProfile;

@Repository
public interface PatientProfileDao
        extends JpaRepository<PatientProfile, Long> {

    Optional<PatientProfile> findByUser_UserId(Long userId);

    boolean existsByUser_UserId(Long userId);
}
