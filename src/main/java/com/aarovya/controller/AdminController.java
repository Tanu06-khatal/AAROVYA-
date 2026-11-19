package com.aarovya.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.aarovya.dto.LaboratoryProfileResponse;
import com.aarovya.services.AdminService;

@RestController
@RequestMapping("/api/admin")
@PreAuthorize("hasRole('ADMIN')")
public class AdminController {

    private final AdminService adminService;

    public AdminController(AdminService adminService) {
        this.adminService = adminService;
    }

    @PatchMapping("/laboratories/{profileId}/verify")
    public ResponseEntity<LaboratoryProfileResponse> verifyLaboratory(
            @PathVariable Long profileId) {

        return ResponseEntity.ok(
                adminService.verifyLaboratory(profileId));
    }
}