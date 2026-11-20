package com.super30.medicalbackend.dto;

import com.super30.medicalbackend.enums.AuditAction;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;

/** Client-submitted audit metadata; actor and description are always server-generated. */
public record AuditLogRequest(
        @NotNull AuditAction action,
        @NotBlank @Size(max = 64) @Pattern(regexp = "[A-Z][A-Z0-9_]*") String entityType,
        @NotNull @Positive Long entityId) { }
