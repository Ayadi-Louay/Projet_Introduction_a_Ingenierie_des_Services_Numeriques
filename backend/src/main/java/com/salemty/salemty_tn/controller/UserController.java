package com.salemty.salemty_tn.controller;

import com.salemty.salemty_tn.dto.ApiResponse;
import com.salemty.salemty_tn.dto.UpdateProfileRequest;
import com.salemty.salemty_tn.dto.UserProfileDTO;
import com.salemty.salemty_tn.model.User;
import com.salemty.salemty_tn.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
@CrossOrigin(origins = { "http://localhost:4200", "http://localhost:3000" })
public class UserController {

    private final UserService userService;

    @GetMapping("/profile")
    public ResponseEntity<ApiResponse<User>> getProfile(@RequestHeader("Authorization") String token) {
        try {
            String userId = "test-user-id"; // Extract from token
            User user = userService.getProfile(userId);
            return ResponseEntity.ok(new ApiResponse<>(true, "Profil récupéré", user));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(new ApiResponse<>(false, "Erreur lors de la récupération", null, e.getMessage()));
        }
    }

    @PutMapping("/profile")
    public ResponseEntity<ApiResponse<User>> updateProfile(
            @RequestHeader("Authorization") String token,
            @RequestBody UpdateProfileRequest request) {
        try {
            String userId = "test-user-id"; // Extract from token
            User user = userService.updateProfile(userId, request);
            return ResponseEntity.ok(new ApiResponse<>(true, "Profil mis à jour", user));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(new ApiResponse<>(false, "Erreur lors de la mise à jour", null, e.getMessage()));
        }
    }

    @DeleteMapping("/account")
    public ResponseEntity<ApiResponse<String>> deleteAccount(@RequestHeader("Authorization") String token) {
        try {
            String userId = "test-user-id"; // Extract from token
            userService.deleteAccount(userId);
            return ResponseEntity.ok(new ApiResponse<>(true, "Compte supprimé", "OK"));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(new ApiResponse<>(false, "Erreur lors de la suppression", null, e.getMessage()));
        }
    }

    @GetMapping("/notifications")
    public ResponseEntity<ApiResponse<List<String>>> getNotifications(@RequestHeader("Authorization") String token) {
        try {
            String userId = "test-user-id"; // Extract from token
            List<String> notifications = userService.getNotifications(userId);
            return ResponseEntity.ok(new ApiResponse<>(true, "Notifications", notifications));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(new ApiResponse<>(false, "Erreur lors de la récupération", null, e.getMessage()));
        }
    }
}
