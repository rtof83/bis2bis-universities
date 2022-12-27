const jwt = require('jsonwebtoken');

const checkValidate = (req) => {
  const headers = req.headers['authorization'];
  const token = headers && headers.split(' ')[1];

  let decoded, error;

  if (!token)
    error = 'forbidden access';

  jwt.verify(token, process.env.SECRET, (err, dec) => {
    error = err;
    decoded = dec;
  });

  return { error, decoded };
};

module.exports = checkValidate;
