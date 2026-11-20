package com.aarovya.services;

import com.aarovya.dto.DoctorProfileRequest;
import com.aarovya.dto.DoctorProfileResponse;

public interface DoctorProfileService {

    DoctorProfileResponse createProfile(
            Long userId, DoctorProfileRequest request);

    DoctorProfileResponse getMyProfile(Long userId);

    DoctorProfileResponse updateMyProfile(
            Long userId, DoctorProfileRequest request);

    DoctorProfileResponse getProfileById(Long profileId);
}