package com.aarovya.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;

import org.springframework.web.bind.annotation.*;

import com.aarovya.dto.DoctorProfileRequest;
import com.aarovya.dto.DoctorProfileResponse;

import com.aarovya.security.CustomUserDetails;
import com.aarovya.services.DoctorProfileService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/doctor-profiles")
public class DoctorProfileController {

    private final DoctorProfileService doctorProfileService;

    public DoctorProfileController(
            DoctorProfileService doctorProfileService) {
        this.doctorProfileService = doctorProfileService;
    }

    @PostMapping("/me")
    @PreAuthorize("hasRole('DOCTOR')")
    public ResponseEntity<DoctorProfileResponse> createMyProfile(
            @AuthenticationPrincipal CustomUserDetails userDetails,
            @Valid @RequestBody DoctorProfileRequest request) {

        DoctorProfileResponse response =
                doctorProfileService.createProfile(
                        userDetails.getUserId(), request);

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping("/me")
    @PreAuthorize("hasRole('DOCTOR')")
    public ResponseEntity<DoctorProfileResponse> getMyProfile(
            @AuthenticationPrincipal CustomUserDetails userDetails) {

        DoctorProfileResponse response =
                doctorProfileService.getMyProfile(
                        userDetails.getUserId());

        return ResponseEntity.ok(response);
    }

    @PutMapping("/me")
    @PreAuthorize("hasRole('DOCTOR')")
    public ResponseEntity<DoctorProfileResponse> updateMyProfile(
            @AuthenticationPrincipal CustomUserDetails userDetails,
            @Valid @RequestBody DoctorProfileRequest request) {

        DoctorProfileResponse response =
                doctorProfileService.updateMyProfile(
                        userDetails.getUserId(), request);

        return ResponseEntity.ok(response);
    }

    @GetMapping("/{profileId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<DoctorProfileResponse> getProfileById(
            @PathVariable Long profileId) {

        DoctorProfileResponse response =
                doctorProfileService.getProfileById(profileId);

        return ResponseEntity.ok(response);
    }
}