package com.aarovya.dto;

import com.aarovya.entities.User;

public class UserResponse {

    private Long userId;
    private String fullName;
    private String email;
    private String mobileNumber;
    private boolean enabled;

    public UserResponse(User user) {
        this.userId = user.getUserId();
        this.fullName = user.getFullName();
        this.email = user.getEmail();
        this.mobileNumber = user.getMobileNumber();
        this.enabled = user.isEnabled();
    }

    public Long getUserId() {
        return userId;
    }

    public String getFullName() {
        return fullName;
    }

    public String getEmail() {
        return email;
    }

    public String getMobileNumber() {
        return mobileNumber;
    }

    public boolean isEnabled() {
        return enabled;
    }
}
