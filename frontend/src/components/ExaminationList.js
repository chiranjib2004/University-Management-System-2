import React, { useEffect, useState } from "react";
import axios from "axios";
import "./FormPageStyles.css";

function ExaminationList() {
  const [exams, setExams] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/examination")
      .then(res => setExams(res.data))
      .catch(() => setExams([]));
  }, []);

  return (
    <div className="form-bg">
      <div className="form-card">
        <h2>Upcoming Examinations</h2>
        <table className="styled-table">
          <thead>
            <tr>
              <th>Exam Name</th>
              <th>Date</th>
              <th>Branch</th>
              <th>Semester</th>
            </tr>
          </thead>
          <tbody>
            {exams.length === 0 ? (
              <tr><td colSpan={4} style={{ textAlign: 'center' }}>No Examinations Scheduled</td></tr>
            ) : (
              exams.map(exam => (
                <tr key={exam.id}>
                  <td>{exam.exam_name}</td>
                  <td>{exam.date}</td>
                  <td>{exam.branch}</td>
                  <td>{exam.semester}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ExaminationList;
