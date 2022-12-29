const app = require('../app/server');
const mongoose = require('mongoose');
const checkRoute = require('../middlewares/checkRoute');

const updateRecord = (route, model) => {
  app.put(`${route}/:id`, checkRoute, async (req, res) => {
    const result = await model.updateOne({ _id: req.params.id }, req.body);
    
    if (result.matchedCount === 0)
      return res.status(422).json({ message: 'Record not found!' });

    try {
      if (mongoose.isValidObjectId(req.params.id)) {
        await model.updateOne({ _id: req.params.id }, req.body);

        res.status(200).json({ message: 'Record updated successfully!' });
      } else {
        res.status(400).json({ message: 'invalid id' });
      }
    } catch (error) {
      res.status(500).json({ error: error });
    };
  });
};

module.exports = updateRecord;
