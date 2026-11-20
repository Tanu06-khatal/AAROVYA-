package com.super30.medicalbackend.security;

import java.security.Principal;
import java.util.Collection;
import java.util.Collections;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.super30.medicalbackend.enums.UserRole;

/**
 * Common authenticated user representation in AAROVYA platform.
 */
public class AarovyaPrincipal implements Principal, UserDetails {
    private final Long userId;
    private final String username;
    private final UserRole role;
    private final String fullName;
    private final List<GrantedAuthority> authorities;

    public AarovyaPrincipal(Long userId, String username, UserRole role, String fullName) {
        this.userId = userId;
        this.username = username != null ? username : String.valueOf(userId);
        this.role = role != null ? role : UserRole.PATIENT;
        this.fullName = fullName;
        this.authorities = Collections.singletonList(new SimpleGrantedAuthority("ROLE_" + this.role.name()));
    }

    public Long getUserId() {
        return userId;
    }

    public UserRole getRole() {
        return role;
    }

    public String getFullName() {
        return fullName;
    }

    @Override
    public String getName() {
        return String.valueOf(userId);
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    @Override
    public String getPassword() {
        return "";
    }

    @Override
    public String getUsername() {
        return username;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
