const app = require('../app/server');
const mongoose = require('mongoose');
const checkRoute = require('../middlewares/checkRoute');

const Config = require('../models/Config');

const updateConfig = (route) => {
  app.put(route, checkRoute, async (req, res) => {
    if (!mongoose.isValidObjectId(req.params.id))
      return res.status(400).json({ message: 'invalid id' });

    try {
      const config = await Config.updateOne({ _id: req.params.id }, req.body);

      if (config.matchedCount === 0)
        return res.status(422).json({ message: 'Record not found!' });
      
      res.status(200).json({ message: 'Record updated successfully!' });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    };
  });
};

module.exports = updateConfig;
