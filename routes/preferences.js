const express = require('express');
const jwt = require('jsonwebtoken');
const { findUser } = require('../models/user');

const router = express.Router();

const JWT_SECRET = 'your_jwt_secret_key';

const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization').replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ error: 'Access denied' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = findUser(decoded.username);
    if (!req.user) {
      return res.status(401).json({ error: 'Invalid token' });
    }
    next();
  } catch (err) {
    res.status(400).json({ error: 'Invalid token' });
  }
};

router.get('/', authMiddleware, (req, res) => {
  res.json({ preferences: req.user.preferences });
});

router.put('/', authMiddleware, (req, res) => {
  const { preferences } = req.body;

  if (!Array.isArray(preferences)) {
    return res.status(400).json({ error: 'Preferences should be an array' });
  }

  req.user.preferences = preferences;
  res.json({ preferences: req.user.preferences });
});

module.exports = router;