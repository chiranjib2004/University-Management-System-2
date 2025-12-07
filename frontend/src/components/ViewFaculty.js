import React, { useEffect, useState } from "react";
import axios from "axios";
import "./FormPageStyles.css";

function ViewFaculty() {
  const [faculty, setFaculty] = useState(null);
  const [facultyList, setFacultyList] = useState([]);
  const role = localStorage.getItem('role');

  useEffect(() => {
    const id = localStorage.getItem('student_id');
    if (role === 'faculty') {
      if (!id) return;
      axios.get(`http://localhost:5000/api/admin/faculty/${id}`)
        .then(res => setFaculty(res.data))
        .catch(err => console.error(err));
    } else {
      axios.get('http://localhost:5000/api/admin/faculty-list')
        .then(res => setFacultyList(res.data))
        .catch(err => console.error(err));
    }
  }, []);

  return (
    <div className="form-bg">
      <div className="form-card">
        <h2>{role === 'faculty' ? 'Faculty Profile' : 'Faculty List'}</h2>
        <div className="table-scroll">
          <table className="styled-table">
            <thead>
              <tr>
                <th>Emp. ID</th><th>Name</th><th>Email</th>
                <th>Department</th><th>Mobile</th><th>Address</th>
              </tr>
            </thead>
            <tbody>
              {role === 'faculty' ? (
                !faculty ? (
                  <tr><td colSpan={6} style={{textAlign:"center"}}>No Data</td></tr>
                ) : (
                  <tr key={faculty.id}>
                    <td>{faculty.id}</td>
                    <td>{faculty.name}</td>
                    <td>{faculty.email}</td>
                    <td>{faculty.department}</td>
                    <td>{faculty.mobile_no}</td>
                    <td>{faculty.address}</td>
                  </tr>
                )
              ) : (
                facultyList.length === 0 ? (
                  <tr><td colSpan={6} style={{textAlign:"center"}}>No Data</td></tr>
                ) : (
                  facultyList.map(fac => (
                    <tr key={fac.id}>
                      <td>{fac.id}</td>
                      <td>{fac.name}</td>
                      <td>{fac.email}</td>
                      <td>{fac.department}</td>
                      <td>{fac.mobile_no}</td>
                      <td>{fac.address}</td>
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

export default ViewFaculty;
