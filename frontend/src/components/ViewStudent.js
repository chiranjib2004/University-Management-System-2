import React, { useEffect, useState } from "react";
import axios from "axios";
import "./FormPageStyles.css";

function ViewStudent() {
  const [student, setStudent] = useState(null);
  const [studentList, setStudentList] = useState([]);
  const role = localStorage.getItem('role');

  useEffect(() => {
    const id = localStorage.getItem('student_id');
    if (role === 'student') {
      if (!id) return;
      axios.get(`http://localhost:5000/api/admin/student/${id}`)
        .then(res => setStudent(res.data))
        .catch(err => console.error(err));
    } else {
      axios.get('http://localhost:5000/api/admin/student-list')
        .then(res => setStudentList(res.data))
        .catch(err => console.error(err));
    }
  }, []);

  return (
    <div className="form-bg">
      <div className="form-card">
        <h2>{role === 'student' ? 'Student Profile' : 'Student List'}</h2>
        <div className="table-scroll">
          <table className="styled-table">
            <thead>
              <tr>
                <th>Roll No</th><th>Name</th><th>Email</th>
                <th>Branch</th><th>Course</th><th>Mobile</th><th>Address</th>
              </tr>
            </thead>
            <tbody>
              {role === 'student' ? (
                !student ? (
                  <tr><td colSpan={7} style={{textAlign:"center"}}>No Data</td></tr>
                ) : (
                  <tr key={student.id}>
                    <td>{student.id}</td>
                    <td>{student.name}</td>
                    <td>{student.email}</td>
                    <td>{student.branch}</td>
                    <td>{student.course}</td>
                    <td>{student.mobile_no}</td>
                    <td>{student.address}</td>
                  </tr>
                )
              ) : (
                studentList.length === 0 ? (
                  <tr><td colSpan={7} style={{textAlign:"center"}}>No Data</td></tr>
                ) : (
                  studentList.map(stu => (
                    <tr key={stu.id}>
                      <td>{stu.id}</td>
                      <td>{stu.name}</td>
                      <td>{stu.email}</td>
                      <td>{stu.branch}</td>
                      <td>{stu.course}</td>
                      <td>{stu.mobile_no}</td>
                      <td>{stu.address}</td>
                    </tr>
                  ))
                )
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ViewStudent;
