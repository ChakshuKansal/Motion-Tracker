const mongoose = require("mongoose");

const SettingsSchema = new mongoose.Schema(
  {
    currWorkout: { type: String, required: true, trim: true },
    currDuration: { type: String, required: true, trim: true },
    isAccessCamera: { type: Boolean, required: true },
    isAudioEffect: { type: Boolean, required: true },
    isFullscreen: { type: Boolean, required: true },
    isFlipCamera: { type: Boolean, required: true },
    isDirectionSign: { type: Boolean, required: true },
    isDeveloperMode: { type: Boolean, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Settings", SettingsSchema);
