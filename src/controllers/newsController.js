const axios = require('axios');
const newsPreferences = require('../models/newsPreferencesModel');

exports.getNews = async (req, res) => {
  const userPreferences = newsPreferences.find(p => p.username === req.user.username);
  if (!userPreferences) return res.status(400).send('No preferences found');
  
  const apiUrl = `https://newsapi.org/v2/everything?q=${userPreferences.preferences}&apiKey=your_news_api_key`;

  try {
    const response = await axios.get(apiUrl);
    res.json(response.data.articles);
  } catch (error) {
    res.status(500).send('Error fetching news articles');
  }
};
