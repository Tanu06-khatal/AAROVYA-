
package com.super30.medicalbackend.dto;

import java.time.LocalDateTime;
import com.super30.medicalbackend.entities.AuditLog;
import com.super30.medicalbackend.enums.AuditAction;

public record AuditLogResponse(Long auditId, Long userId, AuditAction action, String entityType,
        Long entityId, String description, String ipAddress, LocalDateTime timestamp) {
 public static AuditLogResponse from(AuditLog a){return new AuditLogResponse(a.getAuditId(),a.getUserId(),a.getAction(),a.getEntityType(),a.getEntityId(),a.getDescription(),a.getIpAddress(),a.getTimestamp());}
 public Long actorUserId(){return userId;}
 public LocalDateTime occurredAt(){return timestamp;}
}
