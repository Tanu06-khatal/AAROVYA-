package com.aarovya.dao;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.aarovya.entities.LaboratoryProfile;

@Repository
public interface LaboratoryProfileDao
        extends JpaRepository<LaboratoryProfile, Long> {

    Optional<LaboratoryProfile> findByUser_UserId(Long userId);

    Optional<LaboratoryProfile> findByRegistrationNumber(
            String registrationNumber);

    boolean existsByUser_UserId(Long userId);

    boolean existsByVerified(boolean verified);
}
