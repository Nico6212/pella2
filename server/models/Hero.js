const mongoose = require('mongoose');

const heroSchema = new mongoose.Schema({
  badgeText: { type: String, default: 'Créateurs de moments inoubliables' },
  heading: {
    line1: { type: String, default: 'Nous Créons' },
    line2prefix: { type: String, default: 'des ' },
    line2highlight: { type: String, default: 'Expériences' },
    line3: { type: String, default: 'Inspirantes' },
  },
  subtitle: String,
  ctaPrimary: { text: String, href: String },
  ctaSecondary: { text: String, href: String },
  scrollText: { type: String, default: 'Défiler' },
  backgroundImage: { type: String, default: '/hero%20evenement%20image%20de%20font%20.png' },
  stats: [{ value: String, label: String }],
}, { timestamps: true });

module.exports = mongoose.model('Hero', heroSchema);
