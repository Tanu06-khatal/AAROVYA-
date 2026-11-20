package com.aarovya.services.implementation;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.aarovya.dao.DoctorProfileDao;
import com.aarovya.dao.UserDao;

import com.aarovya.dto.DoctorProfileRequest;
import com.aarovya.dto.DoctorProfileResponse;

import com.aarovya.entities.DoctorProfile;
import com.aarovya.entities.User;

import com.aarovya.exception.DuplicateResourceException;
import com.aarovya.exception.ResourceNotFoundException;

import com.aarovya.services.DoctorProfileService;

@Service
public class DoctorProfileServiceImpl
        implements DoctorProfileService {

    private static final Logger logger =
            LoggerFactory.getLogger(DoctorProfileServiceImpl.class);

    private final DoctorProfileDao doctorProfileDao;
    private final UserDao userDao;

    public DoctorProfileServiceImpl(
            DoctorProfileDao doctorProfileDao,
            UserDao userDao) {

        this.doctorProfileDao = doctorProfileDao;
        this.userDao = userDao;
    }

    @Override
    @Transactional
    public DoctorProfileResponse createProfile(
            Long userId, DoctorProfileRequest request) {

        logger.info("Creating doctor profile for user ID: {}", userId);

        if (doctorProfileDao.existsByUser_UserId(userId)) {
            throw new DuplicateResourceException(
                    "Doctor profile already exists for this user");
        }

        if (doctorProfileDao.findByMedicalRegistrationNumber(
                request.getMedicalRegistrationNumber()).isPresent()) {
            throw new DuplicateResourceException(
                    "Medical registration number is already registered");
        }

        User user = userDao.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "User not found with ID: " + userId));

        DoctorProfile profile = new DoctorProfile();
        profile.setUser(user);

        applyRequest(profile, request);

        DoctorProfile savedProfile = doctorProfileDao.save(profile);

        logger.info("Doctor profile created. Profile ID: {}",
                savedProfile.getDoctorProfileId());

        return new DoctorProfileResponse(savedProfile);
    }

    @Override
    @Transactional(readOnly = true)
    public DoctorProfileResponse getMyProfile(Long userId) {

        DoctorProfile profile = doctorProfileDao
                .findByUser_UserId(userId)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Doctor profile not found for user ID: " + userId));

        return new DoctorProfileResponse(profile);
    }

    @Override
    @Transactional
    public DoctorProfileResponse updateMyProfile(
            Long userId, DoctorProfileRequest request) {

        DoctorProfile profile = doctorProfileDao
                .findByUser_UserId(userId)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Doctor profile not found for user ID: " + userId));

        doctorProfileDao.findByMedicalRegistrationNumber(
                request.getMedicalRegistrationNumber())
                .ifPresent(existing -> {
                    if (!existing.getDoctorProfileId()
                            .equals(profile.getDoctorProfileId())) {
                        throw new DuplicateResourceException(
                                "Medical registration number is already registered");
                    }
                });

        applyRequest(profile, request);

        DoctorProfile updatedProfile =
                doctorProfileDao.save(profile);

        logger.info("Doctor profile updated for user ID: {}", userId);

        return new DoctorProfileResponse(updatedProfile);
    }

    @Override
    @Transactional(readOnly = true)
    public DoctorProfileResponse getProfileById(Long profileId) {

        DoctorProfile profile = doctorProfileDao.findById(profileId)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Doctor profile not found with ID: " + profileId));

        return new DoctorProfileResponse(profile);
    }

    private void applyRequest(
            DoctorProfile profile, DoctorProfileRequest request) {

        profile.setSpecialization(request.getSpecialization());
        profile.setQualification(request.getQualification());
        profile.setMedicalRegistrationNumber(
                request.getMedicalRegistrationNumber());
        profile.setYearsOfExperience(request.getYearsOfExperience());
        profile.setClinicAddress(request.getClinicAddress());
    }
}