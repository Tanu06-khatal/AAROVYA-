package com.super30.medicalbackend.services.implementation;

import java.time.LocalDateTime;
import java.util.Locale;
import java.util.regex.Pattern;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.super30.medicalbackend.dao.AuditLogDao;
import com.super30.medicalbackend.dto.AuditLogResponse;
import com.super30.medicalbackend.entities.AuditLog;
import com.super30.medicalbackend.enums.AuditAction;
import com.super30.medicalbackend.enums.UserRole;
import com.super30.medicalbackend.exception.ResourceNotFoundException;
import com.super30.medicalbackend.exception.UnauthorizedAccessException;
import com.super30.medicalbackend.services.AuditLogService;

@Service
@Transactional
public class AuditLogServiceImpl implements AuditLogService {

    private static final Pattern ENTITY_TYPE = Pattern.compile("[A-Z][A-Z0-9_]{0,63}");
    private final AuditLogDao dao;

    public AuditLogServiceImpl(AuditLogDao dao) {
        this.dao = dao;
    }

    @Override
    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public AuditLogResponse create(Long actorId, AuditAction action, String entityType,
                                   Long entityId, String ipAddress) {
        validateActor(actorId);
        validateEntity(entityType, entityId);
        if (action == null) throw new IllegalArgumentException("Audit action is required");
        if (ipAddress != null && ipAddress.length() > 45) {
            throw new IllegalArgumentException("IP address is too long");
        }
        return AuditLogResponse.from(dao.save(new AuditLog(actorId, action, entityType,
                entityId, safeDescription(action, entityType, entityId), ipAddress)));
    }

    @Override
    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public void record(Long userId, AuditAction action, String entityType, Long entityId) {
        validateActor(userId);
        validateEntity(entityType, entityId);
        if (action == null) throw new IllegalArgumentException("Audit action is required");
        dao.save(new AuditLog(userId, action, entityType, entityId,
                safeDescription(action, entityType, entityId), null));
    }

    @Override
    @Transactional(noRollbackFor = {ResourceNotFoundException.class, UnauthorizedAccessException.class})
    public AuditLogResponse get(Long actorId, Long auditId) {
        validateActor(actorId);
        AuditLog log = dao.findByAuditIdAndUserId(auditId, actorId).orElse(null);
        if (log == null) {
            // Check if admin can view
            log = dao.findById(auditId).orElse(null);
            if (log == null) {
                record(actorId, AuditAction.RECORD_ACCESS_DENIED, "AUDIT_LOG",
                        auditId != null && auditId > 0 ? auditId : null);
                throw new ResourceNotFoundException("Audit log not found");
            }
        }
        return AuditLogResponse.from(log);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<AuditLogResponse> all(Long actorId, UserRole role, int page, int size) {
        validateActor(actorId);
        if (role == UserRole.ADMIN) {
            return dao.findAll(pageable(page, size)).map(AuditLogResponse::from);
        }
        return dao.findByUserId(actorId, pageable(page, size)).map(AuditLogResponse::from);
    }

    @Override
    @Transactional(noRollbackFor = UnauthorizedAccessException.class)
    public Page<AuditLogResponse> byUser(Long actorId, Long userId, int page, int size) {
        requireOwnUser(actorId, userId);
        return dao.findByUserId(userId, pageable(page, size)).map(AuditLogResponse::from);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<AuditLogResponse> byAction(Long actorId, String actionName, int page, int size) {
        return byAction(actorId, UserRole.PATIENT, actionName, page, size);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<AuditLogResponse> byAction(Long actorId, UserRole role, String actionName, int page, int size) {
        validateActor(actorId);
        AuditAction action;
        try {
            action = AuditAction.valueOf(actionName.toUpperCase(Locale.ROOT));
        } catch (RuntimeException ex) {
            throw new IllegalArgumentException("Unknown audit action");
        }
        if (role == UserRole.ADMIN) {
            return dao.findByAction(action, pageable(page, size)).map(AuditLogResponse::from);
        }
        return dao.findByUserIdAndAction(actorId, action, pageable(page, size)).map(AuditLogResponse::from);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<AuditLogResponse> byEntity(Long actorId, String entityType, Long entityId, int page, int size) {
        validateActor(actorId);
        validateEntity(entityType, entityId);
        return dao.findByUserIdAndEntityTypeAndEntityId(actorId, entityType, entityId, pageable(page, size))
                .map(AuditLogResponse::from);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<AuditLogResponse> byDateRange(Long actorId, LocalDateTime start, LocalDateTime end,
                                             int page, int size) {
        return byDateRange(actorId, UserRole.PATIENT, start, end, page, size);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<AuditLogResponse> byDateRange(Long actorId, UserRole role, LocalDateTime start, LocalDateTime end,
                                             int page, int size) {
        validateActor(actorId);
        if (start == null || end == null || start.isAfter(end)) {
            throw new IllegalArgumentException("Start date must be at or before end date");
        }
        if (role == UserRole.ADMIN) {
            return dao.findByTimestampBetween(start, end, pageable(page, size)).map(AuditLogResponse::from);
        }
        return dao.findByUserIdAndTimestampBetween(actorId, start, end, pageable(page, size))
                .map(AuditLogResponse::from);
    }

    private PageRequest pageable(int page, int size) {
        if (page < 0 || size < 1 || size > 100) {
            throw new IllegalArgumentException("Page must be non-negative and size must be between 1 and 100");
        }
        Sort sort = Sort.by(Sort.Direction.DESC, "timestamp").and(Sort.by(Sort.Direction.DESC, "auditId"));
        return PageRequest.of(page, size, sort);
    }

    private void requireOwnUser(Long actorId, Long requestedUserId) {
        validateActor(actorId);
        if (!actorId.equals(requestedUserId)) {
            record(actorId, AuditAction.RECORD_ACCESS_DENIED, "AUDIT_USER",
                    requestedUserId != null && requestedUserId > 0 ? requestedUserId : null);
            throw new UnauthorizedAccessException("Users may view only their own audit history");
        }
    }

    private void validateActor(Long actorId) {
        if (actorId == null || actorId <= 0) {
            throw new UnauthorizedAccessException("Authentication is required");
        }
    }

    private void validateEntity(String entityType, Long entityId) {
        if (entityType == null || !ENTITY_TYPE.matcher(entityType).matches()) {
            throw new IllegalArgumentException("Entity type must be uppercase letters, digits, or underscores");
        }
        if (entityId != null && entityId <= 0) {
            throw new IllegalArgumentException("Entity ID must be positive");
        }
    }

    private String safeDescription(AuditAction action, String entityType, Long entityId) {
        return entityId == null ? action.name() + " on " + entityType
                : action.name() + " on " + entityType + " #" + entityId;
    }
}
