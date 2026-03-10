const HealthReport = require('../models/HealthReport');
const DiseaseTrend = require('../models/DiseaseTrend');
const HealthAlert = require('../models/HealthAlert');

// @desc    Submit health report
// @route   POST /api/health/reports
// @access  Private/Public (allow anonymous)
const submitReport = async (req, res) => {
  try {
    const {
      disease,
      symptoms,
      severity,
      location,
      demographics,
      isAnonymous = true
    } = req.body;

    // Add user ID if authenticated
    const reportData = {
      disease,
      symptoms,
      severity,
      location,
      demographics,
      isAnonymous
    };

    if (req.user && !isAnonymous) {
      reportData.user = req.user.id;
    }

    const report = await HealthReport.create(reportData);

    // Update disease trends (this would be a background job in production)
    await updateDiseaseTrends(disease, location.city, location.governorate);

    res.status(201).json({
      success: true,
      message: 'Signalement enregistré avec succès',
      data: report
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur serveur',
      error: error.message
    });
  }
};

// @desc    Get health reports with filters
// @route   GET /api/health/reports
// @access  Private (admin/health_worker)
const getReports = async (req, res) => {
  try {
    const {
      disease,
      city,
      governorate,
      severity,
      verified,
      page = 1,
      limit = 20
    } = req.query;

    // Build filter
    const filter = {};
    if (disease) filter.disease = disease;
    if (city) filter['location.city'] = city;
    if (governorate) filter['location.governorate'] = governorate;
    if (severity) filter.severity = severity;
    if (verified !== undefined) filter.verified = verified === 'true';

    const reports = await HealthReport.find(filter)
      .populate('user', 'firstName lastName email')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await HealthReport.countDocuments(filter);

    res.json({
      success: true,
      data: reports,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur serveur',
      error: error.message
    });
  }
};

// @desc    Get disease trends
// @route   GET /api/health/trends
// @access  Public
const getTrends = async (req, res) => {
  try {
    const {
      city,
      governorate,
      disease,
      period = '7d' // 7d, 30d, 90d
    } = req.query;

    // Calculate date range
    const days = period === '7d' ? 7 : period === '30d' ? 30 : 90;
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    // Build filter
    const filter = {
      date: { $gte: startDate }
    };
    if (city) filter.city = city;
    if (governorate) filter.governorate = governorate;
    if (disease) filter.disease = disease;

    const trends = await DiseaseTrend.find(filter)
      .sort({ date: 1 });

    res.json({
      success: true,
      data: trends
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur serveur',
      error: error.message
    });
  }
};

// @desc    Get health statistics
// @route   GET /api/health/stats
// @access  Public
const getStats = async (req, res) => {
  try {
    const {
      city,
      governorate,
      period = '24h' // 24h, 7d, 30d
    } = req.query;

    // Calculate date range
    let startDate = new Date();
    if (period === '24h') {
      startDate.setHours(startDate.getHours() - 24);
    } else if (period === '7d') {
      startDate.setDate(startDate.getDate() - 7);
    } else {
      startDate.setDate(startDate.getDate() - 30);
    }

    // Build filter
    const filter = { createdAt: { $gte: startDate } };
    if (city) filter['location.city'] = city;
    if (governorate) filter['location.governorate'] = governorate;

    // Get statistics
    const [
      totalReports,
      reportsByDisease,
      reportsBySeverity,
      reportsByLocation
    ] = await Promise.all([
      HealthReport.countDocuments(filter),
      HealthReport.aggregate([
        { $match: filter },
        { $group: { _id: '$disease', count: { $sum: 1 } } },
        { $sort: { count: -1 } }
      ]),
      HealthReport.aggregate([
        { $match: filter },
        { $group: { _id: '$severity', count: { $sum: 1 } } }
      ]),
      HealthReport.aggregate([
        { $match: filter },
        { $group: { _id: '$location.city', count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 10 }
      ])
    ]);

    res.json({
      success: true,
      data: {
        totalReports,
        reportsByDisease,
        reportsBySeverity,
        reportsByLocation,
        period
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur serveur',
      error: error.message
    });
  }
};

// @desc    Get active health alerts
// @route   GET /api/health/alerts
// @access  Public
const getAlerts = async (req, res) => {
  try {
    const alerts = await HealthAlert.find({ isActive: true })
      .sort({ severity: -1, createdAt: -1 });

    res.json({
      success: true,
      data: alerts
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur serveur',
      error: error.message
    });
  }
};

// @desc    Create health alert (admin only)
// @route   POST /api/health/alerts
// @access  Private (admin)
const createAlert = async (req, res) => {
  try {
    const alert = await HealthAlert.create({
      ...req.body,
      createdBy: req.user.id
    });

    res.status(201).json({
      success: true,
      data: alert
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur serveur',
      error: error.message
    });
  }
};

// Helper function to update disease trends
async function updateDiseaseTrends(disease, city, governorate) {
  try {
    const today = new Date().toISOString().split('T')[0];
    
    await DiseaseTrend.findOneAndUpdate(
      { disease, city, date: today },
      { $inc: { caseCount: 1 } },
      { upsert: true, new: true }
    );
  } catch (error) {
    console.error('Error updating disease trends:', error);
  }
}

module.exports = {
  submitReport,
  getReports,
  getTrends,
  getStats,
  getAlerts,
  createAlert
};
