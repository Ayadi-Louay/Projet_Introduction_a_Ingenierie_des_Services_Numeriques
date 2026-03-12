package com.salemty.salemty_tn.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDateTime;

@Document(collection = "email_tokens")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class EmailToken {
    @Id
    private String id;
    private String email;
    private String token;
    private String type; // VERIFICATION, PASSWORD_RESET
    private LocalDateTime createdAt;
    private LocalDateTime expiresAt;
    private boolean used;
}
