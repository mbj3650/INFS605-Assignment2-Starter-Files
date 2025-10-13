-- REM: *******************************************************************
-- REM: ***** Assignment 2: INFS605 Microservices Programming Project *****
-- REM: *******************************************************************
-- REM: * Purpose: Creating the PostGres SQL code needed to create the tables for the database*
-- REM: * Stephen Thorpe 9301663 *
-- REM: * Version: 1.7 (Sunday 24 August 2025) *
CREATE TABLE IF NOT EXISTS students (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    attendance JSONB DEFAULT '[]'
);

CREATE TABLE IF NOT EXISTS emails (
    id SERIAL PRIMARY KEY,
    recipient VARCHAR(100) NOT NULL,
    recipientemail VARCHAR(100) NOT NULL,
    course VARCHAR(100) NOT NULL,
    emailcontent VARCHAR(10000) NOT NULL
);

CREATE TABLE IF NOT EXISTS courses (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    CourseID VARCHAR(100) NOT NULL,
    Feedback VARCHAR(255) DEFAULT ''
);

CREATE TABLE IF NOT EXISTS infocatalouge (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    CourseID VARCHAR(100) NOT NULL,
    Points VARCHAR(100) NOT NULL,
    Level VARCHAR(100) NOT NULL,
    Description VARCHAR(10000) NOT NULL,
    Resources VARCHAR(255) DEFAULT 'None Available',
    Semester VARCHAR(255) NOT NULL
);

INSERT INTO students (name, email, attendance) VALUES
('Aroha Ngata', 'aroha.ngata@example.com', '[]'),
('Tane Mahuta', 'tane.mahuta@example.com', '[]'),
('Moana Rangi', 'moana.rangi@example.com', '[]'),
('Wiremu Pita', 'wiremu.pita@example.com', '[]'),
('Lani Tui', 'lani.tui@example.com', '[]'),
('Malia Fetu', 'malia.fetu@example.com', '[]'),
('Sione Vaka', 'sione.vaka@example.com', '[]'),
('Tavita Fale', 'tavita.fale@example.com', '[]'),
('Priya Sharma', 'priya.sharma@example.com', '[]'),
('Ravi Patel', 'ravi.patel@example.com', '[]'),
('Anjali Mehta', 'anjali.mehta@example.com', '[]'),
('Arjun Singh', 'arjun.singh@example.com', '[]'),
('Li Wei', 'li.wei@example.com', '[]'),
('Zhang Mei', 'zhang.mei@example.com', '[]'),
('Chen Yong', 'chen.yong@example.com', '[]'),
('Wang Xiu', 'wang.xiu@example.com', '[]'),
('Kim Ji-hoon', 'kim.jihoon@example.com', '[]'),
('Park Soo-jin', 'park.soojin@example.com', '[]'),
('Maria Santos', 'maria.santos@example.com', '[]'),
('Juan Dela Cruz', 'juan.delacruz@example.com', '[]'),
('Ahmad Rahman', 'ahmad.rahman@example.com', '[]'),
('Nur Aisyah', 'nur.aisyah@example.com', '[]'),
('Alice Smith', 'alice.smith@example.com', '[]'),
('Bob Johnson', 'bob.johnson@example.com', '[]'),
('Charlie Brown', 'charlie.brown@example.com', '[]'),
('Diana Prince', 'diana.prince@example.com', '[]'),
('Ethan Hunt', 'ethan.hunt@example.com', '[]'),
('Hannah Lee', 'hannah.lee@example.com', '[]'),
('Michael Scott', 'michael.scott@example.com', '[]'),
('Rachel Green', 'rachel.green@example.com', '[]'),
('Stephen Thorpe', 'stephen.thorpe@example.com', '[]');

INSERT INTO courses (name, CourseID, Feedback) VALUES
('Aroha Ngata', 'INFS605', 'Enjoyed the class'),
('Aroha Ngata', 'COMP611', 'Enjoyed the class'),
('Tane Mahuta', 'INFS605', 'Enjoyed the class'),
('Moana Rangi', 'COMP611', 'Enjoyed the class');

INSERT INTO emails (recipient, recipientemail, course, emailcontent) VALUES
('Aroha Ngata', 'aroha.ngata@example.com','INFS605', 'Enjoyed the class'),
('Aroha Ngata', 'aroha.ngata@example.com','COMP611', 'Enjoyed the class'),
('Tane Mahuta', 'tane.mahuta@example.com','INFS605', 'Enjoyed the class'),
('Moana Rangi', 'moana.rangi@example.com','COMP611', 'Enjoyed the class');

INSERT INTO infocatalouge (name, CourseID, Points, Level, Description, Resources, Semester) VALUES
('Needs Analysis, Acquisition and Training', 'INFS603', '15.00','6', 'Focuses on skills required to identify a user''s information technology solution requirements: to investigate and evaluate suitable solutions including software, platform and vendors, to plan the acquisition of a solution, to identify training requirements, and to plan a training programme using various delivery methods including flexible/blended delivery.', 'None Available', 'Semester 1'),
('Program Design and Construction', 'COMP603', '15.00','6', 'An introduction to the design and construction of object- oriented software. It will extend individual design and programming skills developed in earlier programming papers, with an emphasis on the quality, modularity and reusability of the software developed. The paper will introduce current techniques used in software development that allow the goals of software development projects to be realised.', 'None Available', 'Semester 1'),
('Data Structures and Algorithms', 'COMP610', '15.00','6', 'Theoretical and practical skills for the utilisation of mathematical structures and algorithms for handling data that are essential in computational mathematics and computer science. Static and dynamic structures for data, cloning data, mathematical concepts of iteration and recursion, analysis of performance and complexity, data searching and data sorting algorithms, mathematical logic and formal grammars.', 'None Available', 'Semester 1'),
('Service modelling', 'INFS604', '15.00','6', 'Covers designing and modelling software-based service systems and service-based software architectures. Examines service interfaces from the user experience level down to the infrastructure layers – and uses a range of methods and tools to construct service-based system architecture models. The paper also covers methods and tools used specifically at different infrastructure layers to include their specific characteristics such as the cloud-based infrastructure services.', 'None Available', 'Semester 1'),
('Microservices', 'INFS605', '15.00','6', 'Microservices is a major architectural design pattern for highly available, scalable and maintainable software. This paper covers the microservices based software design and development and deployment concepts with a focus on the features and facilities of the microservices environments.', 'None Available', 'Semester 2'),
('Algorithm Design and Analysis', 'COMP611', '15.00','6', 'Algorithmic analysis, design techniques, advanced data structures, graph algorithms, numerical algorithms.', 'None Available', 'Semester 2'),
('Computer Graphics Programming', 'COMP612', '15.00','6', 'A practical foundation in high-level computer graphics programming and a comprehensive overview of proven graphics algorithms and software techniques is presented with a focus on those techniques that have become common currency in the field of interactive computer graphics.', 'None Available', 'Semester 2'),
('Algebra and Calculus II', 'MATH605', '15.00','6', 'An introduction to multi-variable calculus together with further topics in linear algebra. Concepts and techniques central to the further study of mathematics are studied, with an emphasis on applications to science, engineering, and business.', 'None Available', 'Semester 2');
