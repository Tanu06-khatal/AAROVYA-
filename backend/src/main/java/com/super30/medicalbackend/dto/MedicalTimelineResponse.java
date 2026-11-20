package com.super30.medicalbackend.dto;

import java.time.LocalDate;
import java.time.LocalDateTime;
import com.super30.medicalbackend.entities.MedicalTimeline;
import com.super30.medicalbackend.enums.RecordType;

public record MedicalTimelineResponse(
        Long timelineId,
        Long patientId,
        RecordType recordType,
        String title,
        String description,
        LocalDate recordDate,
        Long recordId,
        LocalDateTime createdAt,
        LocalDateTime updatedAt) {

    public static MedicalTimelineResponse from(MedicalTimeline e) {
        return new MedicalTimelineResponse(
                e.getTimelineId(),
                e.getPatientId(),
                e.getRecordType(),
                e.getTitle(),
                e.getDescription(),
                e.getRecordDate(),
                e.getRecordId(),
                e.getCreatedAt(),
                e.getUpdatedAt());
    }
}
