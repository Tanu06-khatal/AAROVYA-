package com.aarovya.services.implementation;

import java.util.HashSet;
import java.util.Locale;
import java.util.Set;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.aarovya.dao.UserDao;
import com.aarovya.dao.RoleDao;
import com.aarovya.entities.User;
import com.aarovya.entities.Role;
import com.aarovya.dto.AuthResponse;
import com.aarovya.dto.LoginRequest;
import com.aarovya.dto.RegisterRequest;
import com.aarovya.exception.DuplicateResourceException;
import com.aarovya.services.AuthService;
import com.aarovya.security.JwtService;

@Service
public class AuthServiceImpl implements AuthService {

    private static final Logger logger =
            LoggerFactory.getLogger(AuthServiceImpl.class);

    private static final Set<String> PUBLIC_ROLES =
            Set.of("PATIENT", "DOCTOR", "LABORATORY");

    private final UserDao userDao;
    private final RoleDao roleDao;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public AuthServiceImpl(
            UserDao userDao,
            RoleDao roleDao,
            PasswordEncoder passwordEncoder,
            JwtService jwtService) {

        this.userDao = userDao;
        this.roleDao = roleDao;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    @Override
    @Transactional
    public AuthResponse registerUser(RegisterRequest registerRequest) {

        String normalizedEmail =
                registerRequest.getEmail().trim().toLowerCase(Locale.ROOT);

        logger.info("Registering user: {}", normalizedEmail);

        if (userDao.existsByEmail(normalizedEmail)) {
            throw new DuplicateResourceException(
                    "Email is already registered");
        }

        String requestedRole = registerRequest.getRoleName();

        if (requestedRole == null || requestedRole.isBlank()) {
            throw new IllegalArgumentException("Role name is required");
        }

        final String roleToAssign =
                requestedRole.trim().toUpperCase(Locale.ROOT);

        if (!PUBLIC_ROLES.contains(roleToAssign)) {
            throw new IllegalArgumentException(
                    "Invalid role for public registration. "
                    + "Allowed roles: PATIENT, DOCTOR, LABORATORY");
        }

        Role assignedRole = roleDao
                .findByRoleName(roleToAssign)
                .orElseThrow(() -> new IllegalArgumentException(
                        "Role not found: " + roleToAssign));

        User newUser = new User();

        newUser.setFullName(registerRequest.getFullName());
        newUser.setEmail(normalizedEmail);

        String mobileNumber = registerRequest.getMobileNumber();
        if (mobileNumber != null) {
            mobileNumber = mobileNumber.trim();
        }

        if (mobileNumber != null && !mobileNumber.isBlank()
                && userDao.existsByMobileNumber(mobileNumber)) {
            throw new DuplicateResourceException(
                    "Mobile number is already registered");
        }

        newUser.setMobileNumber(mobileNumber);

        newUser.setPassword(
                passwordEncoder.encode(registerRequest.getPassword()));

        newUser.setRoles(new HashSet<>(Set.of(assignedRole)));

        User savedUser = userDao.save(newUser);

        logger.info("User registered successfully. ID: {}",
                savedUser.getUserId());

        String jwtToken = jwtService.generateToken(savedUser);

        return new AuthResponse(
                jwtToken,
                savedUser.getUserId(),
                savedUser.getFullName(),
                savedUser.getEmail());
    }

    @Override
    @Transactional(readOnly = true)
    public AuthResponse loginUser(LoginRequest loginRequest) {

        String normalizedEmail =
                loginRequest.getEmail().trim().toLowerCase(Locale.ROOT);

        logger.info("Login attempt: {}", normalizedEmail);

        User existingUser = userDao
                .findByEmail(normalizedEmail)
                .orElseThrow(() -> new IllegalArgumentException(
                        "Invalid email or password"));

        if (!passwordEncoder.matches(
                loginRequest.getPassword(),
                existingUser.getPassword())) {

            throw new IllegalArgumentException(
                    "Invalid email or password");
        }

        if (!existingUser.isEnabled()) {
            throw new IllegalArgumentException(
                    "User account is disabled");
        }

        String jwtToken = jwtService.generateToken(existingUser);

        logger.info("User logged in successfully. ID: {}",
                existingUser.getUserId());

        return new AuthResponse(
                jwtToken,
                existingUser.getUserId(),
                existingUser.getFullName(),
                existingUser.getEmail());
    }
}