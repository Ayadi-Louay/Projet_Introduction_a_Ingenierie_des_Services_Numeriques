-- Salemty-TN Database Schema
-- Compatible with PostgreSQL and MySQL

-- Users Table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    phone VARCHAR(20),
    password_hash VARCHAR(255) NOT NULL,
    role ENUM('user', 'admin', 'health_worker') DEFAULT 'user',
    is_verified BOOLEAN DEFAULT FALSE,
    verification_token VARCHAR(255),
    reset_token VARCHAR(255),
    reset_token_expires DATETIME,
    newsletter_subscribed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    last_login DATETIME
);

-- Health Reports Table
CREATE TABLE health_reports (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
    disease VARCHAR(50) NOT NULL,
    symptoms JSON NOT NULL, -- Array of symptoms
    severity ENUM('low', 'medium', 'high', 'critical') NOT NULL,
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    address TEXT,
    city VARCHAR(50) NOT NULL,
    governorate VARCHAR(50) NOT NULL,
    age_group ENUM('0-17', '18-29', '30-49', '50-64', '65+'),
    gender ENUM('male', 'female', 'other'),
    is_anonymous BOOLEAN DEFAULT TRUE,
    reported_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    verified BOOLEAN DEFAULT FALSE,
    verified_by INTEGER REFERENCES users(id),
    verified_at DATETIME
);

-- Disease Trends Table
CREATE TABLE disease_trends (
    id SERIAL PRIMARY KEY,
    disease VARCHAR(50) NOT NULL,
    city VARCHAR(50) NOT NULL,
    governorate VARCHAR(50) NOT NULL,
    date DATE NOT NULL,
    case_count INTEGER DEFAULT 0,
    severity_avg DECIMAL(3, 2),
    trend_percentage DECIMAL(5, 2), -- Percentage change from previous period
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE(disease, city, date)
);

-- Health Alerts Table
CREATE TABLE health_alerts (
    id SERIAL PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    description TEXT NOT NULL,
    disease VARCHAR(50),
    severity ENUM('low', 'medium', 'high', 'critical') NOT NULL,
    affected_areas JSON, -- Array of cities/governorates
    start_date DATE NOT NULL,
    end_date DATE,
    is_active BOOLEAN DEFAULT TRUE,
    created_by INTEGER REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Health Tips Table
CREATE TABLE health_tips (
    id SERIAL PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    content TEXT NOT NULL,
    category ENUM('prevention', 'symptoms', 'treatment', 'general') NOT NULL,
    disease VARCHAR(50),
    target_audience ENUM('general', 'children', 'elderly', 'chronic_illness'),
    is_published BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- User Sessions Table (for JWT token management)
CREATE TABLE user_sessions (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    token_hash VARCHAR(255) NOT NULL,
    device_info JSON,
    ip_address INET,
    expires_at DATETIME NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Notifications Table
CREATE TABLE notifications (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(200) NOT NULL,
    message TEXT NOT NULL,
    type ENUM('alert', 'reminder', 'system', 'marketing') NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    data JSON, -- Additional data for the notification
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Analytics Table
CREATE TABLE analytics (
    id SERIAL PRIMARY KEY,
    event_type VARCHAR(50) NOT NULL, -- 'report_submitted', 'user_registered', etc.
    user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
    metadata JSON,
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for better performance
CREATE INDEX idx_health_reports_location ON health_reports(latitude, longitude);
CREATE INDEX idx_health_reports_disease ON health_reports(disease);
CREATE INDEX idx_health_reports_date ON health_reports(reported_at);
CREATE INDEX idx_disease_trends_date ON disease_trends(date);
CREATE INDEX idx_disease_trends_location ON disease_trends(city, governorate);
CREATE INDEX idx_health_alerts_active ON health_alerts(is_active);
CREATE INDEX idx_notifications_user ON notifications(user_id);
CREATE INDEX idx_notifications_unread ON notifications(user_id, is_read);
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_verified ON users(is_verified);
