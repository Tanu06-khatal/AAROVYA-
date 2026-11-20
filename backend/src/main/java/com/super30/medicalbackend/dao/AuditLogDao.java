package com.super30.medicalbackend.dao;

import java.time.LocalDateTime;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.super30.medicalbackend.entities.AuditLog;
import com.super30.medicalbackend.enums.AuditAction;

public interface AuditLogDao extends JpaRepository<AuditLog, Long> {
    Optional<AuditLog> findByAuditIdAndUserId(Long auditId, Long userId);
    Page<AuditLog> findByUserId(Long userId, Pageable pageable);
    Page<AuditLog> findByUserIdAndAction(Long userId, AuditAction action, Pageable pageable);
    Page<AuditLog> findByUserIdAndEntityTypeAndEntityId(Long userId, String entityType, Long entityId, Pageable pageable);
    Page<AuditLog> findByUserIdAndTimestampBetween(Long userId, LocalDateTime start, LocalDateTime end, Pageable pageable);

    // Administrative audit queries
    Page<AuditLog> findByAction(AuditAction action, Pageable pageable);
    Page<AuditLog> findByTimestampBetween(LocalDateTime start, LocalDateTime end, Pageable pageable);
    Page<AuditLog> findByEntityTypeAndEntityId(String entityType, Long entityId, Pageable pageable);
}
