const User = require('../models/User.js');

const checkUser = async (req, res, next) => {
  if (req.path === '/users') {
    try {
      const user = await User.findOne({ name: req.body.name });

      if (!user)
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

module.exports = checkUser;
