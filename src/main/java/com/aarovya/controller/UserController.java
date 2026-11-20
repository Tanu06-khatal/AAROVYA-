package com.aarovya.controller;

import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.aarovya.dto.UpdateUserRequest;
import com.aarovya.dto.UserResponse;
import com.aarovya.entities.User;
import com.aarovya.services.UserService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/users")
@PreAuthorize("hasRole('ADMIN')")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    // Get user by ID
    @GetMapping("/{id}")
    public ResponseEntity<UserResponse> getUserById(@PathVariable Long id) {

        User user = userService.getUserById(id);

        return ResponseEntity.ok(new UserResponse(user));
    }

    // Get all users
    @GetMapping
    public ResponseEntity<List<UserResponse>> getAllUsers() {

        List<UserResponse> users = userService.getAllUsers()
                .stream()
                .map(UserResponse::new)
                .toList();

        return ResponseEntity.ok(users);
    }

    // Update user details
    @PutMapping("/{id}")
    public ResponseEntity<UserResponse> updateUser(
            @PathVariable Long id,
            @Valid @RequestBody UpdateUserRequest request) {

        User updatedUser = new User();

        updatedUser.setFullName(request.getFullName());
        updatedUser.setMobileNumber(request.getMobileNumber());

        User savedUser = userService.updateUser(id, updatedUser);

        return ResponseEntity.ok(new UserResponse(savedUser));
    }

    // Deactivate user
    @PatchMapping("/{id}/deactivate")
    public ResponseEntity<Map<String, String>> deactivateUser(
            @PathVariable Long id) {

        userService.deactivateUser(id);

        return ResponseEntity.ok(
                Map.of("message", "User deactivated successfully"));
    }
}
