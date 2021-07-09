const mongoose = require('mongoose');

const performanceSchema = mongoose.Schema({
  date: {
    type: Date,
    unique: 1
  },

  self_powered_solar: {
    type: Number,
    default: 0
  },

  self_powered_powerwall: {
    type: Number,
    default: 0
  },

  solar_offset_solar: {
    type: Number,
    default: 0
  },

  solar_offset_home: {
    type: Number,
    default: 0
  }
})

const Performance = mongoose.model('Performance', performanceSchema);

module.exports = {Performance};