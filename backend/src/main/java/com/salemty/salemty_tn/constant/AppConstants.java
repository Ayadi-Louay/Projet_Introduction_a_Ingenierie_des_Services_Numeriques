package com.salemty.salemty_tn.constant;

public class AppConstants {

    // HTTP Status Messages
    public static final String SUCCESS = "Success";
    public static final String ERROR = "Error";

    // User Roles
    public static final String ROLE_CITIZEN = "CITIZEN";
    public static final String ROLE_ADMIN = "ADMIN";
    public static final String ROLE_HEALTH_OFFICIAL = "HEALTH_OFFICIAL";

    // Report Status
    public static final String REPORT_PENDING = "PENDING";
    public static final String REPORT_VERIFIED = "VERIFIED";
    public static final String REPORT_DISMISSED = "DISMISSED";

    // Alert Status
    public static final String ALERT_ACTIVE = "ACTIVE";
    public static final String ALERT_RESOLVED = "RESOLVED";
    public static final String ALERT_ARCHIVED = "ARCHIVED";

    // Severity Levels
    public static final String SEVERITY_MILD = "MILD";
    public static final String SEVERITY_MODERATE = "MODERATE";
    public static final String SEVERITY_SEVERE = "SEVERE";

    public static final String SEVERITY_LOW = "LOW";
    public static final String SEVERITY_MEDIUM = "MEDIUM";
    public static final String SEVERITY_HIGH = "HIGH";
    public static final String SEVERITY_CRITICAL = "CRITICAL";

    // Token Types
    public static final String TOKEN_TYPE_VERIFICATION = "VERIFICATION";
    public static final String TOKEN_TYPE_PASSWORD_RESET = "PASSWORD_RESET";

    // Email Configuration
    public static final String EMAIL_VERIFICATION_SUBJECT = "Vérification d'email - SalemtyTN";
    public static final String EMAIL_PASSWORD_RESET_SUBJECT = "Réinitialisation du mot de passe - SalemtyTN";

    // Governorates in Tunisia
    public static final String[] TUNISIAN_GOVERNORATES = {
            "Tunis", "Ariana", "Ben Arous", "Manouba",
            "Sfax", "Sousse", "Monastir", "Mahdia",
            "Kairouan", "Kasserine", "Sidi Bouzid", "Gafsa",
            "Tozeur", "Kebili", "Tatouine", "Medenine",
            "Jendouba", "Le Kef", "Siliana", "Nabeul",
            "Zaghouan", "Bizerte"
    };
}
