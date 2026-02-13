const mongoose = require('mongoose');

const aboutSchema = new mongoose.Schema({
  label: { type: String, default: 'À propos' },
  title: String,
  paragraph1: String,
  paragraph2: String,
  image: String,
  floatingCard: { value: String, label: String },
  features: [{ icon: String, title: String, description: String }],
  ctaText: String,
  ctaHref: String,
}, { timestamps: true });

module.exports = mongoose.model('About', aboutSchema);
