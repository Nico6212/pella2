const mongoose = require('mongoose');

const portfolioSchema = new mongoose.Schema({
  label: String,
  title: String,
  description: String,
  categories: [String],
  projects: [{
    title: String,
    category: String,
    image: String,
    size: { type: String, enum: ['large', 'medium', 'small'], default: 'medium' },
    linkTo: { type: String, default: null },
  }],
}, { timestamps: true });

module.exports = mongoose.model('Portfolio', portfolioSchema);
