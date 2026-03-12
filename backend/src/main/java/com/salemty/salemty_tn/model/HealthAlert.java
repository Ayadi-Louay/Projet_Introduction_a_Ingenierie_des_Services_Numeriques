package com.salemty.salemty_tn.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDateTime;
import java.util.List;

@Document(collection = "health_alerts")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class HealthAlert {
    @Id
    private String id;
    private String createdBy;
    private String title;
    private String description;
    private String disease;
    private String severity; // LOW, MEDIUM, HIGH, CRITICAL
    private List<String> affectedGovernorates;
    private String status; // ACTIVE, RESOLVED, ARCHIVED
    private LocalDateTime startDate;
    private LocalDateTime endDate;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private String preventionAdvice;
}
