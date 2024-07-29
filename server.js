const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const preferencesRoutes = require('./routes/preferences');
const newsRoutes = require('./routes/news');

const app = express();

app.use(bodyParser.json());
app.use('/auth', authRoutes);
app.use('/preferences', preferencesRoutes);
app.use('/news', newsRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});