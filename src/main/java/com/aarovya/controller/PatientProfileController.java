package com.aarovya.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;

import org.springframework.web.bind.annotation.*;

import com.aarovya.dto.PatientProfileRequest;
import com.aarovya.dto.PatientProfileResponse;

import com.aarovya.security.CustomUserDetails;
import com.aarovya.services.PatientProfileService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/patient-profiles")
public class PatientProfileController {

    private final PatientProfileService patientProfileService;

    public PatientProfileController(
            PatientProfileService patientProfileService) {

        this.patientProfileService = patientProfileService;
    }

    // Create the logged-in patient's profile
    @PostMapping("/me")
    @PreAuthorize("hasRole('PATIENT')")
    public ResponseEntity<PatientProfileResponse> createMyProfile(
            @AuthenticationPrincipal CustomUserDetails userDetails,
            @Valid @RequestBody PatientProfileRequest request) {

        PatientProfileResponse response =
                patientProfileService.createProfile(
                        userDetails.getUserId(), request);

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    // Get the logged-in patient's own profile
    @GetMapping("/me")
    @PreAuthorize("hasRole('PATIENT')")
    public ResponseEntity<PatientProfileResponse> getMyProfile(
            @AuthenticationPrincipal CustomUserDetails userDetails) {

        PatientProfileResponse response =
                patientProfileService.getMyProfile(
                        userDetails.getUserId());

        return ResponseEntity.ok(response);
    }

    // Update the logged-in patient's own profile
    @PutMapping("/me")
    @PreAuthorize("hasRole('PATIENT')")
    public ResponseEntity<PatientProfileResponse> updateMyProfile(
            @AuthenticationPrincipal CustomUserDetails userDetails,
            @Valid @RequestBody PatientProfileRequest request) {

        PatientProfileResponse response =
                patientProfileService.updateMyProfile(
                        userDetails.getUserId(), request);

        return ResponseEntity.ok(response);
    }

    // ADMIN can view a patient profile by profile ID
    @GetMapping("/{profileId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<PatientProfileResponse> getProfileById(
            @PathVariable Long profileId) {

        PatientProfileResponse response =
                patientProfileService.getProfileById(profileId);

        return ResponseEntity.ok(response);
    }
}