package com.super30.medicalbackend.dto;

import java.time.LocalDate;
import com.super30.medicalbackend.enums.RecordType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PastOrPresent;
import jakarta.validation.constraints.Size;

public record MedicalTimelineRequest(
        @NotNull Long patientId,
        @NotNull RecordType recordType,
        @NotBlank @Size(max = 150) String title,
        @Size(max = 2000) String description,
        @NotNull @PastOrPresent LocalDate recordDate,
        Long recordId) {

    public MedicalTimelineRequest(Long patientId, RecordType recordType, String title, String description, LocalDate recordDate) {
        this(patientId, recordType, title, description, recordDate, null);
    }
}
