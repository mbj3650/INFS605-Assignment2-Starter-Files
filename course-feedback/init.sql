-- REM: *******************************************************************
-- REM: ***** Assignment 2: INFS605 Microservices Programming Project *****
-- REM: *******************************************************************
-- REM: * Purpose: Creating the PostGres SQL code needed to create the tables for the database*
-- REM: * Stephen Thorpe 9301663 *
-- REM: * Version: 1.7 (Sunday 24 August 2025) *

CREATE TABLE IF NOT EXISTS coursefeedback (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    CourseID VARCHAR(100) NOT NULL,
    Feedback VARCHAR(255) DEFAULT ''
);

INSERT INTO coursefeedback (name, CourseID, Feedback) VALUES
('Aroha Ngata', 'INFS605', 'Enjoyed the class'),
('Tane Mahuta', 'INFS605', 'Enjoyed the class'),
('Moana Rangi', 'COMP611', 'Enjoyed the class'),