package com.aarovya.services.implementation;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.aarovya.dao.PatientProfileDao;
import com.aarovya.dao.UserDao;

import com.aarovya.dto.PatientProfileRequest;
import com.aarovya.dto.PatientProfileResponse;

import com.aarovya.entities.PatientProfile;
import com.aarovya.entities.User;

import com.aarovya.exception.DuplicateResourceException;
import com.aarovya.exception.ResourceNotFoundException;

import com.aarovya.services.PatientProfileService;

@Service
public class PatientProfileServiceImpl
        implements PatientProfileService {

    private static final Logger logger =
            LoggerFactory.getLogger(PatientProfileServiceImpl.class);

    private final PatientProfileDao patientProfileDao;
    private final UserDao userDao;

    public PatientProfileServiceImpl(
            PatientProfileDao patientProfileDao,
            UserDao userDao) {

        this.patientProfileDao = patientProfileDao;
        this.userDao = userDao;
    }

    @Override
    @Transactional
    public PatientProfileResponse createProfile(
            Long userId,
            PatientProfileRequest request) {

        logger.info("Creating patient profile for user ID: {}", userId);

        if (patientProfileDao.existsByUser_UserId(userId)) {
            throw new DuplicateResourceException(
                    "Patient profile already exists for this user");
        }

        User user = userDao.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "User not found with ID: " + userId));

        PatientProfile profile = new PatientProfile();

        profile.setUser(user);
        applyRequest(profile, request);

        PatientProfile savedProfile =
                patientProfileDao.save(profile);

        logger.info("Patient profile created. Profile ID: {}",
                savedProfile.getPatientProfileId());

        return new PatientProfileResponse(savedProfile);
    }

    @Override
    @Transactional(readOnly = true)
    public PatientProfileResponse getMyProfile(Long userId) {

        logger.info("Fetching patient profile for user ID: {}", userId);

        PatientProfile profile = patientProfileDao
                .findByUser_UserId(userId)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Patient profile not found for user ID: " + userId));

        return new PatientProfileResponse(profile);
    }

    @Override
    @Transactional
    public PatientProfileResponse updateMyProfile(
            Long userId,
            PatientProfileRequest request) {

        logger.info("Updating patient profile for user ID: {}", userId);

        PatientProfile profile = patientProfileDao
                .findByUser_UserId(userId)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Patient profile not found for user ID: " + userId));

        applyRequest(profile, request);

        PatientProfile updatedProfile =
                patientProfileDao.save(profile);

        logger.info("Patient profile updated successfully. User ID: {}",
                userId);

        return new PatientProfileResponse(updatedProfile);
    }

    @Override
    @Transactional(readOnly = true)
    public PatientProfileResponse getProfileById(Long profileId) {

        logger.info("Fetching patient profile ID: {}", profileId);

        PatientProfile profile = patientProfileDao.findById(profileId)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Patient profile not found with ID: " + profileId));

        return new PatientProfileResponse(profile);
    }

    private void applyRequest(
            PatientProfile profile,
            PatientProfileRequest request) {

        profile.setDateOfBirth(request.getDateOfBirth());
        profile.setGender(request.getGender());
        profile.setBloodGroup(request.getBloodGroup());
        profile.setAddress(request.getAddress());
        profile.setEmergencyContact(request.getEmergencyContact());
    }
}