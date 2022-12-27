const mongoose = require('mongoose');

const Log = mongoose.model('Log', {
  lastUpdate: Date,
  message: String
});

module.exports = Log;
