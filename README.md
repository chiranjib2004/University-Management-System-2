# 🌐 University Management System

A complete full-stack web application designed for universities to manage Students, Faculty, Exams, Fees & Authentication — built with **React + Node.js + Express + MySQL**.  
Includes dedicated dashboards for **Admin & Students**, with modern responsive UI.

<p align="center">
  <img width="1912" height="1025" alt="Screenshot 2025-10-29 113436" src="https://github.com/user-attachments/assets/9e85da19-38e3-489a-bbe5-6fb453822410" />

</p>


---

## ⚡ Features

| Category | Capability |
|--------|-------------|
| Authentication | Login with role-based control (Admin/Student) |
| Faculty Panel | Add • View • Update • Delete |
| Student Panel | Add • View • Update • Delete |
| Exam Panel | Schedule exams + view list |
| Fee Management | Add fee details • Paid/Unpaid status |
| UI/UX | Clean dashboard | Responsive layout |

---

## 🛠 Tech Stack

| Layer | Technology |
|------|------------|
| Frontend | React, Axios, CSS |
| Backend | Node.js, Express.js |
| Database | MySQL |
| Tools | MySQL Workbench, GitHub, npm |

---

## 📸 Screenshots


### 🔐 Login Page  
<img width="1912" height="1025" alt="Screenshot 2025-10-29 113436" src="https://github.com/user-attachments/assets/9e85da19-38e3-489a-bbe5-6fb453822410" />

### 🏛 Admin Dashboard  
<img width="1919" height="1079" alt="Screenshot 2025-10-29 113514" src="https://github.com/user-attachments/assets/03bc9c1e-fe33-474f-9127-7929ae568610" />

### 👨‍🏫 Add New Faculty  
<img width="1920" height="1080" alt="Screenshot 2025-10-29 113536" src="https://github.com/user-attachments/assets/ab1fef12-2523-4412-bb71-4f7acef58f04" />

### 🎓 Add New Student  
<img width="1920" height="1020" alt="Screenshot 2025-10-29 113622" src="https://github.com/user-attachments/assets/d8ef9996-615d-4a79-b10e-82f00e28cab0" />

### 📝 Examination Panel  
<img width="1920" height="1020" alt="Screenshot 2025-10-29 113645" src="https://github.com/user-attachments/assets/26b6eea2-e896-43b2-8055-ab1388348e61" />

### 💰 Fee Entry  
<img width="1920" height="1020" alt="Screenshot 2025-10-29 113658" src="https://github.com/user-attachments/assets/9470e685-3772-4f24-8232-1a08242be234" />



---

## 📂 Project Structure

```
📁 University-Management-System
 ├── 📁 backend
 │   ├── controllers/
 │   ├── routes/
 │   ├── models/
 │   ├── middleware/
 │   ├── utils/
 │   ├── server.js
 │   └── app.js
 ├── 📁 frontend
 │   ├── src/
 │   │   ├── pages/
 │   │   ├── components/
 │   │   ├── context/
 │   │   ├── App.js
 │   │   └── index.js
 └── README.md
```

---

## 🏦 Database Schema (Core Tables)

```sql
CREATE DATABASE university_db;
USE university_db;

CREATE TABLE users(
 id INT PRIMARY KEY,
 name VARCHAR(100),
 email VARCHAR(100) UNIQUE,
 password VARCHAR(255),
 role ENUM('admin','faculty','student')
);

CREATE TABLE faculty_info(
 id INT PRIMARY KEY,
 father_name VARCHAR(100),
 address VARCHAR(255),
 date_of_birth DATE,
 mobile_no VARCHAR(15),
 experience_year INT,
 aadhar_number VARCHAR(12),
 qualification VARCHAR(50),
 department VARCHAR(100),
 date_of_joining DATE,
 email VARCHAR(100),
 FOREIGN KEY(id) REFERENCES users(id) ON DELETE CASCADE
);
```

Other tables included:  
`student_info`, `exam_schedule`, `fee_details`, `leave_details`.

---

## 🚀 Run Locally

### 1️⃣ Clone the project  
```bash
git clone https://github.com/YOUR-USERNAME/University-Management-System.git
cd University-Management-System
```

### 2️⃣ Setup Backend  
```bash
cd backend
npm install
node server.js   # or nodemon server.js
```

### 3️⃣ Setup Frontend  
```bash
cd ../frontend
npm install
npm start
```

Server → http://localhost:5000  
Client → http://localhost:3000

---

## 🔮 Future Enhancements

| Feature | Status |
|--------|--------|
| JWT Auth System | ⏳ Scheduled |
| Student Result Upload | 🔜 Roadmap |
| Attendance Management | 🔜 Planned |
| Cloud Deployment | ⚙ Coming Soon |

---

## 👤 Author

**Chiranjib Pradhan**  
📍 India 
📧 chiranjibpradhan42@gmail.com   

---  
