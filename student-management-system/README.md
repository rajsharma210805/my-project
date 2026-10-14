# Student Management System

A very basic full-stack CRUD project:
- Frontend: React + Vite
- Backend: Java 17 + Spring Boot + Spring Data JPA
- Database: MySQL

## 1. Configure MySQL
Make sure MySQL Server is running. Open `backend/src/main/resources/application.properties` and replace `YOUR_MYSQL_PASSWORD` with your MySQL root password. If your MySQL account has no password, leave the value blank after `=`.

The app is configured to create `student_db` automatically if the MySQL user has permission.

## 2. Run the backend
Open a terminal in the `backend` folder and run:

Windows:
```powershell
.\mvnw.cmd spring-boot:run
```

This starter ZIP does not include the Maven Wrapper. If the command above is unavailable, install Maven and run:
```powershell
mvn spring-boot:run
```

Or open the `backend` folder in IntelliJ IDEA and run `StudentApplication.java`.

Backend API: `http://localhost:8080/api/students`

## 3. Run the frontend
Install Node.js LTS first. Open a second terminal in the `frontend` folder:

```powershell
npm install
npm run dev
```

Open the local URL printed by Vite, normally `http://localhost:5173`.

## API endpoints
- `GET /api/students` — list students
- `POST /api/students` — add a student (JSON: `name`, `email`, `course`)
- `DELETE /api/students/{id}` — delete a student

## Notes
- Keep the backend and frontend running in separate terminals.
- If you see a MySQL access error, verify the password, username, MySQL service, and port 3306.
- Email is unique in this starter app.
