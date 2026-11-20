package com.aarovya.services.implementation;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.aarovya.dao.UserDao;
import com.aarovya.entities.User;
import com.aarovya.exception.ResourceNotFoundException;

@ExtendWith(MockitoExtension.class)
class UserServiceImplTest {

    @Mock
    private UserDao userDao;

    @InjectMocks
    private UserServiceImpl userService;

    private User user;

    @BeforeEach
    void setUp() {
        user = new User();
        user.setUserId(1L);
        user.setFullName("Test Patient");
        user.setEmail("test@gmail.com");
        user.setEnabled(true);
    }

    @Test
    void deactivateUserSuccessfully() {

        when(userDao.findById(1L)).thenReturn(Optional.of(user));
        when(userDao.save(any(User.class))).thenAnswer(
                invocation -> invocation.getArgument(0));

        userService.deactivateUser(1L);

        assertFalse(user.isEnabled());
        verify(userDao).save(user);
    }

    @Test
    void deactivateUserThrowsExceptionWhenUserDoesNotExist() {

        when(userDao.findById(99L)).thenReturn(Optional.empty());

        assertThrows(ResourceNotFoundException.class,
                () -> userService.deactivateUser(99L));

        verify(userDao, never()).save(any(User.class));
    }

    @Test
    void getUserByIdSuccessfully() {

        when(userDao.findById(1L)).thenReturn(Optional.of(user));

        User result = userService.getUserById(1L);

        assertNotNull(result);
        assertEquals(1L, result.getUserId());
        assertEquals("test@gmail.com", result.getEmail());
    }
}