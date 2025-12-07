import React, { useEffect, useState } from "react";
import axios from "axios";
import "./FormPageStyles.css";

function ViewMarks() {
  const [marks, setMarks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const id = localStorage.getItem('student_id');
    if (!id) { setLoading(false); return; }
    const token = localStorage.getItem('token');
    axios.get(`http://localhost:5000/api/marks/${id}`, { headers: { Authorization: `Bearer ${token}` } })
      .then(res => setMarks(res.data))
      .catch(() => setMarks([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="form-bg">
      <div className="form-card">
        <h2>Your Marks</h2>
        <div className="table-scroll">
          <table className="styled-table">
            <thead>
              <tr>
                <th>Exam</th>
                <th>Subject</th>
                <th>Score</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={4} style={{ textAlign: 'center' }}>Loading...</td></tr>
              ) : marks.length === 0 ? (
                <tr><td colSpan={4} style={{ textAlign: 'center' }}>No marks found</td></tr>
              ) : (
                marks.map(m => (
                  <tr key={m.id}>
                    <td>{m.exam_name}</td>
                    <td>{m.subject}</td>
                    <td>{m.score}</td>
                    <td>{new Date(m.created_at).toLocaleDateString()}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ViewMarks;
