package com.salemty.salemty_tn.repository;

import com.salemty.salemty_tn.model.HealthReport;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HealthReportRepository extends MongoRepository<HealthReport, String> {
    List<HealthReport> findByUserId(String userId);

    List<HealthReport> findByStatus(String status);

    List<HealthReport> findByGovernorate(String governorate);

    List<HealthReport> findByStatusAndGovernorate(String status, String governorate);
}