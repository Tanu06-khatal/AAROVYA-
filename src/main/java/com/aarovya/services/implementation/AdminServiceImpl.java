package com.aarovya.services.implementation;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.aarovya.dao.LaboratoryProfileDao;
import com.aarovya.dto.LaboratoryProfileResponse;
import com.aarovya.entities.LaboratoryProfile;
import com.aarovya.exception.ResourceNotFoundException;
import com.aarovya.services.AdminService;

@Service
@Transactional
public class AdminServiceImpl implements AdminService {

    private final LaboratoryProfileDao laboratoryProfileDao;

    public AdminServiceImpl(LaboratoryProfileDao laboratoryProfileDao) {
        this.laboratoryProfileDao = laboratoryProfileDao;
    }

    @Override
    public LaboratoryProfileResponse verifyLaboratory(Long profileId) {

        LaboratoryProfile profile = laboratoryProfileDao.findById(profileId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Laboratory profile not found with ID: " + profileId));

        if (profile.isVerified()) {
            throw new IllegalArgumentException(
                    "Laboratory profile is already verified");
        }

        profile.setVerified(true);

        LaboratoryProfile updatedProfile =
                laboratoryProfileDao.save(profile);

        return mapToResponse(updatedProfile);
    }

    private LaboratoryProfileResponse mapToResponse(
            LaboratoryProfile profile) {

        LaboratoryProfileResponse response =
                new LaboratoryProfileResponse();

        response.setLaboratoryProfileId(
                profile.getLaboratoryProfileId());
        response.setUserId(profile.getUser().getUserId());
        response.setLaboratoryName(profile.getLaboratoryName());
        response.setRegistrationNumber(
                profile.getRegistrationNumber());
        response.setLaboratoryAddress(
                profile.getLaboratoryAddress());
        response.setContactPerson(profile.getContactPerson());
        response.setVerified(profile.isVerified());

        return response;
    }
}