const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');

router.post('/student', studentController.addStudent);
router.get('/student', studentController.getAllStudents);
router.put('/student', studentController.updateStudent);
router.delete('/student/:id', studentController.deleteStudent);

module.exports = router;
