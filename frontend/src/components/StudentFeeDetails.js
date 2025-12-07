import React, { useEffect, useState } from "react";
import axios from "axios";

function StudentFeeDetails() {
  const [fee, setFee] = useState(null);
  const studentId = localStorage.getItem('student_id');

  const fetchFee = () => {
    if (!studentId) { setFee(null); return; }
    axios.get(`http://localhost:5000/api/fee/${studentId}`, {
      params: { t: Date.now() },
      headers: { 'Cache-Control': 'no-cache' }
    })
    .then(res => {
      const rows = Array.isArray(res.data) ? [...res.data] : [];
      rows.sort((a,b) => {
        const da = new Date(a.due_date).getTime() || 0;
        const db = new Date(b.due_date).getTime() || 0;
        if (db !== da) return db - da;
        const ia = Number(a.id) || 0;
        const ib = Number(b.id) || 0;
        return ib - ia;
      });
      setFee(rows[0] || null);
    })
    .catch(() => setFee(null));
  };

  useEffect(() => { fetchFee(); }, [studentId]);

  useEffect(() => {
    const onFocus = () => fetchFee();
    const onVis = () => { if (document.visibilityState === 'visible') fetchFee(); };
    window.addEventListener('focus', onFocus);
    document.addEventListener('visibilitychange', onVis);
    return () => {
      window.removeEventListener('focus', onFocus);
      document.removeEventListener('visibilitychange', onVis);
    };
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
