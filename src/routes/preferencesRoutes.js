const express = require('express');
const { body, validationResult } = require('express-validator');
const preferencesController = require('../controllers/preferencesController');
const authenticateToken = require('../middlewares/authMiddleware');
const router = express.Router();

router.get('/', authenticateToken, preferencesController.getPreferences);

router.put('/', authenticateToken, [
  body('preferences').isArray().withMessage('Preferences should be an array')
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  preferencesController.updatePreferences(req, res);
});

module.exports = router;
