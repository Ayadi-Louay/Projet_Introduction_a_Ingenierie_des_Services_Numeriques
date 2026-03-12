package com.salemty.salemty_tn.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class HealthAlertDTO {
    private String id;
    private String title;
    private String description;
    private String disease;
    private String severity;
    private List<String> affectedGovernorates;
    private String status;
    private String preventionAdvice;
}
