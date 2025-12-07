import React, { useEffect, useState } from "react";
import axios from "axios";

function StudentFeeDetails({ studentId }) { // get from auth/session/context
  const [fee, setFee] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/fee/${studentId}`, {
      params: { t: Date.now() },
      headers: { 'Cache-Control': 'no-cache' }
    })
      .then(res => setFee(res.data[0] || null))
      .catch(() => setFee(null));
  }, [studentId]);

  if (!fee) return <div style={{color:"#eca"}}>No fee record found.</div>;

  return (
    <div style={{
      background: "#232b4b",
      maxWidth: 400,
      margin: "40px auto",
      padding: 24,
      borderRadius: 13,
      boxShadow: "0 4px 20px #06131d31"
    }}>
      <h2 style={{color:"#ffd267",marginBottom:20,textAlign:"center"}}>Your Fee Details</h2>
      <div style={{fontSize:"1.1rem"}}>
        <div><b>Amount:</b> {fee.amount}</div>
        <div><b>Due Date:</b> {fee.due_date}</div>
        <div><b>Status:</b> {fee.paid ? <span style={{color:"#48e974"}}>Paid</span> : <span style={{color:"#ea6464"}}>Unpaid</span>}</div>
      </div>
    </div>
  );
}

export default StudentFeeDetails;
