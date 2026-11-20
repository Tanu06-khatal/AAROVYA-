package com.aarovya.services;

import com.aarovya.dto.LaboratoryProfileRequest;
import com.aarovya.dto.LaboratoryProfileResponse;

public interface LaboratoryProfileService {

    LaboratoryProfileResponse createProfile(
            Long userId, LaboratoryProfileRequest request);

    LaboratoryProfileResponse getMyProfile(Long userId);

    LaboratoryProfileResponse updateMyProfile(
            Long userId, LaboratoryProfileRequest request);

    LaboratoryProfileResponse getProfileById(Long profileId);
}