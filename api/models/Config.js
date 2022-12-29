const mongoose = require('mongoose');

const Config = mongoose.model('Config', {
  url: String,
  countries: Array,
  perPage: Number,
  updateHour: Number,
  secret: String,
  secretTimeOut: Number  
});

module.exports = Config;
