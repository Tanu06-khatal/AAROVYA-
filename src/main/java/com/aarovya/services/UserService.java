package com.aarovya.services;

import java.util.List;

import com.aarovya.entities.User;

public interface UserService {

    User getUserById(Long userId);

    List<User> getAllUsers();

    User updateUser(Long userId, User updatedUser);

    void deactivateUser(Long userId);
}
