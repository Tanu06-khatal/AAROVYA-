package com.super30.medicalbackend;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.ArgumentCaptor;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Sort;

import com.super30.medicalbackend.dao.AuditLogDao;
import com.super30.medicalbackend.entities.AuditLog;
import com.super30.medicalbackend.enums.AuditAction;
import com.super30.medicalbackend.exception.ResourceNotFoundException;
import com.super30.medicalbackend.exception.UnauthorizedAccessException;
import com.super30.medicalbackend.services.implementation.AuditLogServiceImpl;

@ExtendWith(MockitoExtension.class)
class AuditLogServiceImplTest {
    private static final Long USER = 11L;
    private static final Long AUDIT_ID = 21L;
    @Mock private AuditLogDao dao;
    @InjectMocks private AuditLogServiceImpl service;

    private AuditLog log() {
        return new AuditLog(USER, AuditAction.RECORD_VIEWED, "MEDICAL_TIMELINE", 31L,
                "RECORD_VIEWED on MEDICAL_TIMELINE #31", "127.0.0.1");
    }

    @Test void createsMetadataOnlyAuditLog() {
        when(dao.save(any(AuditLog.class))).thenAnswer(call -> call.getArgument(0));
        var response = service.create(USER, AuditAction.RECORD_CREATED, "MEDICAL_TIMELINE", 31L, "127.0.0.1");
        assertEquals(USER, response.userId());
        assertEquals(AuditAction.RECORD_CREATED, response.action());
        assertEquals("MEDICAL_TIMELINE", response.entityType());
        assertNotNull(response.timestamp());
        assertFalse(response.description().contains("record contents"));
    }

    @Test void retrievesLogByIdWithinCallerScope() {
        when(dao.findByAuditIdAndUserId(AUDIT_ID, USER)).thenReturn(Optional.of(log()));
        assertEquals(AuditAction.RECORD_VIEWED, service.get(USER, AUDIT_ID).action());
    }

    @Test void retrievesOwnUserHistoryWithPaginationAndNewestSort() {
        when(dao.findByUserId(eq(USER), any())).thenReturn(new PageImpl<>(List.of(log())));
        var page = service.byUser(USER, USER, 2, 10);
        assertEquals(1, page.getTotalElements());
        ArgumentCaptor<org.springframework.data.domain.Pageable> captor =
                ArgumentCaptor.forClass(org.springframework.data.domain.Pageable.class);
        verify(dao).findByUserId(eq(USER), captor.capture());
        var pageable = captor.getValue();
        assertEquals(2, pageable.getPageNumber());
        assertEquals(10, pageable.getPageSize());
        assertEquals(Sort.Direction.DESC, pageable.getSort().getOrderFor("timestamp").getDirection());
        assertEquals(Sort.Direction.DESC, pageable.getSort().getOrderFor("auditId").getDirection());
    }

    @Test void filtersByAction() {
        when(dao.findByUserIdAndAction(eq(USER), eq(AuditAction.RECORD_VIEWED), any()))
                .thenReturn(new PageImpl<>(List.of(log())));
        assertEquals(1, service.byAction(USER, "RECORD_VIEWED", 0, 20).getTotalElements());
        assertThrows(IllegalArgumentException.class, () -> service.byAction(USER, "NOT_AN_ACTION", 0, 20));
    }

    @Test void filtersByEntity() {
        when(dao.findByUserIdAndEntityTypeAndEntityId(eq(USER), eq("MEDICAL_TIMELINE"), eq(31L), any()))
                .thenReturn(new PageImpl<>(List.of(log())));
        assertEquals(1, service.byEntity(USER, "MEDICAL_TIMELINE", 31L, 0, 20).getTotalElements());
        assertThrows(IllegalArgumentException.class, () -> service.byEntity(USER, "patient name", 31L, 0, 20));
    }

    @Test void filtersByDateRange() {
        LocalDateTime start = LocalDateTime.of(2026, 1, 1, 0, 0);
        LocalDateTime end = start.plusDays(1);
        when(dao.findByUserIdAndTimestampBetween(eq(USER), eq(start), eq(end), any()))
                .thenReturn(new PageImpl<>(List.of(log())));
        assertEquals(1, service.byDateRange(USER, start, end, 0, 20).getTotalElements());
        assertThrows(IllegalArgumentException.class, () -> service.byDateRange(USER, end, start, 0, 20));
    }

    @Test void rejectsInvalidPagination() {
        assertThrows(IllegalArgumentException.class, () -> service.byUser(USER, USER, -1, 20));
        assertThrows(IllegalArgumentException.class, () -> service.byUser(USER, USER, 0, 101));
    }

    @Test void rejectsAccessToAnotherUsersAuditHistory() {
        assertThrows(UnauthorizedAccessException.class, () -> service.byUser(USER, USER + 1, 0, 20));
        verify(dao).save(argThat(entry -> entry.getAction() == AuditAction.RECORD_ACCESS_DENIED));
    }

    @Test void returnsNotFoundForUnknownOrForeignAuditId() {
        when(dao.findByAuditIdAndUserId(AUDIT_ID, USER)).thenReturn(Optional.empty());
        assertThrows(ResourceNotFoundException.class, () -> service.get(USER, AUDIT_ID));
        verify(dao).save(argThat(entry -> entry.getAction() == AuditAction.RECORD_ACCESS_DENIED));
    }
}
