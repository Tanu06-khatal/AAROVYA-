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
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "laboratory_profiles")
@Getter
@Setter
public class LaboratoryProfile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long laboratoryProfileId;

    @Column(nullable = false)
    private String laboratoryName;

    @Column(unique = true)
    private String registrationNumber;

    @Column(length = 500)
    private String laboratoryAddress;

    private String contactPerson;

    private boolean verified = false;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    private User user;
}
