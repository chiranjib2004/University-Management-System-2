import React from "react";
import { Link } from "react-router-dom";
import "./FormPageStyles.css";

function StudentDashboard() {
  return (
    <div style={{ minHeight: "100vh", background: "radial-gradient(circle at 35% 40%,#183a66 45%,#171c2d 100%)", padding: "58px 16px" }}>
      <div style={{ maxWidth: 900, margin: "0 auto 28px", background: "#1b2550e8", borderRadius: 18, boxShadow: "0 10px 48px #071B32a5", padding: "1.8rem 2.2rem" }}>
        <h1 style={{ fontSize: "2.05rem", color: "#5be7a9", textAlign: "center", fontWeight: 800, margin: 0 }}>Welcome, Student!</h1>
        <p style={{ marginTop: 10, color: "#bfe9ff", fontSize: "1.02rem", textAlign: "center" }}>Access exams, your profile, marks, and fees from one place.</p>
      </div>

      <div style={{ maxWidth: 900, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 18 }}>
        <DashCard to="/examinations" icon="📚" title="View Examinations" subtitle="Upcoming exams" />
        <DashCard to="/view-student" icon="🧾" title="View Profile" subtitle="Your details" />
        <DashCard to="/fee-details" icon="💳" title="View Fee Details" subtitle="Your fees" />
        <DashCard to="/view-marks" icon="📈" title="View Marks" subtitle="Your scores only" />
        <DashCard to="/utility" icon="🧰" title="Utility" subtitle="Tools and more" />
      </div>
    </div>
  );
}

function DashCard({ to, icon, title, subtitle }) {
  return (
    <Link to={to} style={{ textDecoration: "none" }}>
      <div style={{ display: "flex", gap: 14, alignItems: "center", background: "linear-gradient(135deg, #2b3e72 0%, #2b3e72 30%, #a6f3dd 100%)", padding: "16px 18px", borderRadius: 14, boxShadow: "0 8px 28px rgba(0,0,0,.25)", color: "#0d2b3a", minHeight: 88 }}>
        <div style={{ width: 44, height: 44, borderRadius: 10, background: "#e9f2ff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, boxShadow: "0 2px 10px rgba(0,0,0,.15)" }}>{icon}</div>
        <div>
          <div style={{ fontWeight: 800, color: "#062b3b", fontSize: 16, marginBottom: 4 }}>{title}</div>
          <div style={{ color: "#083a45", opacity: 0.85, fontSize: 14 }}>{subtitle}</div>
        </div>
      </div>
    </Link>
  );
}

export default StudentDashboard;
