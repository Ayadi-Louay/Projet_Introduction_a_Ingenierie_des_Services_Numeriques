package com.salemty.salemty_tn.controller;

import com.salemty.salemty_tn.dto.*;
import com.salemty.salemty_tn.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = { "http://localhost:4200", "http://localhost:3000" })
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<ApiResponse<String>> register(@RequestBody RegisterRequest request) {
        try {
            authService.register(request);
            return ResponseEntity
                    .ok(new ApiResponse<>(true, "Utilisateur créé avec succès. Vérifiez votre email.", "OK"));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(new ApiResponse<>(false, "Erreur lors de l'inscription", null, e.getMessage()));
        }
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<LoginResponse>> login(@RequestBody LoginRequest request) {
        try {
            LoginResponse response = authService.login(request);
            return ResponseEntity.ok(new ApiResponse<>(true, "Connexion réussie", response));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(new ApiResponse<>(false, "Erreur lors de la connexion", null, e.getMessage()));
        }
    }

    @PostMapping("/verify-email")
    public ResponseEntity<ApiResponse<String>> verifyEmail(@RequestParam String token) {
        try {
            authService.verifyEmail(token);
            return ResponseEntity.ok(new ApiResponse<>(true, "Email vérifié avec succès", "OK"));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(new ApiResponse<>(false, "Erreur lors de la vérification", null, e.getMessage()));
        }
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<ApiResponse<String>> forgotPassword(@RequestParam String email) {
        try {
            authService.forgotPassword(email);
            return ResponseEntity.ok(new ApiResponse<>(true, "Email de réinitialisation envoyé", "OK"));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(new ApiResponse<>(false, "Erreur lors de l'envoi", null, e.getMessage()));
        }
    }

    @PostMapping("/reset-password")
    public ResponseEntity<ApiResponse<String>> resetPassword(
            @RequestParam String token,
            @RequestBody PasswordResetRequest request) {
        try {
            authService.resetPassword(token, request.getNewPassword());
            return ResponseEntity.ok(new ApiResponse<>(true, "Mot de passe réinitialisé", "OK"));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(new ApiResponse<>(false, "Erreur lors de la réinitialisation", null, e.getMessage()));
        }
    }

    @GetMapping("/me")
    public ResponseEntity<ApiResponse<UserProfileDTO>> getMe(@RequestHeader("Authorization") String token) {
        try {
            // Extract userId from token (implementation depends on your JWT structure)
            String userId = "test-user-id"; // Replace with actual extraction
            UserProfileDTO profile = authService.getMe(userId);
            return ResponseEntity.ok(new ApiResponse<>(true, "Profil utilisateur", profile));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(new ApiResponse<>(false, "Erreur lors de la récupération", null, e.getMessage()));
        }
    }
}
