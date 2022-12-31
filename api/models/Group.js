const mongoose = require('mongoose');

const Group = mongoose.model('Group', {
  name: String,
  post: Object,
  delete: Object,
  put: Object,
  getAll: Object,
  getById: Object
});

module.exports = Group;
