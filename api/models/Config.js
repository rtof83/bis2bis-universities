const mongoose = require('mongoose');

const Config = mongoose.model('Config', {
  url: String,
  countries: Array,
  perPage: Number,
  // updateHour: Number,
  // secret: String,
  timeOut: Number  
});

module.exports = Config;
