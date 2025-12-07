import React, { useState } from "react";
import axios from "axios";
import "./FormPageStyles.css";

function AddFaculty() {
  const [form, setForm] = useState({
    id: "",
    name: "",
    email: "",
    password: "",
    date_of_birth: "",
    mobile_no: "",
    aadhar_number: "",
    address: "",
    department: "",
    qualification: "",
    experience_year: "",
    date_of_joining: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:5000/api/faculty", form)
      .then(() => {
        alert("Faculty added successfully!");
        setForm({
          id: "", name: "", email: "", password: "", date_of_birth: "",
          mobile_no: "", aadhar_number: "", address: "", department: "",
          qualification: "", experience_year: "", date_of_joining: ""
        });
      })
      .catch(err => alert(err.response?.data?.message || "Error adding faculty"));
  };

  return (
    <div className="form-bg">
      <div className="form-card">
        <h2>Add New Faculty</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label>Employee ID:</label>
              <input className="form-input" placeholder="e.g. 1001" name="id" value={form.id} onChange={handleChange} required />
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
              <label>Email Id:</label>
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
              <label>Department:</label>
              <select className="form-input" name="department" value={form.department} onChange={handleChange}>
                <option value="">Select</option>
                <option value="CSE">CSE</option>
                <option value="ECE">ECE</option>
                <option value="ME">ME</option>
                <option value="CE">CE</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Qualification:</label>
              <select className="form-input" name="qualification" value={form.qualification} onChange={handleChange}>
                <option value="">Select</option>
                <option value="PhD">PhD</option>
                <option value="M.Tech">M.Tech</option>
                <option value="B.Tech">B.Tech</option>
              </select>
            </div>
            <div className="form-group">
              <label>Experience (Years):</label>
              <input className="form-input" type="number" placeholder="e.g. 5" name="experience_year" value={form.experience_year} onChange={handleChange} />
            </div>
          </div>

          <div className="form-row">
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

export default AddFaculty;
