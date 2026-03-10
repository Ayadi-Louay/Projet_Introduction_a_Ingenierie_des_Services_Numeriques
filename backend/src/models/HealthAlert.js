const mongoose = require('mongoose');

const healthAlertSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    maxlength: 200
  },
  description: {
    type: String,
    required: true
  },
  disease: {
    type: String,
    enum: ['grippe', 'gastro-enterite', 'allergie', 'covid19', 'varicelle', 'rougeole', 'autre']
  },
  severity: {
    type: String,
    required: true,
    enum: ['low', 'medium', 'high', 'critical']
  },
  affectedAreas: [{
    type: String
  }],
  startDate: {
    type: Date,
    required: true
  },
  endDate: Date,
  isActive: {
    type: Boolean,
    default: true
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

healthAlertSchema.index({ isActive: 1 });
healthAlertSchema.index({ severity: -1 });
healthAlertSchema.index({ createdAt: -1 });

module.exports = mongoose.model('HealthAlert', healthAlertSchema);
