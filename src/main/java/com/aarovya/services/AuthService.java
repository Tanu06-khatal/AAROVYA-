package com.aarovya.services;

import com.aarovya.dto.AuthResponse;
import com.aarovya.dto.LoginRequest;
import com.aarovya.dto.RegisterRequest;

public interface AuthService {

    AuthResponse registerUser(RegisterRequest registerRequest);

    AuthResponse loginUser(LoginRequest loginRequest);
}
