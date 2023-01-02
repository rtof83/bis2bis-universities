const User = require('../models/User');

const checkAdminDel = async (req, res, next) => {
  try {
    const path = req.path.substring(0, req.path.search('/'+req.params.id));
  
    if (path === '/users') {
      const admins = await User.count({ access: 'admin' });
      const user = await User.findOne({ _id: req.params.id });
  
      if (admins === 1 && user.access === 'admin')
        return res.status(422).json({ message: 'Must exists at least one admin at database!' });
    };
  
    next();
  } catch (error) {
    return res.status(500).json({ error: error.message });
  };
};

module.exports = checkAdminDel;
