package com.aarovya.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.aarovya.dto.AuthResponse;
import com.aarovya.dto.LoginRequest;
import com.aarovya.dto.RegisterRequest;
import com.aarovya.services.AuthService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> registerUser(
            @Valid @RequestBody RegisterRequest registerRequest) {

        AuthResponse response = authService.registerUser(registerRequest);

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> loginUser(
            @Valid @RequestBody LoginRequest loginRequest) {

        AuthResponse response = authService.loginUser(loginRequest);

        return ResponseEntity.ok(response);
    }
}
