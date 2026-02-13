const express = require('express');
const jwt = require('jsonwebtoken');
const { jwtSecret, adminEmail, adminPassword } = require('../config/auth');
const auth = require('../middleware/auth');
const router = express.Router();

router.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (email !== adminEmail || password !== adminPassword) {
    return res.status(401).json({ message: 'Email ou mot de passe incorrect' });
  }

  const token = jwt.sign({ email }, jwtSecret, { expiresIn: '24h' });
  res.json({ token, email });
});

router.get('/me', auth, (req, res) => {
  res.json({ email: req.admin.email });
});

module.exports = router;
