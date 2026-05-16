-- Create database
CREATE DATABASE IF NOT EXISTS school_management;
USE school_management;

-- Create schools table
CREATE TABLE IF NOT EXISTS schools (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    address VARCHAR(500) NOT NULL,
    latitude FLOAT NOT NULL,
    longitude FLOAT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_coordinates (latitude, longitude)
);

-- Sample data (optional)
INSERT INTO schools (name, address, latitude, longitude) VALUES
('Central High School', '123 Main St, New York, NY 10001', 40.7128, -74.0060),
('Westside Academy', '456 West Ave, Los Angeles, CA 90001', 34.0522, -118.2437),
('North Bridge School', '789 North Rd, Chicago, IL 60601', 41.8781, -87.6298);