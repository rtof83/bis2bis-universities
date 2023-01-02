const app = require('../app/server');
const checkValidate = require('../middlewares/checkValidate');

const Log = require('../models/Log.js');

const deleteLog = (route) => {
  app.delete(route, async (req, res) => {
    const { error, decoded } = checkValidate(req);

    if (error)
      return res.status(401).json(error);

    try {
      if (decoded.access === 'admin') {
        await Log.deleteMany();
        res.status(200).json({ message: 'Records deleted successfully' });
      } else {
        res.status(401).json({ message: 'access denied' });
      };
    } catch (error) {
      res.status(500).json({ error: error.message });
    };
  });
};

module.exports = deleteLog;
