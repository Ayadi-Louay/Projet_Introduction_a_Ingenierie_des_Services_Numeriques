package com.salemty.salemty_tn.service;

import com.salemty.salemty_tn.model.User;
import com.salemty.salemty_tn.dto.UpdateProfileRequest;
import java.util.List;

public interface UserService {
    User getProfile(String userId);

    User updateProfile(String userId, UpdateProfileRequest request);

    void deleteAccount(String userId);

    List<String> getNotifications(String userId);
}
