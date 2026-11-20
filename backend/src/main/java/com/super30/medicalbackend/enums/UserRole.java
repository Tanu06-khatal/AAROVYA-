package com.super30.medicalbackend.enums;

/**
 * Common AAROVYA system roles for RBAC.
 */
public enum UserRole {
    PATIENT,
    DOCTOR,
    LAB,
    ADMIN;

    public static UserRole fromString(String role) {
        if (role == null || role.isBlank()) return null;
        String normalized = role.trim().toUpperCase();
        if (normalized.equals("LABORATORY") || normalized.equals("LAB_STAFF")) return LAB;
        if (normalized.startsWith("ROLE_")) normalized = normalized.substring(5);
        try {
            return UserRole.valueOf(normalized);
        } catch (IllegalArgumentException e) {
            return null;
        }
    }
}
