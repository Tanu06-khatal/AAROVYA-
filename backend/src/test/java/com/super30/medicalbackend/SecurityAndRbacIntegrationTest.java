package com.super30.medicalbackend;

import static org.junit.jupiter.api.Assertions.*;

import java.security.Principal;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Test;
import org.springframework.security.core.context.SecurityContextHolder;

import com.super30.medicalbackend.enums.UserRole;
import com.super30.medicalbackend.exception.UnauthorizedAccessException;
import com.super30.medicalbackend.security.AarovyaAuthenticationToken;
import com.super30.medicalbackend.security.AarovyaPrincipal;
import com.super30.medicalbackend.security.AuthenticatedUser;

class SecurityAndRbacIntegrationTest {

    @AfterEach
    void tearDown() {
        SecurityContextHolder.clearContext();
    }

    @Test
    void resolvesIdentityFromAarovyaPrincipal() {
        AarovyaPrincipal principal = new AarovyaPrincipal(101L, "patient1@aarovya.health", UserRole.PATIENT, "Patient One");
        assertEquals(101L, AuthenticatedUser.id(principal));
        assertEquals(UserRole.PATIENT, AuthenticatedUser.role(principal));
        assertTrue(AuthenticatedUser.hasRole(principal, UserRole.PATIENT));
        assertFalse(AuthenticatedUser.hasRole(principal, UserRole.DOCTOR));
    }

    @Test
    void resolvesIdentityFromAarovyaAuthenticationToken() {
        AarovyaPrincipal principal = new AarovyaPrincipal(202L, "doc@hospital.com", UserRole.DOCTOR, "Dr. Priya");
        AarovyaAuthenticationToken token = new AarovyaAuthenticationToken(principal);
        SecurityContextHolder.getContext().setAuthentication(token);

        assertEquals(202L, AuthenticatedUser.id(null));
        assertEquals(UserRole.DOCTOR, AuthenticatedUser.role(null));
        assertTrue(AuthenticatedUser.hasRole(null, UserRole.DOCTOR));
    }

    @Test
    void resolvesNumericLegacyPrincipalName() {
        Principal principal = () -> "303";
        assertEquals(303L, AuthenticatedUser.id(principal));
        assertEquals(UserRole.PATIENT, AuthenticatedUser.role(principal));
    }

    @Test
    void resolvesPrefixedPrincipalName() {
        Principal principal = () -> "usr-404";
        assertEquals(404L, AuthenticatedUser.id(principal));
    }

    @Test
    void throwsUnauthorizedWhenNoPrincipalOrContext() {
        SecurityContextHolder.clearContext();
        assertThrows(UnauthorizedAccessException.class, () -> AuthenticatedUser.id(null));
    }

    @Test
    void allowsSelfOrAdminAuthorization() {
        AarovyaPrincipal patient = new AarovyaPrincipal(505L, "p@test.com", UserRole.PATIENT, "Patient");
        AarovyaPrincipal admin = new AarovyaPrincipal(999L, "admin@test.com", UserRole.ADMIN, "Admin");

        // Self can access self
        assertDoesNotThrow(() -> AuthenticatedUser.requireSelfOrAdmin(patient, 505L));

        // Admin can access any user
        assertDoesNotThrow(() -> AuthenticatedUser.requireSelfOrAdmin(admin, 505L));

        // Other patient cannot access
        assertThrows(UnauthorizedAccessException.class,
                () -> AuthenticatedUser.requireSelfOrAdmin(patient, 606L));
    }

    @Test
    void mapsRolesCorrectly() {
        assertEquals(UserRole.PATIENT, UserRole.fromString("patient"));
        assertEquals(UserRole.DOCTOR, UserRole.fromString("doctor"));
        assertEquals(UserRole.LAB, UserRole.fromString("laboratory"));
        assertEquals(UserRole.LAB, UserRole.fromString("lab_staff"));
        assertEquals(UserRole.ADMIN, UserRole.fromString("ROLE_ADMIN"));
        assertNull(UserRole.fromString("unknown_role"));
    }
}
