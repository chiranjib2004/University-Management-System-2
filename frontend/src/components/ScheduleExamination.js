import React, { useState } from "react";
import axios from "axios";
import "./FormPageStyles.css";

function ScheduleExamination() {
  const [form, setForm] = useState({ exam_name: "", date: "", branch: "", semester: "" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Ensure date is left as 'YYYY-MM-DD'
    const data = {
      ...form,
      date: form.date // already correct if using <input type="date"/>
    };
    console.log("Sending:", data);
    axios.post("http://localhost:5000/api/examination", data)
      .then(() => { 
        alert("Exam scheduled!"); 
        setForm({ exam_name: "", date: "", branch: "", semester: "" }); 
      })
      .catch(err => alert(err.response?.data?.message || "Error scheduling exam"));
  };

  return (
    <div className="form-bg">
      <div className="form-card">
        <h2>Examination Panel</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group"><label>Exam Name:</label>
              <input className="form-input" name="exam_name" value={form.exam_name} onChange={handleChange} required /></div>
            <div className="form-group"><label>Date:</label>
              <input className="form-input" type="date" name="date" value={form.date} onChange={handleChange} required /></div>
          </div>
          <div className="form-row">
            <div className="form-group"><label>Branch:</label>
              <select className="form-input" name="branch" value={form.branch} onChange={handleChange} required>
                <option value="">Select</option>
                <option value="CSE">CSE</option>
                <option value="ECE">ECE</option>
                <option value="ME">ME</option>
                <option value="CE">CE</option>
              </select></div>
            <div className="form-group"><label>Semester:</label>
              <select className="form-input" name="semester" value={form.semester} onChange={handleChange} required>
                <option value="">Select</option>
                <option value="1st">1st</option><option value="2nd">2nd</option>
                <option value="3rd">3rd</option><option value="4th">4th</option>
                <option value="5th">5th</option><option value="6th">6th</option>
                <option value="7th">7th</option><option value="8th">8th</option>
              </select></div>
          </div>
          <div className="form-actions button-group">
            <button type="submit" className="form-btn submit btn-submit">Schedule</button>
            <button type="button" className="form-btn cancel btn-cancel" onClick={() => setForm({ exam_name: "", date: "", branch: "", semester: "" })}>Clear</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ScheduleExamination;
