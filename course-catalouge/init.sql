-- REM: *******************************************************************
-- REM: ***** Assignment 2: INFS605 Microservices Programming Project *****
-- REM: *******************************************************************
-- REM: * Purpose: Creating the PostGres SQL code needed to create the tables for the database*
-- REM: * Stephen Thorpe 9301663 *
-- REM: * Version: 1.7 (Sunday 24 August 2025) *
CREATE TABLE IF NOT EXISTS infocatalouge (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    CourseID VARCHAR(100) NOT NULL,
    Points VARCHAR(100) NOT NULL,
    Level VARCHAR(100) NOT NULL,
    Description VARCHAR(255) NOT NULL,
    Resources VARCHAR(255) DEFAULT 'None Available',
    Semester VARCHAR(255) NOT NULL
);

INSERT INTO infocatalouge (name, CourseID, Points, Level, Description, Resources, Semester) VALUES
('Microservices', 'INFS605', '15.00','6', 'Microservices is a major architectural design pattern for highly available, scalable and maintainable software. This paper covers the microservices based software design and development and deployment concepts with a focus on the features and facilities of the microservices environments.', 'None Available', 'Semester 2'),
('Algorithm Design and Analysis', 'COMP611', '15.00','6', 'Algorithmic analysis, design techniques, advanced data structures, graph algorithms, numerical algorithms.', 'None Available', 'Semester 2');
('Computer Graphics Programming', 'COMP612', '15.00','6', 'A practical foundation in high-level computer graphics programming and a comprehensive overview of proven graphics algorithms and software techniques is presented with a focus on those techniques that have become common currency in the field of interactive computer graphics.', 'None Available', 'Semester 2');
('Algebra and Calculus II', 'MATH605', '15.00','6', 'An introduction to multi-variable calculus together with further topics in linear algebra. Concepts and techniques central to the further study of mathematics are studied, with an emphasis on applications to science, engineering, and business.', 'None Available', 'Semester 2');