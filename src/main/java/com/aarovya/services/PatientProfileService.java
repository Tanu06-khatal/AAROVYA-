package com.aarovya.services;

import com.aarovya.dto.PatientProfileRequest;
import com.aarovya.dto.PatientProfileResponse;

public interface PatientProfileService {

    PatientProfileResponse createProfile(
            Long userId,
            PatientProfileRequest request);

    PatientProfileResponse getMyProfile(Long userId);

    PatientProfileResponse updateMyProfile(
            Long userId,
            PatientProfileRequest request);

    PatientProfileResponse getProfileById(Long profileId);
}