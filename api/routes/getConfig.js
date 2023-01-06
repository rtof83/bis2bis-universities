const app = require('../app/server');
const checkValidate = require('../middlewares/checkValidate');

const Config = require('../models/Config.js');

const getConfig = (route) => {
  return (
    app.get(route, async (req, res) => {
      try {
        const { decoded } = checkValidate(req);

        // admin = full access | !admin = only url and countries
        const query = decoded && decoded.access === 'admin' ? {} : { _id: 0, url: 1, countries: 1 };

        const config = await Config.findOne({}, query);

        if (!config)
          return res.status(422).json({ message: 'Record not found!' });

        res.status(200).json(config);
      } catch (error) {
        res.status(500).json({ error: error.message });
      };
    })
  );
};

module.exports = getConfig;
