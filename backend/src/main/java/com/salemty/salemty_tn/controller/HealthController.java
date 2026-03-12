package com.salemty.salemty_tn.controller;

import com.salemty.salemty_tn.dto.ApiResponse;
import com.salemty.salemty_tn.dto.HealthReportDTO;
import com.salemty.salemty_tn.model.HealthReport;
import com.salemty.salemty_tn.service.HealthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/health")
@RequiredArgsConstructor
@CrossOrigin(origins = { "http://localhost:4200", "http://localhost:3000" })
public class HealthController {

    private final HealthService healthService;

    @PostMapping("/reports/submit")
    public ResponseEntity<ApiResponse<HealthReport>> submitReport(
            @RequestHeader("Authorization") String token,
            @RequestBody HealthReportDTO reportDTO) {
        try {
            String userId = "test-user-id"; // Extract from token
            HealthReport report = healthService.submitReport(userId, reportDTO);
            return ResponseEntity.ok(new ApiResponse<>(true, "Signalement soumis avec succès", report));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(new ApiResponse<>(false, "Erreur lors de la soumission", null, e.getMessage()));
        }
    }

    @GetMapping("/reports")
    public ResponseEntity<ApiResponse<List<HealthReport>>> getReports(
            @RequestParam(required = false) String status,
            @RequestParam(required = false) String governorate) {
        try {
            List<HealthReport> reports = healthService.getReports(status, governorate);
            return ResponseEntity.ok(new ApiResponse<>(true, "Signalements récupérés", reports));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(new ApiResponse<>(false, "Erreur lors de la récupération", null, e.getMessage()));
        }
    }

    @GetMapping("/trends")
    public ResponseEntity<ApiResponse<Map<String, Object>>> getTrends() {
        try {
            Map<String, Object> trends = healthService.getTrends();
            return ResponseEntity.ok(new ApiResponse<>(true, "Tendances", trends));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(new ApiResponse<>(false, "Erreur lors de la récupération", null, e.getMessage()));
        }
    }

    @GetMapping("/stats")
    public ResponseEntity<ApiResponse<Map<String, Object>>> getStats() {
        try {
            Map<String, Object> stats = healthService.getStats();
            return ResponseEntity.ok(new ApiResponse<>(true, "Statistiques", stats));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(new ApiResponse<>(false, "Erreur lors de la récupération", null, e.getMessage()));
        }
    }

    @GetMapping("/alerts")
    public ResponseEntity<ApiResponse<List<String>>> getAlerts() {
        try {
            List<String> alerts = healthService.getAlerts();
            return ResponseEntity.ok(new ApiResponse<>(true, "Alertes actives", alerts));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(new ApiResponse<>(false, "Erreur lors de la récupération", null, e.getMessage()));
        }
    }
}
