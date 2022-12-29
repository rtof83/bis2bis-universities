const User = require('../models/User');

const checkAdminDel = async (req, res, next) => {
  const path = req.path.substring(0, req.path.search('/'+req.params.id));
  
  if (path === '/users') {
    const admins = await User.count({ access: 'admin' });

    if (admins === 1)
      return res.status(422).json({ message: 'Must exists at least one admin at database!' });
  };

  next();
};

module.exports = checkAdminDel;
