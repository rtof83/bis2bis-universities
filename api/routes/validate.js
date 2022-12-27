const app = require('../database/conn');

const validate = (route) => {
  app.post(route, async (req, res) => {
    try {
      const { error, decoded } = require('../middlewares/checkValidate')(req);
      
      if (error) res.status(401).json({ error: 'invalid token' });
      if (decoded) res.status(200).json(decoded);

    } catch (error) {
      return res.status(500).json({ erro: error });
    };
  });
};

module.exports = validate;
