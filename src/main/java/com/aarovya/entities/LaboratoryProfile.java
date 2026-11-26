package com.aarovya.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "laboratoryProfiles")
public class LaboratoryProfile {
	
	public LaboratoryProfile() {
    }
	
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "laboratory_profile_id")
    private Long laboratoryProfileId;

    @Column(name="laboratory_name",nullable = false)
    private String laboratoryName;

    @Column(name="registration_number",unique = true)
    private String registrationNumber;

    @Column(name="laboratory_address",length = 500)
    private String laboratoryAddress;

    @Column(name = "contact_person")
    private String contactPerson;

    @Column(name = "verified")
    private boolean verified = false;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    private User user;

    @Override
	public String toString() {
		return "LaboratoryProfile [laboratoryProfileId=" + laboratoryProfileId + ", laboratoryName=" + laboratoryName
				+ ", registrationNumber=" + registrationNumber + ", laboratoryAddress=" + laboratoryAddress
				+ ", contactPerson=" + contactPerson + ", verified=" + verified +  "]";
	}

	public Long getLaboratoryProfileId() {
		return laboratoryProfileId;
	}

	public void setLaboratoryProfileId(Long laboratoryProfileId) {
		this.laboratoryProfileId = laboratoryProfileId;
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

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	
}
