const express = require('express');
const {
  addFaculty,
  addStudent,
  getFacultyList,
  getStudentList,
  getFacultyById,
  getStudentById,
  updateFaculty,
  updateStudent
} = require('../controllers/adminController');

// Dummy middleware (replace with real auth as needed)
function verifyToken(req, res, next) { next(); }
function verifyAdmin(req, res, next) { next(); }

const router = express.Router();

// Faculty routes
router.post('/add-faculty', verifyToken, verifyAdmin, addFaculty);
router.get('/faculty-list', verifyToken, verifyAdmin, getFacultyList); // View list
router.get('/faculty/:id', verifyToken, verifyAdmin, getFacultyById); // View single faculty
router.put('/faculty/:id', verifyToken, verifyAdmin, updateFaculty);   // Update faculty

// Student routes
router.post('/add-student', verifyToken, verifyAdmin, addStudent);
router.get('/student-list', verifyToken, verifyAdmin, getStudentList); // View list
router.get('/student/:id', verifyToken, verifyAdmin, getStudentById); // View single student
router.put('/student/:id', verifyToken, verifyAdmin, updateStudent);   // Update student

module.exports = router;
