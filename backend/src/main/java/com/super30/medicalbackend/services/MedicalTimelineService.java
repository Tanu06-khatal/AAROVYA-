package com.super30.medicalbackend.services;

import java.util.List;
import com.super30.medicalbackend.dto.MedicalTimelineRequest;
import com.super30.medicalbackend.dto.MedicalTimelineResponse;

public interface MedicalTimelineService {
    MedicalTimelineResponse create(Long actor, MedicalTimelineRequest request);
    MedicalTimelineResponse get(Long actor, Long id);
    List<MedicalTimelineResponse> history(Long actor, Long patientId);
    List<MedicalTimelineResponse> mine(Long actor);
    MedicalTimelineResponse update(Long actor, Long id, MedicalTimelineRequest request);
    void delete(Long actor, Long id);
    MedicalTimelineResponse shared(Long actor, Long id);
}
