// models/characterModel.js

const mongoose = require("mongoose")

const characterSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    level: {
      type: Number,
      required: true,
    },
    isOnline: {
      type: Boolean,
      required: false,
    }
  },
  {
    timestamps: true
  }
)

const character = mongoose.model('Character', characterSchema)
module.exports = character;
