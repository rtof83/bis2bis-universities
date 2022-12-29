const checkValidate = require('./checkValidate');

const checkRoute = async (req, res, next) => {
  const { error, decoded } = checkValidate(req);

  if (error)
    return res.status(401).json(error);
  else if (((decoded.access !== 'admin') && (req.method === 'DELETE' || req.method === 'POST')) || // -> error if not admin
            (req.method === 'PUT' && decoded.access !== 'admin' && (parseInt(req.params.id) !== decoded.id || req.body.access === 'admin'))) // -> if not admin cannot change the access type

    return res.status(401).json({ message: 'access only for admin' });
  
  next();
};

module.exports = checkRoute;
