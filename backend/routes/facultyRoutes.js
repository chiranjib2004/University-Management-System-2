const express = require('express');
const router = express.Router();
const facultyController = require('../controllers/facultyController');

router.post('/faculty', facultyController.addFaculty);
router.get('/faculty', facultyController.getAllFaculty);
router.put('/faculty', facultyController.updateFaculty);
router.delete('/faculty/:id', facultyController.deleteFaculty);

module.exports = router;
