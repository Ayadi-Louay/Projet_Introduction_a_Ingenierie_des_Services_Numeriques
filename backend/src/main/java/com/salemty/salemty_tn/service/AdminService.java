package com.salemty.salemty_tn.service;

import com.salemty.salemty_tn.model.HealthAlert;
import com.salemty.salemty_tn.dto.HealthAlertDTO;
import java.util.List;

public interface AdminService {
    List<String> getUsers();

    void validateReport(String reportId, String status);

    HealthAlert createAlert(HealthAlertDTO alertDTO);

    String generateReport();
}
