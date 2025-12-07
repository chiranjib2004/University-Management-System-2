import React from "react";
import { Link } from "react-router-dom";

function AdminDashboard() {
  return (
    <div style={pageStyle}>
      <div style={welcomeCard}>
        <h1 style={welcomeTitle}>Welcome, Admin!</h1>
        <p style={welcomeSub}>Manage faculty, students, examinations, and fee details from one place.</p>
      </div>

      <div style={grid}>
        <Card to="/add-faculty" icon="👩‍🏫" title="Add New Faculty" subtitle="Create a faculty account" />
        <Card to="/add-student" icon="🧑‍🎓" title="Add New Student" subtitle="Enroll a new student" />
        <Card to="/view-faculty" icon="📄" title="View Faculty" subtitle="Browse all faculty" />

        <Card to="/view-student" icon="🗂️" title="View Student" subtitle="Browse all students" />
        <Card to="/update-faculty" icon="🛠️" title="Update Faculty" subtitle="Edit faculty details" />
        <Card to="/update-student" icon="✏️" title="Update Student" subtitle="Edit student details" />

        <Card to="/examination-panel" icon="🗓️" title="Schedule Exam" subtitle="Plan examinations" />
        <Card to="/examinations" icon="📚" title="View Exams" subtitle="See upcoming exams" />
        <Card to="/add-fee" icon="💳" title="Add Fee Details" subtitle="Record or update fees" />

        <Card to="/utility" icon="🧰" title="Utility" subtitle="Tools and maintenance" />
      </div>
    </div>
  );
}

function Card({ to, icon, title, subtitle }) {
  return (
    <Link to={to} style={cardLink}>
      <div style={card}>
        <div style={cardIcon}>{icon}</div>
        <div>
          <div style={cardTitle}>{title}</div>
          <div style={cardSubtitle}>{subtitle}</div>
        </div>
      </div>
    </Link>
  );
}

const pageStyle = {
  minHeight: "100vh",
  background: "radial-gradient(circle at 35% 40%,#183a66 45%,#171c2d 100%)",
  color: "#f2f2f2",
  fontFamily: "Segoe UI, Arial, sans-serif",
  padding: "58px 16px"
};

const welcomeCard = {
  maxWidth: 900,
  margin: "0 auto 28px",
  background: "#1b2550e8",
  borderRadius: 18,
  boxShadow: "0 10px 48px #071B32a5",
  padding: "1.8rem 2.2rem"
};

const welcomeTitle = {
  fontSize: "2.1rem",
  color: "#ffe082",
  textAlign: "center",
  fontWeight: 800,
  margin: 0
};

const welcomeSub = {
  marginTop: 10,
  color: "#ffc86d",
  fontSize: "1.05rem",
  textAlign: "center"
};

const grid = {
  maxWidth: 900,
  margin: "0 auto",
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
  gap: 18
};

const cardLink = {
  textDecoration: "none"
};

const card = {
  display: "flex",
  gap: 14,
  alignItems: "center",
  background: "linear-gradient(135deg, #2b3e72 0%, #2b3e72 30%, #f7d39a 100%)",
  padding: "16px 18px",
  borderRadius: 14,
  boxShadow: "0 8px 28px rgba(0,0,0,.25)",
  color: "#10223c",
  minHeight: 88
};

const cardIcon = {
  width: 44,
  height: 44,
  borderRadius: 10,
  background: "#e9f2ff",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: 22,
  boxShadow: "0 2px 10px rgba(0,0,0,.15)"
};

const cardTitle = {
  fontWeight: 800,
  color: "#07244b",
  fontSize: 16,
  marginBottom: 4
};

const cardSubtitle = {
  color: "#0b3b65",
  opacity: 0.85,
  fontSize: 14
};

export default AdminDashboard;
