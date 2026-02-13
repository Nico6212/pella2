const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  label: String,
  title: String,
  description: String,
  contactItems: [{
    iconPath: String,
    label: String,
    value: String,
  }],
  socialLinks: [{
    name: String,
    url: String,
  }],
  formConfig: {
    eventTypes: [{ value: String, label: String }],
    submitButtonText: String,
    responseText: String,
  },
}, { timestamps: true });

module.exports = mongoose.model('Contact', contactSchema);
