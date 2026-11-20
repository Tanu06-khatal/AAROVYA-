package com.aarovya.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AuthResponse {

    private String token;

    private Long userId;

    private String fullName;

    private String email;

    public AuthResponse(
            String token,
            Long userId,
            String fullName,
            String email) {

        this.token = token;
        this.userId = userId;
        this.fullName = fullName;
        this.email = email;
    }
}
