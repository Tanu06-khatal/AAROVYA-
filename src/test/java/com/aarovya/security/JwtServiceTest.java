package com.aarovya.security;

import static org.junit.jupiter.api.Assertions.*;

import java.nio.charset.StandardCharsets;
import java.util.Base64;
import java.util.Date;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.test.util.ReflectionTestUtils;

import com.aarovya.entities.User;

import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

class JwtServiceTest {

    private JwtService jwtService;

    private static final String SECRET =
            Base64.getEncoder().encodeToString(
                    "01234567890123456789012345678901"
                    .getBytes(StandardCharsets.UTF_8));

    @BeforeEach
    void setUp() {
        jwtService = new JwtService();

        ReflectionTestUtils.setField(jwtService, "secretKey", SECRET);
        ReflectionTestUtils.setField(jwtService, "jwtExpiration", 86400000L);
    }

    @Test
    void generateAndValidateTokenSuccessfully() {
        User user = new User();
        user.setUserId(1L);
        user.setEmail("test@gmail.com");

        UserDetails userDetails =
                org.springframework.security.core.userdetails.User
                        .withUsername("test@gmail.com")
                        .password("password")
                        .roles("PATIENT")
                        .build();

        String token = jwtService.generateToken(user);

        assertNotNull(token);
        assertTrue(jwtService.isTokenValid(token, userDetails));
    }

    @Test
    void extractUsernameFromTokenSuccessfully() {
        User user = new User();
        user.setUserId(1L);
        user.setEmail("test@gmail.com");

        String token = jwtService.generateToken(user);

        String username = jwtService.extractUsername(token);

        assertEquals("test@gmail.com", username);
    }

    @Test
    void rejectTokenForDifferentUsername() {
        User user = new User();
        user.setUserId(1L);
        user.setEmail("test@gmail.com");

        UserDetails differentUser =
                org.springframework.security.core.userdetails.User
                        .withUsername("other@gmail.com")
                        .password("password")
                        .roles("PATIENT")
                        .build();

        String token = jwtService.generateToken(user);

        assertFalse(jwtService.isTokenValid(token, differentUser));
    }

    @Test
    void rejectInvalidToken() {
        UserDetails userDetails =
                org.springframework.security.core.userdetails.User
                        .withUsername("test@gmail.com")
                        .password("password")
                        .roles("PATIENT")
                        .build();

        assertThrows(JwtException.class,
                () -> jwtService.isTokenValid(
                        "invalid.token.value", userDetails));
    }

    @Test
    void rejectExpiredToken() {
        var signingKey = Keys.hmacShaKeyFor(
                Base64.getDecoder().decode(SECRET));

        String expiredToken = Jwts.builder()
                .subject("test@gmail.com")
                .issuedAt(new Date(System.currentTimeMillis() - 10000))
                .expiration(new Date(System.currentTimeMillis() - 5000))
                .signWith(signingKey)
                .compact();

        UserDetails userDetails =
                org.springframework.security.core.userdetails.User
                        .withUsername("test@gmail.com")
                        .password("password")
                        .roles("PATIENT")
                        .build();

        assertThrows(JwtException.class,
                () -> jwtService.isTokenValid(expiredToken, userDetails));
    }
}