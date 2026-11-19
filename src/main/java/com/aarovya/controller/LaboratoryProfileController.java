package com.aarovya.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import com.aarovya.dto.LaboratoryProfileRequest;
import com.aarovya.dto.LaboratoryProfileResponse;
import com.aarovya.security.CustomUserDetails;
import com.aarovya.services.LaboratoryProfileService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/laboratory-profiles")
public class LaboratoryProfileController {

    private final LaboratoryProfileService laboratoryProfileService;

    public LaboratoryProfileController(
            LaboratoryProfileService laboratoryProfileService) {
        this.laboratoryProfileService = laboratoryProfileService;
    }

    @PostMapping("/me")
    @PreAuthorize("hasRole('LABORATORY')")
    public ResponseEntity<LaboratoryProfileResponse> createProfile(
            @AuthenticationPrincipal CustomUserDetails userDetails,
            @Valid @RequestBody LaboratoryProfileRequest request) {

        LaboratoryProfileResponse response =
                laboratoryProfileService.createProfile(
                        userDetails.getUserId(), request);

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping("/me")
    @PreAuthorize("hasRole('LABORATORY')")
    public ResponseEntity<LaboratoryProfileResponse> getMyProfile(
            @AuthenticationPrincipal CustomUserDetails userDetails) {

        return ResponseEntity.ok(
                laboratoryProfileService.getMyProfile(
                        userDetails.getUserId()));
    }

    @PutMapping("/me")
    @PreAuthorize("hasRole('LABORATORY')")
    public ResponseEntity<LaboratoryProfileResponse> updateMyProfile(
            @AuthenticationPrincipal CustomUserDetails userDetails,
            @Valid @RequestBody LaboratoryProfileRequest request) {

        return ResponseEntity.ok(
                laboratoryProfileService.updateMyProfile(
                        userDetails.getUserId(), request));
    }

    @GetMapping("/{profileId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<LaboratoryProfileResponse> getProfileById(
            @PathVariable Long profileId) {

        return ResponseEntity.ok(
                laboratoryProfileService.getProfileById(profileId));
    }
}