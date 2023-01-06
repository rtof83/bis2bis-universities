const app = require('../app/server');
const checkValidate = require('../middlewares/checkValidate');

const Log = require('../models/Log.js');

const getLog = (route) => {
  return (
    app.get(route, async (req, res) => {
      const { error, decoded } = checkValidate(req);

      if (error)
        return res.status(401).json(error);

      try {
        if (decoded.access === 'admin') {
          const log = await Log.find();

          if (!log)
            return res.status(404).json({ message: 'Record not found!' });

          res.status(200).json(log);
        } else {
          res.status(401).json({ message: 'access denied' });
        };
      } catch (error) {
        res.status(500).json({ error: error.message });
      };
    })
  );
};

module.exports = getLog;
