const mongoose = require('mongoose');

const healthReportSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null // Allow anonymous reports
  },
  disease: {
    type: String,
    required: true,
    enum: ['grippe', 'gastro-enterite', 'allergie', 'covid19', 'varicelle', 'rougeole', 'autre']
  },
  symptoms: [{
    type: String,
    required: true
  }],
  severity: {
    type: String,
    required: true,
    enum: ['low', 'medium', 'high', 'critical']
  },
  location: {
    latitude: {
      type: Number,
      required: true,
      min: -90,
      max: 90
    },
    longitude: {
      type: Number,
      required: true,
      min: -180,
      max: 180
    },
    address: String,
    city: {
      type: String,
      required: true
    },
    governorate: {
      type: String,
      required: true,
      enum: ['Tunis', 'Ariana', 'Ben Arous', 'Manouba', 'Nabeul', 'Zaghouan', 'Bizerte', 'Béja', 'Jendouba', 'El Kef', 'Siliana', 'Sousse', 'Monastir', 'Mahdia', 'Sfax', 'Kairouan', 'Kasserine', 'Sidi Bouzid', 'Gabès', 'Medenine', 'Tozeur', 'Kebili', 'Gafsa', 'Tataouine']
    }
  },
  demographics: {
    ageGroup: {
      type: String,
      enum: ['0-17', '18-29', '30-49', '50-64', '65+']
    },
    gender: {
      type: String,
      enum: ['male', 'female', 'other']
    }
  },
  isAnonymous: {
    type: Boolean,
    default: true
  },
  verified: {
    type: Boolean,
    default: false
  },
  verifiedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  verifiedAt: Date
}, {
  timestamps: true
});

// Indexes for better performance
healthReportSchema.index({ 'location.latitude': 1, 'location.longitude': 1 });
healthReportSchema.index({ disease: 1 });
healthReportSchema.index({ createdAt: -1 });
healthReportSchema.index({ 'location.city': 1, 'location.governorate': 1 });
healthReportSchema.index({ verified: 1 });

module.exports = mongoose.model('HealthReport', healthReportSchema);
