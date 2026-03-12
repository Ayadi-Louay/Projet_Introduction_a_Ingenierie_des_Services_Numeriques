package com.salemty.salemty_tn.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDateTime;
import java.util.List;

@Document(collection = "health_reports")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class HealthReport {
    @Id
    private String id;
    private String userId;
    private String symptoms;
    private List<String> symptomList;
    private String description;
    private String severity; // MILD, MODERATE, SEVERE
    private String location;
    private String latitude;
    private String longitude;
    private String governorate;
    private String status; // PENDING, VERIFIED, DISMISSED
    private LocalDateTime reportedAt;
    private LocalDateTime createdAt;
    private LocalDateTime verifiedAt;
    private boolean anonymous;
}
