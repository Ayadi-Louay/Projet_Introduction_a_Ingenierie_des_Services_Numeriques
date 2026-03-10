const express = require('express');
const {
  submitReport,
  getReports,
  getTrends,
  getStats,
  getAlerts,
  createAlert
} = require('../controllers/healthController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// Public routes
router.get('/trends', getTrends);
router.get('/stats', getStats);
router.get('/alerts', getAlerts);

// Protected routes
router.post('/reports', protect, submitReport);

// Admin/Health worker routes
router.get('/reports', protect, authorize('admin', 'health_worker'), getReports);
router.post('/alerts', protect, authorize('admin'), createAlert);

module.exports = router;
