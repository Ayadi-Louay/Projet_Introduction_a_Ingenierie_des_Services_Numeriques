package com.salemty.salemty_tn.repository;

import com.salemty.salemty_tn.model.HealthAlert;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HealthAlertRepository extends MongoRepository<HealthAlert, String> {
    List<HealthAlert> findByStatus(String status);

    List<HealthAlert> findByAffectedGovernorates(String governorate);

    List<HealthAlert> findByDisease(String disease);
}
