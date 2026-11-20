package com.aarovya.dto;

public class LaboratoryProfileResponse {

    private Long laboratoryProfileId;
    private Long userId;
    private String laboratoryName;
    private String registrationNumber;
    private String laboratoryAddress;
    private String contactPerson;
    private boolean verified;

    public Long getLaboratoryProfileId() {
        return laboratoryProfileId;
    }

    public void setLaboratoryProfileId(Long laboratoryProfileId) {
        this.laboratoryProfileId = laboratoryProfileId;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getLaboratoryName() {
        return laboratoryName;
    }

    public void setLaboratoryName(String laboratoryName) {
        this.laboratoryName = laboratoryName;
    }

    public String getRegistrationNumber() {
        return registrationNumber;
    }

    public void setRegistrationNumber(String registrationNumber) {
        this.registrationNumber = registrationNumber;
    }

    public String getLaboratoryAddress() {
        return laboratoryAddress;
    }

    public void setLaboratoryAddress(String laboratoryAddress) {
        this.laboratoryAddress = laboratoryAddress;
    }

    public String getContactPerson() {
        return contactPerson;
    }

    public void setContactPerson(String contactPerson) {
        this.contactPerson = contactPerson;
    }

    public boolean isVerified() {
        return verified;
    }

    public void setVerified(boolean verified) {
        this.verified = verified;
    }
}