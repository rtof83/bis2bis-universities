const app = require('../database/conn');
const Config = require('../models/Config');

const updateConfig = (route) => {
  app.put(route, async (req, res) => {
    try {
     
        
    //   const { error, decoded } = require('../middlewares/checkValidate')(req);
      
    //   if (error) res.status(401).json({ error: 'invalid token' });
    //   if (decoded) res.status(200).json(decoded);

      return res.status(200).json({ message: 'ok' });

    } catch (error) {
      return res.status(500).json({ error: error });
    };
  });
};

module.exports = updateConfig;
