const newsPreferences = [];

exports.getPreferences = (req, res) => {
  const preferences = newsPreferences.find(p => p.username === req.user.username);
  res.json(preferences || {});
};

exports.updatePreferences = (req, res) => {
  const { preferences } = req.body;
  const userPreferences = newsPreferences.find(p => p.username === req.user.username);
  if (userPreferences) {
    userPreferences.preferences = preferences;
  } else {
    newsPreferences.push({ username: req.user.username, preferences });
  }
  res.send('Preferences updated successfully');
};
