const mongoose = require('mongoose');

const footerSchema = new mongoose.Schema({
  tagline: String,
  newsletter: {
    title: String,
    placeholder: String,
    buttonText: String,
  },
  linkColumns: [{
    title: String,
    links: [{ name: String, href: String }],
  }],
  socialLinks: [{
    name: String,
    letter: String,
    url: String,
  }],
}, { timestamps: true });

module.exports = mongoose.model('Footer', footerSchema);
