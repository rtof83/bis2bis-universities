const createUniversities = require('./createUniversities');

const updateHour = () => {
  setInterval(() => createUniversities(), 1000 * 60 * 60 * (process.env.UPDATE_HOUR || 24));
};

module.exports = updateHour;
