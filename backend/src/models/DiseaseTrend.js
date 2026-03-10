const mongoose = require('mongoose');

const diseaseTrendSchema = new mongoose.Schema({
  disease: {
    type: String,
    required: true,
    enum: ['grippe', 'gastro-enterite', 'allergie', 'covid19', 'varicelle', 'rougeole', 'autre']
  },
  city: {
    type: String,
    required: true
  },
  governorate: {
    type: String,
    required: true,
    enum: ['Tunis', 'Ariana', 'Ben Arous', 'Manouba', 'Nabeul', 'Zaghouan', 'Bizerte', 'Béja', 'Jendouba', 'El Kef', 'Siliana', 'Sousse', 'Monastir', 'Mahdia', 'Sfax', 'Kairouan', 'Kasserine', 'Sidi Bouzid', 'Gabès', 'Medenine', 'Tozeur', 'Kebili', 'Gafsa', 'Tataouine']
  },
  date: {
    type: Date,
    required: true
  },
  caseCount: {
    type: Number,
    default: 0
  },
  severityAvg: {
    type: Number,
    min: 0,
    max: 3
  },
  trendPercentage: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Compound index for unique disease+city+date
diseaseTrendSchema.index({ disease: 1, city: 1, date: 1 }, { unique: true });
diseaseTrendSchema.index({ date: -1 });
diseaseTrendSchema.index({ city: 1, governorate: 1 });

module.exports = mongoose.model('DiseaseTrend', diseaseTrendSchema);
