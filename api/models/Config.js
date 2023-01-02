const mongoose = require('mongoose');

const Config = mongoose.model('Config', {
  url: String,
  countries: Array,
  perPage: Number,
  timeOut: Number  
});

module.exports = Config;
