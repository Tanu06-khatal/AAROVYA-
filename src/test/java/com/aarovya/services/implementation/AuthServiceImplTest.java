package com.aarovya.services.implementation;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.aarovya.dao.RoleDao;
import com.aarovya.dao.UserDao;
import com.aarovya.dto.AuthResponse;
import com.aarovya.dto.LoginRequest;
import com.aarovya.dto.RegisterRequest;
import com.aarovya.entities.Role;
import com.aarovya.entities.User;
import com.aarovya.exception.DuplicateResourceException;
import com.aarovya.security.JwtService;

@ExtendWith(MockitoExtension.class)
class AuthServiceImplTest {

    @Mock
    private UserDao userDao;

    @Mock
    private RoleDao roleDao;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private JwtService jwtService;

    @InjectMocks
    private AuthServiceImpl authService;

    private Role patientRole;

    @BeforeEach
    void setUp() {
        patientRole = new Role();
        patientRole.setRoleId(1L);
        patientRole.setRoleName("PATIENT");
    }

    @Test
    void registerUserSuccessfully() {
        RegisterRequest request = new RegisterRequest();
        request.setFullName("Test Patient");
        request.setEmail("TEST@GMAIL.COM");
        request.setMobileNumber("9876543210");
        request.setPassword("Test@12345");
        request.setRoleName("PATIENT");

        when(userDao.existsByEmail("test@gmail.com")).thenReturn(false);
        when(userDao.existsByMobileNumber("9876543210")).thenReturn(false);
        when(roleDao.findByRoleName("PATIENT"))
                .thenReturn(Optional.of(patientRole));
        when(passwordEncoder.encode("Test@12345"))
                .thenReturn("encoded-password");

        when(userDao.save(any(User.class))).thenAnswer(invocation -> {
            User user = invocation.getArgument(0);
            user.setUserId(10L);
            return user;
        });

        when(jwtService.generateToken(any(User.class)))
                .thenReturn("test-jwt-token");

        AuthResponse response = authService.registerUser(request);

        assertNotNull(response);
        assertEquals(10L, response.getUserId());
        assertEquals("test@gmail.com", response.getEmail());

        verify(userDao).save(any(User.class));
        verify(passwordEncoder).encode("Test@12345");
    }

    @Test
    void registerUserRejectsDuplicateEmail() {
        RegisterRequest request = new RegisterRequest();
        request.setFullName("Test Patient");
        request.setEmail("test@gmail.com");
        request.setMobileNumber("9876543210");
        request.setPassword("Test@12345");
        request.setRoleName("PATIENT");

        when(userDao.existsByEmail("test@gmail.com")).thenReturn(true);

        assertThrows(DuplicateResourceException.class,
                () -> authService.registerUser(request));

        verify(userDao, never()).save(any(User.class));
    }

    @Test
    void registerUserRejectsDuplicateMobile() {
        RegisterRequest request = new RegisterRequest();
        request.setFullName("Test Patient");
        request.setEmail("new@gmail.com");
        request.setMobileNumber("9876543210");
        request.setPassword("Test@12345");
        request.setRoleName("PATIENT");

        when(userDao.existsByEmail("new@gmail.com")).thenReturn(false);
        when(roleDao.findByRoleName("PATIENT"))
                .thenReturn(Optional.of(patientRole));
        when(userDao.existsByMobileNumber("9876543210")).thenReturn(true);

        assertThrows(DuplicateResourceException.class,
                () -> authService.registerUser(request));

        verify(userDao, never()).save(any(User.class));
    }

    @Test
    void loginUserSuccessfully() {
        LoginRequest request = new LoginRequest();
        request.setEmail("TEST@GMAIL.COM");
        request.setPassword("Test@12345");

        User user = new User();
        user.setUserId(10L);
        user.setFullName("Test Patient");
        user.setEmail("test@gmail.com");
        user.setPassword("encoded-password");
        user.setEnabled(true);

        when(userDao.findByEmail("test@gmail.com"))
                .thenReturn(Optional.of(user));
        when(passwordEncoder.matches("Test@12345", "encoded-password"))
                .thenReturn(true);
        when(jwtService.generateToken(user)).thenReturn("test-jwt-token");

        AuthResponse response = authService.loginUser(request);

        assertNotNull(response);
        assertEquals(10L, response.getUserId());
        assertEquals("test@gmail.com", response.getEmail());
    }

    @Test
    void loginUserRejectsInvalidPassword() {
        LoginRequest request = new LoginRequest();
        request.setEmail("test@gmail.com");
        request.setPassword("WrongPassword");

        User user = new User();
        user.setEmail("test@gmail.com");
        user.setPassword("encoded-password");
        user.setEnabled(true);

        when(userDao.findByEmail("test@gmail.com"))
                .thenReturn(Optional.of(user));
        when(passwordEncoder.matches("WrongPassword", "encoded-password"))
                .thenReturn(false);

        assertThrows(IllegalArgumentException.class,
                () -> authService.loginUser(request));
    }

    @Test
    void loginUserRejectsDisabledAccount() {
        LoginRequest request = new LoginRequest();
        request.setEmail("disabled@gmail.com");
        request.setPassword("Test@12345");

        User user = new User();
        user.setEmail("disabled@gmail.com");
        user.setPassword("encoded-password");
        user.setEnabled(false);

        when(userDao.findByEmail("disabled@gmail.com"))
                .thenReturn(Optional.of(user));
        when(passwordEncoder.matches("Test@12345", "encoded-password"))
                .thenReturn(true);

        assertThrows(IllegalArgumentException.class,
                () -> authService.loginUser(request));

        verify(jwtService, never()).generateToken(any(User.class));
    }
}