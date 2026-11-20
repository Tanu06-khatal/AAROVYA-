package com.aarovya.security;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import java.util.Collections;

import jakarta.servlet.FilterChain;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.mock.web.MockHttpServletResponse;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;

import com.aarovya.entities.User;

class JwtAuthenticationFilterTest {

    private JwtService jwtService;
    private CustomUserDetailsService userDetailsService;
    private JwtAuthenticationFilter filter;

    @BeforeEach
    void setUp() {
        jwtService = mock(JwtService.class);
        userDetailsService = mock(CustomUserDetailsService.class);

        filter = new JwtAuthenticationFilter(
                jwtService, userDetailsService);

        SecurityContextHolder.clearContext();
    }

    @AfterEach
    void tearDown() {
        SecurityContextHolder.clearContext();
    }

    @Test
    void authenticateEnabledUserWithValidToken() throws Exception {

        String token = "valid-token";
        String email = "enabled@gmail.com";

        User user = new User();
        user.setEmail(email);
        user.setEnabled(true);

        UserDetails userDetails = new CustomUserDetails(user);

        when(jwtService.extractUsername(token)).thenReturn(email);
        when(userDetailsService.loadUserByUsername(email))
                .thenReturn(userDetails);
        when(jwtService.isTokenValid(token, userDetails))
                .thenReturn(true);

        MockHttpServletRequest request = new MockHttpServletRequest();
        request.addHeader("Authorization", "Bearer " + token);

        MockHttpServletResponse response = new MockHttpServletResponse();
        FilterChain chain = mock(FilterChain.class);

        filter.doFilter(request, response, chain);

        assertNotNull(
                SecurityContextHolder.getContext().getAuthentication());

        verify(chain).doFilter(request, response);
    }

    @Test
    void rejectDisabledUserWithPreviouslyIssuedToken() throws Exception {

        String token = "previously-issued-token";
        String email = "disabled@gmail.com";

        User user = new User();
        user.setEmail(email);
        user.setEnabled(false);

        UserDetails userDetails = new CustomUserDetails(user);

        when(jwtService.extractUsername(token)).thenReturn(email);
        when(userDetailsService.loadUserByUsername(email))
                .thenReturn(userDetails);

        MockHttpServletRequest request = new MockHttpServletRequest();
        request.addHeader("Authorization", "Bearer " + token);

        MockHttpServletResponse response = new MockHttpServletResponse();
        FilterChain chain = mock(FilterChain.class);

        filter.doFilter(request, response, chain);

        assertNull(
                SecurityContextHolder.getContext().getAuthentication());

        verify(jwtService, never()).isTokenValid(token, userDetails);
        verify(chain).doFilter(request, response);
    }
}