const app = require('../../app/server');
const checkValidate = require('../../middlewares/checkValidate');

const createUniversities = require('../../services/createUniversities');

const postUniversities = (route) => {
  app.post(route, async (req, res) => {
    const { error, decoded } = checkValidate(req);

    if (error)
      return res.status(401).json(error);

    try {
      if (decoded.access === 'admin') {
        createUniversities(res);
      } else {
        res.status(401).json({ message: 'access denied' });
      };
    } catch (error) {
      res.status(500).json({ error: error.message });
    };
  });
};

module.exports = postUniversities;
