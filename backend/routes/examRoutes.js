const express = require('express');
const router = express.Router();
const examController = require('../controllers/examController');

router.post('/examination', examController.addExam);
router.get('/examination', examController.getExams);

module.exports = router;
