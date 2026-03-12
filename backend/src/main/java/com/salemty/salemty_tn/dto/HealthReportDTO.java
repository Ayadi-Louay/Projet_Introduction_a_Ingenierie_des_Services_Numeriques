package com.salemty.salemty_tn.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class HealthReportDTO {
    private String id;
    private String userId;
    private String symptoms;
    private List<String> symptomList;
    private String description;
    private String severity;
    private String location;
    private String latitude;
    private String longitude;
    private String governorate;
    private String status;
    private boolean anonymous;
}
