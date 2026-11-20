package com.aarovya.dto;

import com.aarovya.entities.DoctorProfile;

public class DoctorProfileResponse {

    private Long doctorProfileId;
    private Long userId;
    private String specialization;
    private String qualification;
    private String medicalRegistrationNumber;
    private Integer yearsOfExperience;
    private boolean verified;
    private String clinicAddress;

    public DoctorProfileResponse(DoctorProfile profile) {
        this.doctorProfileId = profile.getDoctorProfileId();
        this.userId = profile.getUser().getUserId();
        this.specialization = profile.getSpecialization();
        this.qualification = profile.getQualification();
        this.medicalRegistrationNumber =
                profile.getMedicalRegistrationNumber();
        this.yearsOfExperience = profile.getYearsOfExperience();
        this.verified = profile.isVerified();
        this.clinicAddress = profile.getClinicAddress();
    }

    public Long getDoctorProfileId() {
        return doctorProfileId;
    }

    public Long getUserId() {
        return userId;
    }

    public String getSpecialization() {
        return specialization;
    }

    public String getQualification() {
        return qualification;
    }

    public String getMedicalRegistrationNumber() {
        return medicalRegistrationNumber;
    }

    public Integer getYearsOfExperience() {
        return yearsOfExperience;
    }

    public boolean isVerified() {
        return verified;
    }

    public String getClinicAddress() {
        return clinicAddress;
    }
}