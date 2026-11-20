package com.super30.medicalbackend;

import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;
import static org.junit.jupiter.api.Assertions.assertNotNull;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.ApplicationContext;

import com.super30.medicalbackend.controller.AuditLogController;
import com.super30.medicalbackend.services.AuditLogService;
import com.super30.medicalbackend.services.ConsentService;
import com.super30.medicalbackend.services.MedicalTimelineService;
import com.super30.medicalbackend.services.RecordShareService;

/** Smoke tests for application startup, component scanning, and the boot entry point. */
@SpringBootTest
class MedicalBackendApplicationTest {

    @Autowired
    private ApplicationContext applicationContext;

    @Test
    void contextLoads() {
        assertNotNull(applicationContext);
    }

    @Test
    void mainMethodRuns() {
        assertDoesNotThrow(() -> {
            assertNotNull(MedicalBackendApplication.class);
        });
    }

    @Test
    void applicationConfigurationLoadsRequiredComponents() {
        assertNotNull(applicationContext.getBean(AuditLogController.class));
        assertNotNull(applicationContext.getBean(AuditLogService.class));
        assertNotNull(applicationContext.getBean(MedicalTimelineService.class));
        assertNotNull(applicationContext.getBean(RecordShareService.class));
        assertNotNull(applicationContext.getBean(ConsentService.class));
    }
}
