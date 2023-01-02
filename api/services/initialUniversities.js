const University = require('../models/University.js');
const createUniversities = require('./createUniversities.js');

const initialUniversities = async () => {
  try {
    const universities = await University.count();

    if (!universities) createUniversities();
  } catch (error) {
    console.log(error);
  };
};

module.exports = initialUniversities;
