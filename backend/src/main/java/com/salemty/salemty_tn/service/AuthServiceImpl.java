package com.salemty.salemty_tn.service;

import com.salemty.salemty_tn.model.User;
import com.salemty.salemty_tn.dto.RegisterRequest;
import com.salemty.salemty_tn.dto.LoginRequest;
import com.salemty.salemty_tn.dto.LoginResponse;
import com.salemty.salemty_tn.dto.UserProfileDTO;
import com.salemty.salemty_tn.dto.UpdateProfileRequest;
import com.salemty.salemty_tn.repository.UserRepository;
import com.salemty.salemty_tn.repository.EmailTokenRepository;
import com.salemty.salemty_tn.model.EmailToken;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final EmailTokenRepository emailTokenRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final EmailService emailService;

    @Override
    public LoginResponse register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already exists");
        }

        User user = new User();
        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setPhone(request.getPhone());
        user.setAddress(request.getAddress());
        user.setCity(request.getCity());
        user.setGovernorate(request.getGovernorate());
        user.setPostalCode(request.getPostalCode());
        user.setRole("CITIZEN");
        user.setEmailVerified(true); // Auto-verify for now
        user.setActive(true);
        user.setCreatedAt(LocalDateTime.now());

        User savedUser = userRepository.save(user);

        // Generate JWT token
        String token = jwtService.generateToken(savedUser.getId());

        // Send verification email (optional, since we auto-verify)
        String emailToken = UUID.randomUUID().toString();
        EmailToken emailTokenObj = new EmailToken();
        emailTokenObj.setEmail(request.getEmail());
        emailTokenObj.setToken(emailToken);
        emailTokenObj.setType("VERIFICATION");
        emailTokenObj.setCreatedAt(LocalDateTime.now());
        emailTokenObj.setExpiresAt(LocalDateTime.now().plusHours(24));
        emailTokenObj.setUsed(false);

        emailTokenRepository.save(emailTokenObj);
        emailService.sendVerificationEmail(request.getEmail(), emailToken);

        // Return login response with token
        LoginResponse response = new LoginResponse();
        response.setToken(token);
        response.setUserId(savedUser.getId());
        response.setEmail(savedUser.getEmail());
        response.setFirstName(savedUser.getFirstName());
        response.setLastName(savedUser.getLastName());
        response.setRole(savedUser.getRole());

        return response;
    }

    @Override
    public LoginResponse login(LoginRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid password");
        }

        if (!user.isEmailVerified()) {
            throw new RuntimeException("Email not verified");
        }

        user.setLastLogin(LocalDateTime.now());
        userRepository.save(user);

        String token = jwtService.generateToken(user.getId());

        LoginResponse response = new LoginResponse();
        response.setToken(token);
        response.setUserId(user.getId());
        response.setEmail(user.getEmail());
        response.setFirstName(user.getFirstName());
        response.setLastName(user.getLastName());
        response.setRole(user.getRole());

        return response;
    }

    @Override
    public void verifyEmail(String token) {
        EmailToken emailToken = emailTokenRepository.findByToken(token)
                .orElseThrow(() -> new RuntimeException("Invalid token"));

        if (emailToken.isUsed() || emailToken.getExpiresAt().isBefore(LocalDateTime.now())) {
            throw new RuntimeException("Token expired");
        }

        User user = userRepository.findByEmail(emailToken.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.setEmailVerified(true);
        user.setUpdatedAt(LocalDateTime.now());
        userRepository.save(user);

        emailToken.setUsed(true);
        emailTokenRepository.save(emailToken);
    }

    @Override
    public void forgotPassword(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        String token = UUID.randomUUID().toString();
        EmailToken emailToken = new EmailToken();
        emailToken.setEmail(email);
        emailToken.setToken(token);
        emailToken.setType("PASSWORD_RESET");
        emailToken.setCreatedAt(LocalDateTime.now());
        emailToken.setExpiresAt(LocalDateTime.now().plusHours(1));
        emailToken.setUsed(false);

        emailTokenRepository.save(emailToken);
        emailService.sendPasswordResetEmail(email, token);
    }

    @Override
    public void resetPassword(String token, String newPassword) {
        EmailToken emailToken = emailTokenRepository.findByToken(token)
                .orElseThrow(() -> new RuntimeException("Invalid token"));

        if (emailToken.isUsed() || emailToken.getExpiresAt().isBefore(LocalDateTime.now())) {
            throw new RuntimeException("Token expired");
        }

        User user = userRepository.findByEmail(emailToken.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.setPassword(passwordEncoder.encode(newPassword));
        user.setUpdatedAt(LocalDateTime.now());
        userRepository.save(user);

        emailToken.setUsed(true);
        emailTokenRepository.save(emailToken);
    }

    @Override
    public UserProfileDTO getMe(String userId) {
        User user = getUserById(userId);
        return convertToDTO(user);
    }

    @Override
    public User getUserById(String userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    private UserProfileDTO convertToDTO(User user) {
        UserProfileDTO dto = new UserProfileDTO();
        dto.setId(user.getId());
        dto.setFirstName(user.getFirstName());
        dto.setLastName(user.getLastName());
        dto.setEmail(user.getEmail());
        dto.setPhone(user.getPhone());
        dto.setAddress(user.getAddress());
        dto.setCity(user.getCity());
        dto.setGovernorate(user.getGovernorate());
        dto.setPostalCode(user.getPostalCode());
        dto.setRole(user.getRole());
        dto.setEmailVerified(user.isEmailVerified());
        dto.setProfilePicture(user.getProfilePicture());
        return dto;
    }
}
