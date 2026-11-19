package com.aarovya.services;

import com.aarovya.dto.LaboratoryProfileResponse;

public interface AdminService {

    LaboratoryProfileResponse verifyLaboratory(Long profileId);
}