package com.super30.medicalbackend.security;

import java.security.Principal;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import com.super30.medicalbackend.enums.UserRole;
import com.super30.medicalbackend.exception.UnauthorizedAccessException;

/**
 * Resolves an authenticated Principal and role; identity is never accepted from untrusted request bodies.
 */
public final class AuthenticatedUser {

    private AuthenticatedUser() {}

    /**
     * Resolves the numeric user ID from the Principal or current SecurityContext.
     */
    public static Long id(Principal principal) {
        if (principal instanceof AarovyaPrincipal ap) {
            return ap.getUserId();
        }
        if (principal instanceof AarovyaAuthenticationToken at) {
            return at.getPrincipal().getUserId();
        }

        if (principal != null && principal.getName() != null) {
            try {
                long id = Long.parseLong(principal.getName().trim());
                if (id > 0) return id;
            } catch (NumberFormatException ignored) {
                // If formatted like usr-001, extract digits
                String digits = principal.getName().replaceAll("\\D+", "");
                if (!digits.isBlank()) {
                    try {
                        long id = Long.parseLong(digits);
                        if (id > 0) return id;
                    } catch (NumberFormatException ignored2) {}
                }
            }
        }

        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth != null && auth.isAuthenticated()) {
            if (auth.getPrincipal() instanceof AarovyaPrincipal ap) {
                return ap.getUserId();
            }
            if (auth.getName() != null) {
                try {
                    long id = Long.parseLong(auth.getName().trim());
                    if (id > 0) return id;
                } catch (NumberFormatException ignored) {
                    String digits = auth.getName().replaceAll("\\D+", "");
                    if (!digits.isBlank()) {
                        try {
                            long id = Long.parseLong(digits);
                            if (id > 0) return id;
                        } catch (NumberFormatException ignored2) {}
                    }
                }
            }
        }

        throw new UnauthorizedAccessException("Authentication is required");
    }

    /**
     * Resolves the user role from the Principal or current SecurityContext.
     */
    public static UserRole role(Principal principal) {
        if (principal instanceof AarovyaPrincipal ap) {
            return ap.getRole();
        }
        if (principal instanceof AarovyaAuthenticationToken at) {
            return at.getPrincipal().getRole();
        }

        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth != null && auth.getPrincipal() instanceof AarovyaPrincipal ap) {
            return ap.getRole();
        }

        return UserRole.PATIENT;
    }

    /**
     * Returns true if the authenticated user has the specified role.
     */
    public static boolean hasRole(Principal principal, UserRole requiredRole) {
        return role(principal) == requiredRole;
    }

    /**
     * Ensures the caller is either the owner of the resource or has an authorized administrative role.
     */
    public static void requireSelfOrAdmin(Principal principal, Long targetUserId) {
        Long actorId = id(principal);
        UserRole role = role(principal);
        if (!actorId.equals(targetUserId) && role != UserRole.ADMIN) {
            throw new UnauthorizedAccessException("Access denied: You are not authorized to access this resource");
        }
    }
}
