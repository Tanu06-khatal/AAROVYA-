package com.aarovya.services.implementation;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.aarovya.dao.UserDao;
import com.aarovya.entities.User;
import com.aarovya.exception.ResourceNotFoundException;
import com.aarovya.exception.DuplicateResourceException;
import com.aarovya.services.UserService;

@Service
public class UserServiceImpl implements UserService {

    private static final Logger logger =
            LoggerFactory.getLogger(UserServiceImpl.class);

    private final UserDao userDao;

    public UserServiceImpl(UserDao userDao) {
        this.userDao = userDao;
    }

    @Override
    @Transactional(readOnly = true)
    public User getUserById(Long userId) {

        logger.info("Fetching user with ID: {}", userId);

        return userDao.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "User not found with ID: " + userId));
    }

    @Override
    @Transactional(readOnly = true)
    public List<User> getAllUsers() {

        logger.info("Fetching all users");

        return userDao.findAll();
    }

    @Override
    @Transactional
    public User updateUser(Long userId, User updatedUser) {

        logger.info("Updating user with ID: {}", userId);

        User existingUser = getUserById(userId);

        String mobileNumber = updatedUser.getMobileNumber();

        if (mobileNumber != null) {
            mobileNumber = mobileNumber.trim();
        }

        if (mobileNumber != null && mobileNumber.isBlank()) {
            mobileNumber = null;
        }

        if (mobileNumber != null
                && userDao.existsByMobileNumberAndUserIdNot(
                        mobileNumber, userId)) {
            throw new DuplicateResourceException(
                    "Mobile number is already registered");
        }

        existingUser.setFullName(updatedUser.getFullName());
        existingUser.setMobileNumber(mobileNumber);

        User savedUser = userDao.save(existingUser);

        logger.info("User updated successfully. User ID: {}", userId);

        return savedUser;
    }

    @Override
    public void deactivateUser(Long userId) {

        logger.info("Deactivating user with ID: {}", userId);

        User existingUser = getUserById(userId);

        existingUser.setEnabled(false);

        userDao.save(existingUser);

        logger.info("User deactivated successfully. User ID: {}", userId);
    }
}
