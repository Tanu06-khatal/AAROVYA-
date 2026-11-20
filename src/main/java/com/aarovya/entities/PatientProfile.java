package com.aarovya.entities;

import java.time.LocalDate;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "patient_profiles")
@Getter
@Setter
public class PatientProfile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long patientProfileId;

    private LocalDate dateOfBirth;
    private String gender;
    private String bloodGroup;

    @Column(length = 500)
    private String address;

    private String emergencyContact;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    private User user;
}
