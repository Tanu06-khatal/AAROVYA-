
package com.aarovya.entities;

import java.time.LocalDate;
import java.time.LocalDateTime;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "medical_records")
@Getter
@Setter
public class MedicalRecord {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long medicalRecordId;

    @NotBlank(message = "Record title is required")
    @Size(max = 150)
    @Column(nullable = false, length = 150)
    private String recordTitle;

    @Size(max = 1000)
    @Column(length = 1000)
    private String description;

    @Column(nullable = false)
    private LocalDate recordDate;

    @Size(max = 100)
    @Column(length = 100)
    private String doctorName;

    @Size(max = 150)
    @Column(length = 150)
    private String hospitalName;

    @Column(nullable = false, length = 30)
    private String status = "ACTIVE";

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "patient_profile_id", nullable = false)
    private PatientProfile patientProfile;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id")
    private RecordCategory recordCategory;

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}
