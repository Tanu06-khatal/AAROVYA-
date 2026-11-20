package com.super30.medicalbackend.services;

import java.time.LocalDateTime;

import org.springframework.data.domain.Page;

import com.super30.medicalbackend.dto.AuditLogResponse;
import com.super30.medicalbackend.enums.AuditAction;
import com.super30.medicalbackend.enums.UserRole;

public interface AuditLogService {
    AuditLogResponse create(Long actorId, AuditAction action, String entityType, Long entityId, String ipAddress);
    void record(Long userId, AuditAction action, String entityType, Long entityId);

    default void record(Long userId, AuditAction action, String safeDescription) {
        record(userId, action, "APPLICATION", null);
    }

    AuditLogResponse get(Long actorId, Long auditId);
    Page<AuditLogResponse> all(Long actorId, UserRole role, int page, int size);
    Page<AuditLogResponse> byUser(Long actorId, Long userId, int page, int size);
    Page<AuditLogResponse> byAction(Long actorId, String action, int page, int size);
    Page<AuditLogResponse> byAction(Long actorId, UserRole role, String action, int page, int size);
    Page<AuditLogResponse> byEntity(Long actorId, String entityType, Long entityId, int page, int size);
    Page<AuditLogResponse> byDateRange(Long actorId, LocalDateTime start, LocalDateTime end, int page, int size);
    Page<AuditLogResponse> byDateRange(Long actorId, UserRole role, LocalDateTime start, LocalDateTime end, int page, int size);
}
