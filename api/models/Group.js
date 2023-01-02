const mongoose = require('mongoose');

const Group = mongoose.model('Group', {
  name: String,
  POST: Object,
  DELETE: Object,
  PUT: Object,
  GET: Object
});

module.exports = Group;
