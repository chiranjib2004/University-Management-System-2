import React, { useState } from "react";
import axios from "axios";
import "./FormPageStyles.css";

function FeeForm() {
  const [form, setForm] = useState({
    student_id: "",
    amount: "",
    due_date: "",
    paid: false
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: name === "paid" ? value === "true" : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = { ...form, student_id: String(form.student_id).trim() };
    axios.post("http://localhost:5000/api/fee", payload)
      .then(() => alert("Fee record saved!"))
      .catch((err) => alert(err.response?.data?.message || "Error"));
  };

  return (
    <div className="form-bg">
      <div className="form-card" style={{maxWidth: 520}}>
        <h2>Add Fee Details</h2>
        <form onSubmit={handleSubmit}>
          <input className="form-input" name="student_id" placeholder="Student ID" onChange={handleChange} required />
          <input className="form-input" name="amount" type="number" placeholder="Amount" onChange={handleChange} required />
          <input className="form-input" name="due_date" type="date" placeholder="Due Date" onChange={handleChange} required />
          <select className="form-input" name="paid" onChange={handleChange}>
            <option value={false}>Unpaid</option>
            <option value={true}>Paid</option>
          </select>
          <div className="form-actions button-group">
            <button className="form-btn submit btn-submit" type="submit">Save Fee Details</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default FeeForm;
