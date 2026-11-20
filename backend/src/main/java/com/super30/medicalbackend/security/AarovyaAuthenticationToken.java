package com.super30.medicalbackend.security;

import org.springframework.security.authentication.AbstractAuthenticationToken;

/**
 * Spring Security Authentication token for verified AAROVYA requests.
 */
public class AarovyaAuthenticationToken extends AbstractAuthenticationToken {
    private final AarovyaPrincipal principal;

    public AarovyaAuthenticationToken(AarovyaPrincipal principal) {
        super(principal.getAuthorities());
        this.principal = principal;
        setAuthenticated(true);
    }

    @Override
    public Object getCredentials() {
        return "";
    }

    @Override
    public AarovyaPrincipal getPrincipal() {
        return principal;
    }
}
