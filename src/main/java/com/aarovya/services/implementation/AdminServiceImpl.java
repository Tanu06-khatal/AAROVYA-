package com.aarovya.services.implementation;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.aarovya.dao.LaboratoryProfileDao;
import com.aarovya.dao.DoctorProfileDao;
import com.aarovya.dto.LaboratoryProfileResponse;
import com.aarovya.dto.DoctorProfileResponse;
import com.aarovya.entities.LaboratoryProfile;
import com.aarovya.entities.DoctorProfile;
import com.aarovya.exception.ResourceNotFoundException;
import com.aarovya.services.AdminService;

@Service
@Transactional
public class AdminServiceImpl implements AdminService {

    private final LaboratoryProfileDao laboratoryProfileDao;
    private final DoctorProfileDao doctorProfileDao;

    public AdminServiceImpl(
            LaboratoryProfileDao laboratoryProfileDao,
            DoctorProfileDao doctorProfileDao) {

        this.laboratoryProfileDao = laboratoryProfileDao;
        this.doctorProfileDao = doctorProfileDao;
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

        return mapToLaboratoryResponse(updatedProfile);
    }

    @Override
    public DoctorProfileResponse verifyDoctor(Long profileId) {

        DoctorProfile profile = doctorProfileDao.findById(profileId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Doctor profile not found with ID: " + profileId));

        if (profile.isVerified()) {
            throw new IllegalArgumentException(
                    "Doctor profile is already verified");
        }

        profile.setVerified(true);

        DoctorProfile updatedProfile =
                doctorProfileDao.save(profile);

        return new DoctorProfileResponse(updatedProfile);
    }

    private LaboratoryProfileResponse mapToLaboratoryResponse(
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
