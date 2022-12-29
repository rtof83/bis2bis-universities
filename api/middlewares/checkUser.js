const checkValidate = require('./checkValidate');

const checkUser = async (req, res, next) => {
  const pathId = req.path.substring(0, req.path.search('/'+req.params.id));

  if (req.path === '/users' || pathId === '/users') {
    const { error, decoded } = checkValidate(req);

    if (error)
      return res.status(401).json(error);
    else if (req.path === '/users' && decoded.access !== 'admin')
      return res.redirect(`users/${decoded.id}`);
    else if (pathId === '/users' && decoded.access !== 'admin' && decoded.id !== req.params.id)
      return res.status(401).json({ message: 'access only for admin' });
  };

  next();
};

module.exports = checkUser;
