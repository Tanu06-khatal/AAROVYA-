package com.aarovya.dto;

import java.time.LocalDate;

import com.aarovya.entities.PatientProfile;

public class PatientProfileResponse {

    private Long patientProfileId;
    private Long userId;
    private LocalDate dateOfBirth;
    private String gender;
    private String bloodGroup;
    private String address;
    private String emergencyContact;

    public PatientProfileResponse(PatientProfile profile) {
        this.patientProfileId = profile.getPatientProfileId();
        this.userId = profile.getUser().getUserId();
        this.dateOfBirth = profile.getDateOfBirth();
        this.gender = profile.getGender();
        this.bloodGroup = profile.getBloodGroup();
        this.address = profile.getAddress();
        this.emergencyContact = profile.getEmergencyContact();
    }

    public Long getPatientProfileId() {
        return patientProfileId;
    }

    public Long getUserId() {
        return userId;
    }

    public LocalDate getDateOfBirth() {
        return dateOfBirth;
    }

    public String getGender() {
        return gender;
    }

    public String getBloodGroup() {
        return bloodGroup;
    }

    public String getAddress() {
        return address;
    }

    public String getEmergencyContact() {
        return emergencyContact;
    }
}