import React, { useState } from "react";
import axios from "axios";
import "./FormPageStyles.css";

function UpdateFaculty() {
  const [form, setForm] = useState({ id: "", name: "", email: "", date_of_birth: "", mobile_no: "", aadhar_number: "", address: "", department: "", qualification: "", experience_year: "", date_of_joining: "" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSearch = () => {
    axios.get(`http://localhost:5000/api/faculty`)
      .then(res => {
        const faculty = res.data.find(f => f.id == form.id);
        if (faculty) setForm(faculty);
        else alert("Faculty not found");
      })
      .catch(() => alert("Error fetching faculty"));
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    axios.put("http://localhost:5000/api/faculty", form)
      .then(() => alert("Faculty updated!"))
      .catch(err => alert(err.response?.data?.message || "Error updating faculty"));
  };

  const handleDelete = () => {
    if (window.confirm("Delete this faculty?")) {
      axios.delete(`http://localhost:5000/api/faculty/${form.id}`)
        .then(() => { alert("Faculty deleted!"); setForm({ id: "", name: "", email: "", date_of_birth: "", mobile_no: "", aadhar_number: "", address: "", department: "", qualification: "", experience_year: "", date_of_joining: "" }); })
        .catch(err => alert(err.response?.data?.message || "Error deleting faculty"));
    }
  };

  return (
    <div className="form-bg">
      <div className="form-card">
        <h2>Update Faculty</h2>
        <div className="form-row">
          <input className="form-input" name="id" placeholder="Enter Employee ID" value={form.id} onChange={handleChange} />
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
              <select className="form-input" name="department" value={form.department} onChange={handleChange}><option value="">Department</option><option value="CSE">CSE</option><option value="ECE">ECE</option><option value="ME">ME</option><option value="CE">CE</option></select>
            </div>
            <div className="form-group">
              <select className="form-input" name="qualification" value={form.qualification} onChange={handleChange}><option value="">Qualification</option><option value="PhD">PhD</option><option value="M.Tech">M.Tech</option><option value="B.Tech">B.Tech</option></select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <input className="form-input" type="number" name="experience_year" placeholder="Experience (Years)" value={form.experience_year} onChange={handleChange} />
            </div>
            <div className="form-group">
              {/* empty to balance layout */}
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

export default UpdateFaculty;
