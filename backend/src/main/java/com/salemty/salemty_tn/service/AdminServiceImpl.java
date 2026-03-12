package com.salemty.salemty_tn.service;

import com.salemty.salemty_tn.model.HealthAlert;
import com.salemty.salemty_tn.model.HealthReport;
import com.salemty.salemty_tn.dto.HealthAlertDTO;
import com.salemty.salemty_tn.repository.UserRepository;
import com.salemty.salemty_tn.repository.HealthReportRepository;
import com.salemty.salemty_tn.repository.HealthAlertRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AdminServiceImpl implements AdminService {

    private final UserRepository userRepository;
    private final HealthReportRepository healthReportRepository;
    private final HealthAlertRepository healthAlertRepository;

    @Override
    public List<String> getUsers() {
        return userRepository.findAll().stream()
                .map(u -> u.getFirstName() + " " + u.getLastName())
                .collect(Collectors.toList());
    }

    @Override
    public void validateReport(String reportId, String status) {
        HealthReport report = healthReportRepository.findById(reportId)
                .orElseThrow(() -> new RuntimeException("Report not found"));

        report.setStatus(status);
        report.setVerifiedAt(LocalDateTime.now());
        healthReportRepository.save(report);
    }

    @Override
    public HealthAlert createAlert(HealthAlertDTO alertDTO) {
        HealthAlert alert = new HealthAlert();
        alert.setTitle(alertDTO.getTitle());
        alert.setDescription(alertDTO.getDescription());
        alert.setDisease(alertDTO.getDisease());
        alert.setSeverity(alertDTO.getSeverity());
        alert.setAffectedGovernorates(alertDTO.getAffectedGovernorates());
        alert.setStatus("ACTIVE");
        alert.setStartDate(LocalDateTime.now());
        alert.setCreatedAt(LocalDateTime.now());
        alert.setPreventionAdvice(alertDTO.getPreventionAdvice());

        return healthAlertRepository.save(alert);
    }

    @Override
    public String generateReport() {
        List<HealthReport> allReports = healthReportRepository.findAll();
        long totalReports = allReports.size();
        long verifiedReports = allReports.stream()
                .filter(r -> "VERIFIED".equals(r.getStatus()))
                .count();

        return "Report Summary:\n" +
                "Total Reports: " + totalReports + "\n" +
                "Verified Reports: " + verifiedReports;
    }
}
