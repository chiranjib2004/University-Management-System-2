const express = require('express');
const router = express.Router();
const feeController = require('../controllers/feeController');

// Prevent caching on fee endpoints to ensure latest data is returned
router.use((req, res, next) => {
  res.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.set('Pragma', 'no-cache');
  res.set('Expires', '0');
  res.set('Surrogate-Control', 'no-store');
  next();
});

router.post('/fee', feeController.addFee);
router.get('/fee/:student_id', feeController.getStudentFee);

module.exports = router;
