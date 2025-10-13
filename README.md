# INFS605-Assignment2-Starter-Files
This is a starter application for a BCIS second-year INFS605 Microservices programming assignment. It includes a containerized student-profile service (Python + Flask), a PostgreSQL database, a React (Vite) admin UI to list/search/add/delete students and record attendance and docker-compose.yml. Students are invited to extend the system by adding their own microservices and deploying a small-scale distributed application.

## License

Code in this repository is licensed under the [MIT License](LICENSE).

Assignment instructions, diagrams, and documentation (non-code) are licensed under [CC BY-NC 4.0](https://creativecommons.org/licenses/by-nc/4.0/).

## Microservices Assignment Starter

This repository provides a starter  application for your programming assignment in the INFS605 Microservices course (BCIS Year 2).

You are provided with:
- A `student-profile` microservice built in Flask
- A PostgreSQL container for persistence
- A shared `docker-compose.yml` to deploy services
- a React (Vite) Admin user UI

INFS605-Assignment2-Starter-Files/
├── docker-compose.yml
├── README.md
│ 
├── frontend/
│   ├── Public/
│   ├── src/
│   ├── Dockerfile
│   ├── package.json
│   └── vite-config.js
│ 
├── student-profile/
│   ├── app.py
│   ├── Dockerfile
│   ├── init.sql
│   └── requirements.txt
│ 
├── course-feedback/
│   ├── app.py
│   ├── Dockerfile
│   ├── wait-for-it.sh
│   └── requirements.txt
│ 
├── email-service/
│   ├── app.py
│   ├── Dockerfile
│   ├── wait-for-it.sh
│   └── requirements.txt
│ 
├── course-catalouge/
│   ├── app.py
│   ├── Dockerfile
│   ├── wait-for-it.sh
│   └── requirements.txt
│ 
├── postgres/
│   └── init.sql
│ 
├── test-and-walkthrough-media/
│ 
├── .env.example
├── .gitignore
├── docker-compose.yml
├── LICENSE
└── README.md

Technologies used:
- Python + Flask
- Docker + Docker Compose
- PostgreSQL
- React

Your task is to build additional microservices, connect them using Docker Compose, and demonstrate a small, functional microservices architecture with clear service boundaries.

## The 3 microeservices Added

- Course Catalouge Service
    - This microservice directly reads the "Catalouge" database with get commands in order to provide users access to a site that contains information about the various courses available, you can search for the courses either by name or course id (E.g. you can type "Microservices" or "INFS605" for the same result)
    
- Feedback Service
    - Students will be able to enter their name, course they're giving feedback to, as well as their actual feedback in a given box, which is displayed publicly, with a search function for specific course IDs

- Email/Notification Service
    - When feedback is submitted, the app will notify email-service to create a log that details the Students name, email (if possible), Course ID, as well as the message they provided for the course

## ADDITIONAL NOTE
    I provided access to a "feedback management" section of the site in which you can search for and delete specific feedback from the database.
    I added an admin login section that can be logged in through
    Username: admin
    Password: password
    Security Code: 123

    I kept the student management system just to show that the login applied between both sections of the site (you dont have to relogin to
    the other section if you already logged into one until you refresh the page)

## Getting Started

### 1. Prerequisites
- Docker
- Docker-Compose 
- Python (if running services outside of Docker)
[If on Ubuntu: sudo apt install docker-compose]
[If on Ubuntu: sudo snap install docker]

### 2. Pull the repository

You can use 'git clone' to pull the files from this site:
https://github.com/mbj3650/INFS605-Assignment2-Starter-Files.git

This will pull the repository and ask you what folder you would like to place them in locally on your computer. Find a folder you can easily locate and click Save.

Then click 'Open' to open the repository folder in VS Code. You will see some files and folders. 

Open the Readme.md file to read the instructions for this particular repository. 

Option 2. Use the zip I uh
provided in the assignment upload
yeah

Option 3. Clone straight into your Ubuntu server or on your Virtual Machine running on VirtualBox.

Type, 'git clone https://github.com/mbj3650/INFS605-Assignment2-Starter-Files.git'

You may be prompted to enter your GitHub username and password. 

Then type, cd INFS605-Assignment2-Starter-Files to enter the repository 

### 3. Building and running the System

First, run Docker Desktop. You need Docker Desktop running on Windows (and macOS) for Docker commands like docker-compose up to work.

Next, in Terminal:

type, docker-compose up -d --build

- API: http://localhost:5001
- APIFeedback = 'http://localhost:6001'
- CatalougeAPI = 'http://localhost:5401'
- EmailAPI = 'http://localhost:7474'
- Frontend: http://localhost:3000

- open http://localhost:5001/students  [to see what the contents of a json query of the database]


### 4. Error on build?

If you get the error "unable to get image 'postgres:15': error during connect: Get "http:..." or "unable to get image 'vm-version-admin-frontend': error during connect: Get "http...", try:

docker-compose up -d --build

or try, docker-compose up -d
[without the --build]

### 5. Error - env: 'bash\r': No such file or directory

The error message "env: 'bash\r': No such file or directory" indicates that a script is attempting to execute a shebang line that includes Windows-style carriage return characters (\r) in the interpreter path, making it an invalid path in a Unix-like environment (such as Linux or macOS). (or vice versa)

Many modern text editors (like VS Code, Sublime Text, Notepad++) allow you to change the line ending format of a file from CRLF to LF and then save it.

### 6. Running the System on VirtualBox

You could use the same Ubuntu server runnin on the same virtual machine you used in the INFS605 class. create a new "assignment2" folder extract the contents of the zip file or cloned repository from GitHub into your new assignment2 folder.

You will need to open 6 new ports (if they are not open already):

Host Port: 3000 + Guest Port: 3000
Host Port: 5001 + Guest Port: 5001
Host Port: 5432 + Guest Port: 5432
Host Port: 6001 + Guest Port: 6001
Host Port: 5401 + Guest Port: 5401
Host Port: 7474 + Guest Port: 7474

If you are using VirtualBox to host your application on Ubuntu you will need to set up Port Forwarding Rules to allow your services to run on Localhost ports 5001, 5432 and 3000, 6001, 5401, 7474. 

### 7. API Endpoints

#### Student Profile Service (http://localhost:5001)
- `GET /students` – list all students
- `GET /students/:id` – get a student
- `POST /students` – `{ name, email }`
- `PUT /students/:id` – update `{ name?, email? }`
- `DELETE /students/:id`
- `POST /students/:id/attendance` – `{ date: 'YYYY-MM-DD', status: 'Present|Absent|Late|Excused' }`

#### Course Feedback Service (http://localhost:6001)
- `GET /coursefeedback/` – list all feedback
- `GET /coursefeedback/<CourseID>` – get all feedback for a specific course
- `POST /coursefeedback` – `{ name, CourseID, feedback }`
- `DELETE /students/:id`

#### Course Information/Catalouge Service (http://localhost:6001)
- `GET /catalouge/` – list all course information
- `GET /catalouge/<CourseID>` – get all information for a specific course by id (INFS605, COMP611 etc.)

#### Feedback Email/Notification Service (http://localhost:6001)
- `GET /allemail/` – list all emails sent out
- `GET /allemail/<studentname>` – get all emails sent to a given student
- `POST /coursefeedback` – `{ name, CourseID, feedback, }` (Email is ascertained by sending a query to fetch it from the students db where the email matches the name)

## Environment Variables

- DB URL is passed via `DATABASE_URL` inside docker-compose.
- Postgres is seeded from `student-profile/init.sql` on first startup (volume-less).

[Copy `.env.example` to `.env` if needed.]

## Screenshots

Include screenshots or screen recordings as you compose, run and test the system. Especially capture any errors you encounter and note how you resolved them.

These have been included in the "Test and Walkthrough media" folder