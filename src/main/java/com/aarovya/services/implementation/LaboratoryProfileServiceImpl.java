package com.aarovya.services.implementation;

import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.aarovya.dao.LaboratoryProfileDao;
import com.aarovya.dao.UserDao;
import com.aarovya.dto.LaboratoryProfileRequest;
import com.aarovya.dto.LaboratoryProfileResponse;
import com.aarovya.entities.LaboratoryProfile;
import com.aarovya.entities.User;
import com.aarovya.exception.DuplicateResourceException;
import com.aarovya.exception.ResourceNotFoundException;
import com.aarovya.services.LaboratoryProfileService;

@Service
@Transactional
public class LaboratoryProfileServiceImpl implements LaboratoryProfileService {

    private final LaboratoryProfileDao laboratoryProfileDao;
    private final UserDao userDao;

    public LaboratoryProfileServiceImpl(
            LaboratoryProfileDao laboratoryProfileDao,
            UserDao userDao) {
        this.laboratoryProfileDao = laboratoryProfileDao;
        this.userDao = userDao;
    }

    @Override
    public LaboratoryProfileResponse createProfile(
            Long userId, LaboratoryProfileRequest request) {

        if (laboratoryProfileDao.existsByUser_UserId(userId)) {
            throw new DuplicateResourceException(
                    "Laboratory profile already exists for this user");
        }

        if (laboratoryProfileDao.findByRegistrationNumber(
                request.getRegistrationNumber()).isPresent()) {
            throw new DuplicateResourceException(
                    "Laboratory registration number already exists");
        }

        User user = userDao.findById(userId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("User not found"));

        LaboratoryProfile profile = new LaboratoryProfile();
        profile.setLaboratoryName(request.getLaboratoryName());
        profile.setRegistrationNumber(request.getRegistrationNumber());
        profile.setLaboratoryAddress(request.getLaboratoryAddress());
        profile.setContactPerson(request.getContactPerson());
        profile.setUser(user);
        profile.setVerified(false);

        LaboratoryProfile saved = laboratoryProfileDao.save(profile);

        return mapToResponse(saved);
    }

    @Override
    @Transactional(readOnly = true)
    public LaboratoryProfileResponse getMyProfile(Long userId) {

        LaboratoryProfile profile = laboratoryProfileDao
                .findByUser_UserId(userId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Laboratory profile not found"));

        return mapToResponse(profile);
    }

    @Override
    public LaboratoryProfileResponse updateMyProfile(
            Long userId, LaboratoryProfileRequest request) {

        LaboratoryProfile profile = laboratoryProfileDao
                .findByUser_UserId(userId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Laboratory profile not found"));

        Optional<LaboratoryProfile> existing =
                laboratoryProfileDao.findByRegistrationNumber(
                        request.getRegistrationNumber());

        if (existing.isPresent()
                && !existing.get().getLaboratoryProfileId()
                        .equals(profile.getLaboratoryProfileId())) {
            throw new DuplicateResourceException(
                    "Laboratory registration number already exists");
        }

        profile.setLaboratoryName(request.getLaboratoryName());
        profile.setRegistrationNumber(request.getRegistrationNumber());
        profile.setLaboratoryAddress(request.getLaboratoryAddress());
        profile.setContactPerson(request.getContactPerson());

        LaboratoryProfile updated = laboratoryProfileDao.save(profile);

        return mapToResponse(updated);
    }

    @Override
    @Transactional(readOnly = true)
    public LaboratoryProfileResponse getProfileById(Long profileId) {

        LaboratoryProfile profile = laboratoryProfileDao.findById(profileId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Laboratory profile not found"));

        return mapToResponse(profile);
    }

    private LaboratoryProfileResponse mapToResponse(
            LaboratoryProfile profile) {

        LaboratoryProfileResponse response =
                new LaboratoryProfileResponse();

        response.setLaboratoryProfileId(profile.getLaboratoryProfileId());
        response.setUserId(profile.getUser().getUserId());
        response.setLaboratoryName(profile.getLaboratoryName());
        response.setRegistrationNumber(profile.getRegistrationNumber());
        response.setLaboratoryAddress(profile.getLaboratoryAddress());
        response.setContactPerson(profile.getContactPerson());
        response.setVerified(profile.isVerified());

        return response;
    }
}