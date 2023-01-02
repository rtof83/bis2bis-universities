const University = require('../models/University.js');

const checkUniversity = async (req, res, next) => {
  if (req.path === '/universities') {
    try {
      const university = await University.findOne({ country: req.body.country, name: req.body.name, 'state-province': req.body['state-province'] });

      if (!university)
        next();
      else
        res.status(409).json({ message: 'Record already exists in database!' });

    } catch (error) {
      res.status(500).json({ error: error.message });
    };
  } else {
    next();
  };
};

module.exports = checkUniversity;
