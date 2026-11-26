package com.aarovya.entities;

import java.time.LocalDate;

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
@Table(name = "patientProfiles")
public class PatientProfile {
	
	public PatientProfile() {

	}

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "patient_profile_id")
    private Long patientProfileId;

    @Column(name="date_of_birth")
    private LocalDate dateOfBirth;
    @Column(name="gender")
    private String gender;
    @Column(name="blood_group")
    private String bloodGroup;

    @Column(length = 500)
    private String address;

    @Column(name="emergency_contact")
    private String emergencyContact;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    private User user;

    //Getter and Setter
	public Long getPatientProfileId() {
		return patientProfileId;
	}

	public void setPatientProfileId(Long patientProfileId) {
		this.patientProfileId = patientProfileId;
	}

	public LocalDate getDateOfBirth() {
		return dateOfBirth;
	}

	public void setDateOfBirth(LocalDate dateOfBirth) {
		this.dateOfBirth = dateOfBirth;
	}

	public String getGender() {
		return gender;
	}

	public void setGender(String gender) {
		this.gender = gender;
	}

	public String getBloodGroup() {
		return bloodGroup;
	}

	public void setBloodGroup(String bloodGroup) {
		this.bloodGroup = bloodGroup;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getEmergencyContact() {
		return emergencyContact;
	}

	public void setEmergencyContact(String emergencyContact) {
		this.emergencyContact = emergencyContact;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	@Override
	public String toString() {
		return "PatientProfile [patientProfileId=" + patientProfileId + ", dateOfBirth=" + dateOfBirth + ", gender="
				+ gender + ", bloodGroup=" + bloodGroup + ", address=" + address + ", emergencyContact="
				+ emergencyContact +"]";
	}
    
    
}
