const express = require('express');
const axios = require('axios');
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

router.get('/', authMiddleware, async (req, res) => {
  const preferences = req.user.preferences;

  if (preferences.length === 0) {
    return res.status(400).json({ error: 'No preferences set' });
  }

  try {
    const newsPromises = preferences.map(pref => 
      axios.get(`https://newsapi.org/v2/everything?q=${pref}&apiKey=your_news_api_key`)
    );
    const newsResponses = await Promise.all(newsPromises);
    const newsArticles = newsResponses.flatMap(response => response.data.articles);
    res.json({ articles: newsArticles });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch news articles' });
  }
});

module.exports = router;