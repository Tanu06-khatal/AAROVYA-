package com.aarovya.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "doctor_profiles")
@Getter
@Setter
public class DoctorProfile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long doctorProfileId;

    @Column(nullable = false)
    private String specialization;

    private String qualification;

    @Column(unique = true)
    private String medicalRegistrationNumber;

    private Integer yearsOfExperience;

    private boolean verified = false;

    @Column(length = 500)
    private String clinicAddress;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    private User user;
}
