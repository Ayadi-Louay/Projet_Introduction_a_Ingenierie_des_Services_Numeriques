package com.salemty.salemty_tn.service;

import com.salemty.salemty_tn.model.HealthReport;
import com.salemty.salemty_tn.model.HealthAlert;
import com.salemty.salemty_tn.dto.HealthReportDTO;
import com.salemty.salemty_tn.repository.HealthReportRepository;
import com.salemty.salemty_tn.repository.HealthAlertRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class HealthServiceImpl implements HealthService {

    private final HealthReportRepository healthReportRepository;
    private final HealthAlertRepository healthAlertRepository;

    @Override
    public HealthReport submitReport(String userId, HealthReportDTO reportDTO) {
        HealthReport report = new HealthReport();
        report.setUserId(userId);
        report.setSymptoms(reportDTO.getSymptoms());
        report.setSymptomList(reportDTO.getSymptomList());
        report.setDescription(reportDTO.getDescription());
        report.setSeverity(reportDTO.getSeverity());
        report.setLocation(reportDTO.getLocation());
        report.setLatitude(reportDTO.getLatitude());
        report.setLongitude(reportDTO.getLongitude());
        report.setGovernorate(reportDTO.getGovernorate());
        report.setStatus("PENDING");
        report.setReportedAt(LocalDateTime.now());
        report.setCreatedAt(LocalDateTime.now());
        report.setAnonymous(reportDTO.isAnonymous());

        return healthReportRepository.save(report);
    }

    @Override
    public List<HealthReport> getReports(String status, String governorate) {
        if (status != null && governorate != null) {
            return healthReportRepository.findByStatusAndGovernorate(status, governorate);
        } else if (status != null) {
            return healthReportRepository.findByStatus(status);
        } else if (governorate != null) {
            return healthReportRepository.findByGovernorate(governorate);
        }
        return healthReportRepository.findAll();
    }

    @Override
    public List<HealthReport> getUserReports(String userId) {
        return healthReportRepository.findByUserId(userId);
    }

    @Override
    public Map<String, Object> getTrends() {
        List<HealthReport> allReports = healthReportRepository.findByStatus("VERIFIED");

        Map<String, Object> trends = new HashMap<>();

        // Group by symptoms
        Map<String, Long> symptomTrends = allReports.stream()
                .flatMap(r -> r.getSymptomList().stream())
                .collect(Collectors.groupingBy(s -> s, Collectors.counting()));

        // Group by governorate
        Map<String, Long> governorateTrends = allReports.stream()
                .collect(Collectors.groupingBy(HealthReport::getGovernorate, Collectors.counting()));

        trends.put("symptomTrends", symptomTrends);
        trends.put("governorateTrends", governorateTrends);
        trends.put("totalReports", (long) allReports.size());

        return trends;
    }

    @Override
    public Map<String, Object> getStats() {
        List<HealthReport> allReports = healthReportRepository.findAll();

        Map<String, Object> stats = new HashMap<>();
        stats.put("totalReports", allReports.size());
        stats.put("pendingReports", healthReportRepository.findByStatus("PENDING").size());
        stats.put("verifiedReports", healthReportRepository.findByStatus("VERIFIED").size());
        stats.put("dismissedReports", healthReportRepository.findByStatus("DISMISSED").size());

        Map<String, Long> severityStats = allReports.stream()
                .collect(Collectors.groupingBy(HealthReport::getSeverity, Collectors.counting()));
        stats.put("severityStats", severityStats);

        return stats;
    }

    @Override
    public List<String> getAlerts() {
        List<HealthAlert> activeAlerts = healthAlertRepository.findByStatus("ACTIVE");
        return activeAlerts.stream()
                .map(HealthAlert::getTitle)
                .collect(Collectors.toList());
    }
}
