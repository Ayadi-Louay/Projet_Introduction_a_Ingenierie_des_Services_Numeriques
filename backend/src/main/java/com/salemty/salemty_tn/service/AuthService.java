package com.salemty.salemty_tn.service;

import com.salemty.salemty_tn.model.User;
import com.salemty.salemty_tn.dto.RegisterRequest;
import com.salemty.salemty_tn.dto.LoginRequest;
import com.salemty.salemty_tn.dto.LoginResponse;
import com.salemty.salemty_tn.dto.UserProfileDTO;

public interface AuthService {
    LoginResponse register(RegisterRequest request);

    LoginResponse login(LoginRequest request);

    void verifyEmail(String token);

    void forgotPassword(String email);

    void resetPassword(String token, String newPassword);

    UserProfileDTO getMe(String userId);

    User getUserById(String userId);
}
