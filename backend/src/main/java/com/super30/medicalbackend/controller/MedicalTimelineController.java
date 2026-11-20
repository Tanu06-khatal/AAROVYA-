package com.super30.medicalbackend.controller;

import java.security.Principal;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import com.super30.medicalbackend.dto.MedicalTimelineRequest;
import com.super30.medicalbackend.dto.MedicalTimelineResponse;
import com.super30.medicalbackend.security.AuthenticatedUser;
import com.super30.medicalbackend.services.MedicalTimelineService;
import com.super30.medicalbackend.util.ApiResponse;

import jakarta.validation.Valid;

@RestController
@RequestMapping({"/api/medical-timeline", "/api/medical-records"})
public class MedicalTimelineController {

    private final MedicalTimelineService service;

    public MedicalTimelineController(MedicalTimelineService service) {
        this.service = service;
    }

    @GetMapping
    public ApiResponse<List<MedicalTimelineResponse>> list(Principal principal) {
        return ApiResponse.ok("Timeline retrieved", service.mine(AuthenticatedUser.id(principal)));
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ApiResponse<MedicalTimelineResponse> create(Principal principal,
                                                       @Valid @RequestBody MedicalTimelineRequest request) {
        return ApiResponse.ok("Record created", service.create(AuthenticatedUser.id(principal), request));
    }

    @GetMapping("/{id}")
    public ApiResponse<MedicalTimelineResponse> get(Principal principal, @PathVariable Long id) {
        return ApiResponse.ok("Record retrieved", service.get(AuthenticatedUser.id(principal), id));
    }

    @GetMapping("/patient/{patientId}")
    public ApiResponse<List<MedicalTimelineResponse>> history(Principal principal, @PathVariable Long patientId) {
        return ApiResponse.ok("History retrieved", service.history(AuthenticatedUser.id(principal), patientId));
    }

    @PutMapping("/{id}")
    public ApiResponse<MedicalTimelineResponse> update(Principal principal,
                                                       @PathVariable Long id,
                                                       @Valid @RequestBody MedicalTimelineRequest request) {
        return ApiResponse.ok("Record updated", service.update(AuthenticatedUser.id(principal), id, request));
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(Principal principal, @PathVariable Long id) {
        service.delete(AuthenticatedUser.id(principal), id);
    }

    @GetMapping("/{id}/shared")
    public ApiResponse<MedicalTimelineResponse> shared(Principal principal, @PathVariable Long id) {
        return ApiResponse.ok("Shared record retrieved", service.shared(AuthenticatedUser.id(principal), id));
    }
}
