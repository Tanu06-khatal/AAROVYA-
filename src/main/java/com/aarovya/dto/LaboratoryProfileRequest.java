package com.aarovya.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class LaboratoryProfileRequest {

    @NotBlank(message = "Laboratory name is required")
    @Size(max = 150)
    private String laboratoryName;

    @NotBlank(message = "Registration number is required")
    @Size(max = 100)
    private String registrationNumber;

    @NotBlank(message = "Laboratory address is required")
    @Size(max = 255)
    private String laboratoryAddress;

    @NotBlank(message = "Contact person is required")
    @Size(max = 100)
    private String contactPerson;

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
}