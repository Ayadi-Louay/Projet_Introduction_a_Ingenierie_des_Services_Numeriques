package com.salemty.salemty_tn.service;

import com.salemty.salemty_tn.model.HealthReport;
import com.salemty.salemty_tn.dto.HealthReportDTO;
import java.util.List;
import java.util.Map;

public interface HealthService {
    HealthReport submitReport(String userId, HealthReportDTO reportDTO);

    List<HealthReport> getReports(String status, String governorate);

    List<HealthReport> getUserReports(String userId);

    Map<String, Object> getTrends();

    Map<String, Object> getStats();

    List<String> getAlerts();
}
