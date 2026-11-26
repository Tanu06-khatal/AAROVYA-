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
@Table(name = "doctorProfiles")
public class DoctorProfile {

	public DoctorProfile() {

	}
	
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "doctor_profile_id")
    private Long doctorProfileId;

    @Column(nullable = false)
    private String specialization;

    @Column(name = "qualification")
    private String qualification;

    @Column(name = "medical_registration_number",unique = true)
    private String medicalRegistrationNumber;
    
    @Column(name = "years_of_experience")
    private Integer yearsOfExperience;

    @Column(name = "verified")
    private boolean verified = false;

    @Column(name="clinic_address",length = 500)
    private String clinicAddress;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    private User user;

	public Long getDoctorProfileId() {
		return doctorProfileId;
	}

	public void setDoctorProfileId(Long doctorProfileId) {
		this.doctorProfileId = doctorProfileId;
	}

	public String getSpecialization() {
		return specialization;
	}

	public void setSpecialization(String specialization) {
		this.specialization = specialization;
	}

	public String getQualification() {
		return qualification;
	}

	public void setQualification(String qualification) {
		this.qualification = qualification;
	}

	public String getMedicalRegistrationNumber() {
		return medicalRegistrationNumber;
	}

	public void setMedicalRegistrationNumber(String medicalRegistrationNumber) {
		this.medicalRegistrationNumber = medicalRegistrationNumber;
	}

	public Integer getYearsOfExperience() {
		return yearsOfExperience;
	}

	public void setYearsOfExperience(Integer yearsOfExperience) {
		this.yearsOfExperience = yearsOfExperience;
	}

	public boolean isVerified() {
		return verified;
	}

	public void setVerified(boolean verified) {
		this.verified = verified;
	}

	public String getClinicAddress() {
		return clinicAddress;
	}

	public void setClinicAddress(String clinicAddress) {
		this.clinicAddress = clinicAddress;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	@Override
	public String toString() {
		return "DoctorProfile [doctorProfileId=" + doctorProfileId + ", specialization=" + specialization
				+ ", qualification=" + qualification + ", medicalRegistrationNumber=" + medicalRegistrationNumber
				+ ", yearsOfExperience=" + yearsOfExperience + ", verified=" + verified + ", clinicAddress="
				+ clinicAddress +  "]";
	}
    
    
}
