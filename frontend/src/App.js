import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashBar from "./components/DashBar";
import AddFaculty from "./components/AddFaculty";
import AddStudent from "./components/AddStudent";
import ViewFaculty from "./components/ViewFaculty";
import ViewStudent from "./components/ViewStudent";
import UpdateFaculty from "./components/UpdateFaculty";
import UpdateStudent from "./components/UpdateStudent";
import ScheduleExamination from './components/ScheduleExamination';
import StudentFeeDetails from "./components/StudentFeeDetails";
import ExaminationList from './components/ExaminationList';
import Utility from "./components/Utility";
import Login from "./components/Login";
import AdminDashboard from "./components/AdminDashboard";
import FacultyDashboard from "./components/FacultyDashboard";
import StudentDashboard from "./components/StudentDashboard";
import PrivateRoute from "./components/PrivateRoute";
import FeeForm from "./components/FeeForm";
import EnterMarks from "./components/EnterMarks";
import ViewMarks from "./components/ViewMarks";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [role, setRole] = useState(localStorage.getItem("role"));

  // Get studentId from localStorage (set after login)
  const studentId = localStorage.getItem('student_id');

  useEffect(() => {
    function syncAuth() {
      setToken(localStorage.getItem("token"));
      setRole(localStorage.getItem("role"));
    }
    window.addEventListener('storage', syncAuth);
    return () => window.removeEventListener('storage', syncAuth);
  }, []);

  // Only show DashBar if logged in and not on login page
  const location = window.location.pathname;

  return (
    <BrowserRouter>
      {token && location !== "/" && (
        <DashBar role={role} setToken={setToken} setRole={setRole} />
      )}
      <Routes>
        <Route path="/" element={<Login setToken={setToken} setRole={setRole} />} />
        <Route path="/admin-dashboard" element={<PrivateRoute><AdminDashboard /></PrivateRoute>} />
        <Route path="/faculty-dashboard" element={<PrivateRoute><FacultyDashboard /></PrivateRoute>} />
        <Route path="/student-dashboard" element={<PrivateRoute><StudentDashboard /></PrivateRoute>} />
        <Route path="/add-faculty" element={<PrivateRoute><AddFaculty /></PrivateRoute>} />
        <Route path="/add-student" element={<PrivateRoute><AddStudent /></PrivateRoute>} />
        <Route path="/view-faculty" element={<PrivateRoute><ViewFaculty /></PrivateRoute>} />
        <Route path="/view-student" element={<PrivateRoute><ViewStudent /></PrivateRoute>} />
        <Route path="/update-faculty" element={<PrivateRoute><UpdateFaculty /></PrivateRoute>} />
        <Route path="/update-student" element={<PrivateRoute><UpdateStudent /></PrivateRoute>} />
        <Route path="/examinations" element={<ExaminationList />} />
        <Route path="/fee-details" element={<PrivateRoute><StudentFeeDetails /></PrivateRoute>} />
        <Route path="/examination-panel" element={<ScheduleExamination />} />
        <Route path="/add-fee" element={<FeeForm />} />
        <Route path="/utility" element={<PrivateRoute><Utility /></PrivateRoute>} />
        <Route path="/enter-marks" element={<PrivateRoute><EnterMarks /></PrivateRoute>} />
        <Route path="/view-marks" element={<PrivateRoute><ViewMarks /></PrivateRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
