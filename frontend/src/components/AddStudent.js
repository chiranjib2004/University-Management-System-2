import React, { useState } from "react";
import axios from "axios";
import "./FormPageStyles.css";

function AddStudent() {
  const [form, setForm] = useState({
    id: "",
    name: "",
    email: "",
    password: "",
    date_of_birth: "",
    mobile_no: "",
    aadhar_number: "",
    address: "",
    course: "",
    branch: "",
    class_10_percent: "",
    class_12_percent: "",
    date_of_joining: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:5000/api/student", form)
      .then(() => {
        alert("Student added successfully!");
        setForm({
          id: "", name: "", email: "", password: "", date_of_birth: "",
          mobile_no: "", aadhar_number: "", address: "", course: "",
          branch: "", class_10_percent: "", class_12_percent: "", date_of_joining: ""
        });
      })
      .catch(err => alert(err.response?.data?.message || "Error adding student"));
  };

  return (
    <div className="form-bg">
      <div className="form-card">
        <h2>Add New Student</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label>Roll Number:</label>
              <input className="form-input" placeholder="e.g. 2100123" name="id" value={form.id} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Name:</label>
              <input className="form-input" placeholder="Full name" name="name" value={form.name} onChange={handleChange} required />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Date of Birth:</label>
              <input className="form-input" type="date" name="date_of_birth" value={form.date_of_birth} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Mobile No:</label>
              <input className="form-input" placeholder="10-digit number" name="mobile_no" value={form.mobile_no} onChange={handleChange} required />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Email ID:</label>
              <input className="form-input" placeholder="name@college.edu" type="email" name="email" value={form.email} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Password:</label>
              <input className="form-input" placeholder="Set a password" type="password" name="password" value={form.password} onChange={handleChange} required />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Aadhar Number:</label>
              <input className="form-input" placeholder="XXXX-XXXX-XXXX" name="aadhar_number" value={form.aadhar_number} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Course:</label>
              <select className="form-input" name="course" value={form.course} onChange={handleChange}>
                <option value="">Select</option>
                <option value="B.Tech">B.Tech</option>
                <option value="M.Tech">M.Tech</option>
                <option value="MBA">MBA</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Branch:</label>
              <select className="form-input" name="branch" value={form.branch} onChange={handleChange}>
                <option value="">Select</option>
                <option value="CSE">CSE</option>
                <option value="ECE">ECE</option>
                <option value="ME">ME</option>
                <option value="CE">CE</option>
              </select>
            </div>
            <div className="form-group">
              <label>Class 10 %:</label>
              <input className="form-input" placeholder="e.g. 85.6" type="number" step="0.01" name="class_10_percent" value={form.class_10_percent} onChange={handleChange} />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Class 12 %:</label>
              <input className="form-input" placeholder="e.g. 88.4" type="number" step="0.01" name="class_12_percent" value={form.class_12_percent} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Date of Joining:</label>
              <input className="form-input" type="date" name="date_of_joining" value={form.date_of_joining} onChange={handleChange} />
            </div>
          </div>

          <div className="form-group full-width">
            <label>Address:</label>
            <textarea className="form-input" placeholder="House No, Street, City, State" name="address" value={form.address} onChange={handleChange} required></textarea>
          </div>

          <div className="form-actions">
            <button type="submit" className="form-btn submit">Submit</button>
            <button type="button" className="form-btn cancel" onClick={() => window.history.back()}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddStudent;
