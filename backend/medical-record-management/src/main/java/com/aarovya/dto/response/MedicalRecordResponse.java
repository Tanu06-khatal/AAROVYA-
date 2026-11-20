
package com.aarovya.dto.response;

import java.time.LocalDate;
import java.time.LocalDateTime;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MedicalRecordResponse {

    private Long medicalRecordId;

    private String recordTitle;

    private String description;

    private LocalDate recordDate;

    private String doctorName;

    private String hospitalName;

    private String status;

    private Long patientProfileId;

    private Long categoryId;

    private String categoryName;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;
}
