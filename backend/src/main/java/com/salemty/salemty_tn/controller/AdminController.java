package com.salemty.salemty_tn.controller;

import com.salemty.salemty_tn.dto.ApiResponse;
import com.salemty.salemty_tn.dto.HealthAlertDTO;
import com.salemty.salemty_tn.model.HealthAlert;
import com.salemty.salemty_tn.service.AdminService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin")
@RequiredArgsConstructor
@CrossOrigin(origins = { "http://localhost:4200", "http://localhost:3000" })
public class AdminController {

    private final AdminService adminService;

    @GetMapping("/users")
    public ResponseEntity<ApiResponse<List<String>>> getUsers(
            @RequestHeader(value = "Authorization", required = false) String token) {
        try {
            List<String> users = adminService.getUsers();
            return ResponseEntity.ok(new ApiResponse<>(true, "Utilisateurs récupérés", users));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(new ApiResponse<>(false, "Erreur lors de la récupération", null, e.getMessage()));
        }
    }

    @PutMapping("/reports/{reportId}/validate")
    public ResponseEntity<ApiResponse<String>> validateReport(
            @RequestHeader(value = "Authorization", required = false) String token,
            @PathVariable String reportId,
            @RequestParam String status) {
        try {
            adminService.validateReport(reportId, status);
            return ResponseEntity.ok(new ApiResponse<>(true, "Signalement validé", "OK"));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(new ApiResponse<>(false, "Erreur lors de la validation", null, e.getMessage()));
        }
    }

    @PostMapping("/alerts")
    public ResponseEntity<ApiResponse<HealthAlert>> createAlert(
            @RequestHeader("Authorization") String token,
            @RequestBody HealthAlertDTO alertDTO) {
        try {
            HealthAlert alert = adminService.createAlert(alertDTO);
            return ResponseEntity.ok(new ApiResponse<>(true, "Alerte créée", alert));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(new ApiResponse<>(false, "Erreur lors de la création", null, e.getMessage()));
        }
    }

    @GetMapping("/reports/generate")
    public ResponseEntity<ApiResponse<String>> generateReport(@RequestHeader("Authorization") String token) {
        try {
            String report = adminService.generateReport();
            return ResponseEntity.ok(new ApiResponse<>(true, "Rapport généré", report));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(new ApiResponse<>(false, "Erreur lors de la génération", null, e.getMessage()));
        }
    }
}
