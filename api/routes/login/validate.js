const app = require('../../app/server');

const validate = (route) => {
  app.post(route, async (req, res) => {
    try {
      const { error, decoded } = require('../../middlewares/checkValidate')(req);
      
      if (error) res.status(401).json({ message: 'invalid token' });
      if (decoded) res.status(200).json(decoded);

    } catch (error) {
      return res.status(500).json({ error: error.message });
    };
  });
};

module.exports = validate;
