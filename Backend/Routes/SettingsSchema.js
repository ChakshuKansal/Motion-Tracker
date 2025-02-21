const express = require('express');
const router = express.Router();
const Settings = require('../models/SettingsSchema');

router.put('/updateSettings', async (req, res) => {
  try {
    let settings = await Settings.findOne({});
    if (!settings) {
      settings = new Settings(req.body);
      await settings.save();
    } else {
      settings = await Settings.findOneAndUpdate({}, req.body, { new: true });
    }
    res.json(settings);
  } catch (err) {
    console.error("Error updating settings:", err.message);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
