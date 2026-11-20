package com.super30.medicalbackend.security;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.Base64;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.super30.medicalbackend.enums.UserRole;

/**
 * Authentication integration filter for Member 4 backend.
 *
 * Resolves the authenticated user identity via:
 * 1. Bearer JWT / authorization token (parsing claims).
 * 2. Trusted API Gateway headers (X-User-Id, X-User-Role, X-User-Email, X-User-Name)
 *    forwarded by the common AAROVYA authentication gateway or frontend integration layer.
 * 3. Security context already populated by an upstream filter or test fixture.
 *
 * If no valid credentials are provided, SecurityContext remains unauthenticated,
 * causing secured endpoints to fail securely with 401 Unauthorized.
 */
@Component
public class AarovyaAuthFilter extends OncePerRequestFilter {

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        if (SecurityContextHolder.getContext().getAuthentication() == null) {
            AarovyaPrincipal principal = resolvePrincipal(request);
            if (principal != null) {
                AarovyaAuthenticationToken authToken = new AarovyaAuthenticationToken(principal);
                SecurityContextHolder.getContext().setAuthentication(authToken);
            }
        }

        filterChain.doFilter(request, response);
    }

    private AarovyaPrincipal resolvePrincipal(HttpServletRequest request) {
        // 1. Check Gateway / Client headers
        String headerUserId = request.getHeader("X-User-Id");
        String headerRole = request.getHeader("X-User-Role");
        String headerEmail = request.getHeader("X-User-Email");
        String headerName = request.getHeader("X-User-Name");

        if (headerUserId != null && !headerUserId.isBlank()) {
            try {
                Long userId = parseUserId(headerUserId);
                if (userId != null && userId > 0) {
                    UserRole role = UserRole.fromString(headerRole);
                    return new AarovyaPrincipal(userId, headerEmail, role, headerName);
                }
            } catch (Exception ignored) {
            }
        }

        // 2. Check Bearer Token
        String authHeader = request.getHeader("Authorization");
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String token = authHeader.substring(7).trim();
            AarovyaPrincipal parsed = parseTokenClaims(token);
            if (parsed != null) return parsed;
        }

        return null;
    }

    private Long parseUserId(String raw) {
        if (raw == null || raw.isBlank()) return null;
        try {
            return Long.parseLong(raw.trim());
        } catch (NumberFormatException e) {
            // Check if it's formatted like usr-001 or doc-001
            String digits = raw.replaceAll("\\D+", "");
            if (!digits.isBlank()) {
                return Long.parseLong(digits);
            }
            return null;
        }
    }

    private AarovyaPrincipal parseTokenClaims(String token) {
        try {
            String[] parts = token.split("\\.");
            if (parts.length >= 2) {
                // Decode payload of standard JWT
                byte[] decoded = Base64.getUrlDecoder().decode(parts[1]);
                String json = new String(decoded, StandardCharsets.UTF_8);

                Long userId = extractJsonLong(json, "userId");
                if (userId == null) userId = extractJsonLong(json, "id");
                if (userId == null) userId = extractJsonLong(json, "sub");

                String roleStr = extractJsonString(json, "role");
                if (roleStr == null) roleStr = extractJsonString(json, "userRole");
                UserRole role = UserRole.fromString(roleStr);

                String email = extractJsonString(json, "email");
                String name = extractJsonString(json, "name");

                if (userId != null && userId > 0) {
                    return new AarovyaPrincipal(userId, email, role, name);
                }
            }
        } catch (Exception ignored) {
        }
        return null;
    }

    private Long extractJsonLong(String json, String key) {
        String pattern = "\"" + key + "\":";
        int idx = json.indexOf(pattern);
        if (idx == -1) return null;
        int start = idx + pattern.length();
        while (start < json.length() && (json.charAt(start) == ' ' || json.charAt(start) == '"')) {
            start++;
        }
        int end = start;
        while (end < json.length() && (Character.isDigit(json.charAt(end)))) {
            end++;
        }
        if (end > start) {
            try {
                return Long.parseLong(json.substring(start, end));
            } catch (NumberFormatException ignored) {}
        }
        return null;
    }

    private String extractJsonString(String json, String key) {
        String pattern = "\"" + key + "\":\"";
        int idx = json.indexOf(pattern);
        if (idx == -1) return null;
        int start = idx + pattern.length();
        int end = json.indexOf("\"", start);
        if (end > start) {
            return json.substring(start, end);
        }
        return null;
    }
}
