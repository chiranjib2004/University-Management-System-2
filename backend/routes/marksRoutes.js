const express = require('express');
const router = express.Router();
const { addMark, getMarksByStudent, updateMark } = require('../controllers/marksController');
const { verifyToken, requireRole } = require('../middleware/authMiddleware');

// Faculty/Admin adds a mark
router.post('/marks', verifyToken, requireRole('faculty', 'admin'), addMark);

// Faculty/Admin updates a mark entry by id
router.put('/marks/:id', verifyToken, requireRole('faculty', 'admin'), updateMark);

// Fetch marks for a specific student
// - Students: only their own id
// - Faculty/Admin: any student id
router.get('/marks/:studentId', verifyToken, (req, res, next) => {
  const requester = req.user; // { id, role }
  if (requester.role === 'student' && String(requester.id) !== String(req.params.studentId)) {
    return res.status(403).json({ message: 'Forbidden' });
  }
  next();
}, getMarksByStudent);

module.exports = router;
