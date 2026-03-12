package com.salemty.salemty_tn.controller;

import com.salemty.salemty_tn.dto.ApiResponse;
import com.salemty.salemty_tn.dto.HealthAlertDTO;
import com.salemty.salemty_tn.model.HealthAlert;
import com.salemty.salemty_tn.service.AdminService;
import com.salemty.salemty_tn.service.HealthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/alerts")
@RequiredArgsConstructor
@CrossOrigin(origins = { "http://localhost:4200", "http://localhost:3000" })
public class AlertController {

    private final AdminService adminService;
    private final HealthService healthService;

    @PostMapping("/create")
    public ResponseEntity<ApiResponse<HealthAlert>> createAlert(
            @RequestHeader("Authorization") String token,
            @RequestBody HealthAlertDTO alertDTO) {
        try {
            HealthAlert alert = adminService.createAlert(alertDTO);
            return ResponseEntity.ok(new ApiResponse<>(true, "Alerte créée avec succès", alert));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(new ApiResponse<>(false, "Erreur lors de la création", null, e.getMessage()));
        }
    }
}
