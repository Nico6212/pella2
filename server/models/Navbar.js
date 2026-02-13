const mongoose = require('mongoose');

const navbarSchema = new mongoose.Schema({
  logoImage: String,
  links: [{ name: String, href: String }],
  ctaText: String,
  ctaHref: String,
}, { timestamps: true });

module.exports = mongoose.model('Navbar', navbarSchema);
