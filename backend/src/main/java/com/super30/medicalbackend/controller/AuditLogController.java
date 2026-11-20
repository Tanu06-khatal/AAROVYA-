package com.super30.medicalbackend.controller;

import java.security.Principal;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import org.springframework.data.domain.Page;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import com.super30.medicalbackend.dto.AuditLogResponse;
import com.super30.medicalbackend.enums.UserRole;
import com.super30.medicalbackend.security.AuthenticatedUser;
import com.super30.medicalbackend.services.AuditLogService;
import com.super30.medicalbackend.util.ApiResponse;

@RestController
@RequestMapping("/api/audit-logs")
@Validated
public class AuditLogController {

    private final AuditLogService service;

    public AuditLogController(AuditLogService service) {
        this.service = service;
    }

    // Public audit log creation endpoint REMOVED.
    // Audits are strictly generated internally by backend domain services.

    @GetMapping
    public ApiResponse<Page<AuditLogResponse>> list(Principal principal,
            @RequestParam(defaultValue = "0") @Min(0) int page,
            @RequestParam(defaultValue = "20") @Min(1) @Max(100) int size) {
        Long actorId = AuthenticatedUser.id(principal);
        UserRole role = AuthenticatedUser.role(principal);
        return ApiResponse.ok("Audit history retrieved", service.all(actorId, role, page, size));
    }

    @GetMapping("/{auditId}")
    public ApiResponse<AuditLogResponse> get(Principal principal, @PathVariable Long auditId) {
        return ApiResponse.ok("Audit log retrieved", service.get(AuthenticatedUser.id(principal), auditId));
    }

    @GetMapping("/user/{userId}")
    public ApiResponse<Page<AuditLogResponse>> byUser(Principal principal, @PathVariable Long userId,
            @RequestParam(defaultValue = "0") @Min(0) int page,
            @RequestParam(defaultValue = "20") @Min(1) @Max(100) int size) {
        Long actorId = AuthenticatedUser.id(principal);
        UserRole role = AuthenticatedUser.role(principal);
        if (role == UserRole.ADMIN) {
            return ApiResponse.ok("Audit history retrieved", service.byUser(userId, userId, page, size));
        }
        return ApiResponse.ok("Audit history retrieved", service.byUser(actorId, userId, page, size));
    }

    @GetMapping("/action/{action}")
    public ApiResponse<Page<AuditLogResponse>> byAction(Principal principal, @PathVariable String action,
            @RequestParam(defaultValue = "0") @Min(0) int page,
            @RequestParam(defaultValue = "20") @Min(1) @Max(100) int size) {
        Long actorId = AuthenticatedUser.id(principal);
        UserRole role = AuthenticatedUser.role(principal);
        return ApiResponse.ok("Filtered audit history retrieved",
                service.byAction(actorId, role, action, page, size));
    }

    @GetMapping("/entity/{entityType}/{entityId}")
    public ApiResponse<Page<AuditLogResponse>> byEntity(Principal principal,
            @PathVariable String entityType, @PathVariable Long entityId,
            @RequestParam(defaultValue = "0") @Min(0) int page,
            @RequestParam(defaultValue = "20") @Min(1) @Max(100) int size) {
        return ApiResponse.ok("Entity audit history retrieved",
                service.byEntity(AuthenticatedUser.id(principal), entityType, entityId, page, size));
    }

    @GetMapping("/date-range")
    public ApiResponse<Page<AuditLogResponse>> byDateRange(Principal principal,
            @RequestParam String startDate, @RequestParam String endDate,
            @RequestParam(defaultValue = "0") @Min(0) int page,
            @RequestParam(defaultValue = "20") @Min(1) @Max(100) int size) {
        try {
            LocalDateTime start = LocalDateTime.parse(startDate, DateTimeFormatter.ISO_DATE_TIME);
            LocalDateTime end = LocalDateTime.parse(endDate, DateTimeFormatter.ISO_DATE_TIME);
            Long actorId = AuthenticatedUser.id(principal);
            UserRole role = AuthenticatedUser.role(principal);
            return ApiResponse.ok("Date-filtered audit history retrieved",
                    service.byDateRange(actorId, role, start, end, page, size));
        } catch (DateTimeParseException ex) {
            throw new IllegalArgumentException("Dates must use ISO date-time format, for example 2026-03-01T00:00:00");
        }
    }
}
