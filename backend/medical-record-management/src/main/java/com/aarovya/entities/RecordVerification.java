
package com.aarovya.entities;

import java.time.LocalDateTime;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "record_verifications")
@Getter
@Setter
public class RecordVerification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long verificationId;

    @NotBlank(message = "Verification status is required")
    @Column(nullable = false, length = 30)
    private String verificationStatus = "PENDING";

    @NotBlank(message = "Verifier role is required")
    @Column(nullable = false, length = 30)
    private String verifiedByRole;

    @Column(nullable = false)
    private Long verifiedByUserId;

    @Size(max = 1000)
    @Column(length = 1000)
    private String remarks;

    private LocalDateTime verifiedAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "medical_record_id", nullable = false)
    private MedicalRecord medicalRecord;

    @PrePersist
    protected void onCreate() {
        if (!"PENDING".equals(verificationStatus)) {
            verifiedAt = LocalDateTime.now();
        }
    }
    @PreUpdate
    protected void onUpdate() {
        if (!"PENDING".equals(verificationStatus) && verifiedAt == null) {
            verifiedAt = LocalDateTime.now();
        }
    }
}
