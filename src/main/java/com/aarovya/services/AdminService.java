package com.aarovya.services;

import com.aarovya.dto.LaboratoryProfileResponse;
import com.aarovya.dto.DoctorProfileResponse;

public interface AdminService {

    LaboratoryProfileResponse verifyLaboratory(Long profileId);

    DoctorProfileResponse verifyDoctor(Long profileId);
}
