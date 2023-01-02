const Group = require('../models/Group');
const checkValidate = require('./checkValidate');

const checkRoute = async (req, res, next) => {
  const path = req.params.id ? req.path.substring(0, req.path.search('/'+req.params.id)) : req.path;
  
  // authentication not required
  if (path === '/universities' && req.method === 'GET')
    return next();

  // check authentication
  const { error, decoded } = checkValidate(req);

  if (error)
    return res.status(401).json(error);

  try {
    const group = await Group.findOne({ name: decoded.access });
    const grant = group[req.method].grant;

    // free access
    if (grant === 'all' ||
        grant[path] === 'all' ||
       (grant[path] === 'self' && decoded.id === req.params.id))
      return next();

    // if user group trying to access all users, redirect to itself
    if (req.path === '/users' && decoded.access !== 'admin')
      return res.redirect(`${req.path}/${decoded.id}`);

    // none access
    if (grant === 'none' ||
       (grant[path] === 'self' && decoded.id !== req.params.id) ||
       !grant[path])
      return res.status(401).json({ message: 'access denied' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  };
};

module.exports = checkRoute;
