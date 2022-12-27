const app = require('../database/conn');
const mongoose = require('mongoose');

const getById = (route, model) => {
  app.get(`${route}/:id`, async (req, res) => {
    try {
      if (mongoose.isValidObjectId(req.params.id)) {
        const result = await model.findOne({ _id: req.params.id });
  
        if (!result)
          return res.status(422).json({ message: 'Record not found!' });
  
        res.status(200).json(result);
      } else {
        res.status(400).json({ message: 'invalid id' });
      }
    
    } catch (error) {
      res.status(500).json({ error: error });
    };
  });
};

module.exports = getById;
