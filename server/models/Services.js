const mongoose = require('mongoose');

const servicesSchema = new mongoose.Schema({
  label: String,
  title: String,
  description: String,
  ctaText: String,
  ctaHref: String,
  items: [{
    title: String,
    description: String,
    image: String,
    features: [String],
    linkTo: String,
  }],
}, { timestamps: true });

module.exports = mongoose.model('Services', servicesSchema);
