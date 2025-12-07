import React, { useState } from "react";
import axios from "axios";
import "./FormPageStyles.css";

function EnterMarks() {
  const [form, setForm] = useState({
    student_id: "",
    subject: "",
    exam_name: "",
    score: ""
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      const token = localStorage.getItem('token');
      await axios.post("http://localhost:5000/api/marks", {
        student_id: parseInt(form.student_id),
        subject: form.subject,
        exam_name: form.exam_name,
        score: Number(form.score)
      }, { headers: { Authorization: `Bearer ${token}` } });
      setMessage("Mark saved.");
      setForm({ student_id: "", subject: "", exam_name: "", score: "" });
    } catch (err) {
      setMessage(err.response?.data?.message || "Error saving mark");
    }
  };

  return (
    <div className="form-bg">
      <div className="form-card">
        <h2>Enter Marks</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label>Student ID:</label>
              <input className="form-input" name="student_id" placeholder="e.g. 2100123" value={form.student_id} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Subject:</label>
              <input className="form-input" name="subject" placeholder="e.g. Mathematics" value={form.subject} onChange={handleChange} required />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Exam Name:</label>
              <input className="form-input" name="exam_name" placeholder="e.g. Mid Term" value={form.exam_name} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Score:</label>
              <input className="form-input" type="number" step="0.01" name="score" placeholder="e.g. 88.5" value={form.score} onChange={handleChange} required />
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="form-btn submit">Save</button>
            <button type="button" className="form-btn cancel" onClick={() => window.history.back()}>Cancel</button>
          </div>
          {message && <p style={{ textAlign: 'center', color: '#ffe082', marginTop: 12 }}>{message}</p>}
        </form>
      </div>
    </div>
  );
}

export default EnterMarks;
