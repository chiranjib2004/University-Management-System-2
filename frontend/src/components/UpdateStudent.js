import React, { useState } from "react";
import axios from "axios";
import "./FormPageStyles.css";

function UpdateStudent() {
  const [form, setForm] = useState({ id: "", name: "", email: "", date_of_birth: "", mobile_no: "", aadhar_number: "", address: "", course: "", branch: "", class_10_percent: "", class_12_percent: "", date_of_joining: "" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSearch = () => {
    axios.get(`http://localhost:5000/api/student`)
      .then(res => {
        const student = res.data.find(s => s.id == form.id);
        if (student) setForm(student);
        else alert("Student not found");
      })
      .catch(() => alert("Error fetching student"));
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    axios.put("http://localhost:5000/api/student", form)
      .then(() => alert("Student updated!"))
      .catch(err => alert(err.response?.data?.message || "Error updating student"));
  };

  const handleDelete = () => {
    if (window.confirm("Delete this student?")) {
      axios.delete(`http://localhost:5000/api/student/${form.id}`)
        .then(() => { alert("Student deleted!"); setForm({ id: "", name: "", email: "", date_of_birth: "", mobile_no: "", aadhar_number: "", address: "", course: "", branch: "", class_10_percent: "", class_12_percent: "", date_of_joining: "" }); })
        .catch(err => alert(err.response?.data?.message || "Error deleting student"));
    }
  };

  return (
    <div className="form-bg">
      <div className="form-card">
        <h2>Update Student</h2>
        <div className="form-row">
          <input className="form-input" name="id" placeholder="Enter Roll Number" value={form.id} onChange={handleChange} />
          <button onClick={handleSearch} className="form-btn submit btn-submit">Search</button>
        </div>
        <form onSubmit={handleUpdate}>
          <div className="form-row">
            <div className="form-group">
              <input className="form-input" name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <input className="form-input" type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <input className="form-input" type="date" name="date_of_birth" value={form.date_of_birth} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <input className="form-input" name="mobile_no" placeholder="Mobile No" value={form.mobile_no} onChange={handleChange} required />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <input className="form-input" name="aadhar_number" placeholder="Aadhar Number" value={form.aadhar_number} onChange={handleChange} />
            </div>
            <div className="form-group">
              <input className="form-input" type="date" name="date_of_joining" value={form.date_of_joining} onChange={handleChange} />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <select className="form-input" name="course" value={form.course} onChange={handleChange}><option value="">Course</option><option value="B.Tech">B.Tech</option><option value="M.Tech">M.Tech</option><option value="MBA">MBA</option></select>
            </div>
            <div className="form-group">
              <select className="form-input" name="branch" value={form.branch} onChange={handleChange}><option value="">Branch</option><option value="CSE">CSE</option><option value="ECE">ECE</option><option value="ME">ME</option><option value="CE">CE</option></select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <input className="form-input" type="number" step="0.01" name="class_10_percent" placeholder="Class 10 %" value={form.class_10_percent} onChange={handleChange} />
            </div>
            <div className="form-group">
              <input className="form-input" type="number" step="0.01" name="class_12_percent" placeholder="Class 12 %" value={form.class_12_percent} onChange={handleChange} />
            </div>
          </div>

          <textarea className="form-input" name="address" placeholder="Address" value={form.address} onChange={handleChange} required></textarea>
          <div className="form-actions button-group">
            <button type="submit" className="form-btn submit btn-submit">Update</button>
            <button type="button" className="form-btn cancel btn-cancel" onClick={handleDelete}>Delete</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateStudent;
