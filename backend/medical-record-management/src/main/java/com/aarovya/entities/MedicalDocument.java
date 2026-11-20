
package com.aarovya.entities;

import java.time.LocalDateTime;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;

import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "medical_documents")
@Getter
@Setter
public class MedicalDocument {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long medicalDocumentId;

    @NotBlank(message = "File name is required")
    @Size(max = 255)
    @Column(nullable = false, length = 255)
    private String fileName;

    @NotBlank(message = "Original file name is required")
    @Size(max = 255)
    @Column(nullable = false, length = 255)
    private String originalFileName;

    @NotBlank(message = "Content type is required")
    @Size(max = 100)
    @Column(nullable = false, length = 100)
    private String contentType;

    @Positive(message = "File size must be greater than zero")
    @Column(nullable = false)
    private Long fileSize;

    @NotBlank(message = "Storage path is required")
    @Size(max = 500)
    @Column(nullable = false, length = 500)
    private String storagePath;

    @Column(nullable = false, updatable = false)
    private LocalDateTime uploadedAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "medical_record_id", nullable = false)
    private MedicalRecord medicalRecord;

    @PrePersist
    protected void onCreate() {
        uploadedAt = LocalDateTime.now();
    }
}
