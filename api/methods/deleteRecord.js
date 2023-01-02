const app = require('../app/server');
const mongoose = require('mongoose');
const checkAdminDel = require('../middlewares/checkAdminDel');
const checkRoute = require('../middlewares/checkRoute');

const deleteRecord = (route, model) => {
  app.delete(`${route}/:id`, [ checkRoute, checkAdminDel ], async (req, res) => {
    try {
      if (mongoose.isValidObjectId(req.params.id)) {
        const result = await model.findOne({ _id: req.params.id });
    
        if (!result)
          return res.status(422).json({ message: 'Record not found!' });

        await model.deleteOne({ _id: req.params.id });
  
        res.status(200).json({ message: 'Record deleted successfully!' });
      } else {
        res.status(400).json({ message: 'invalid id' });
      };
    } catch (error) {
      res.status(500).json({ error: error.message });
    };
  });
};

module.exports = deleteRecord;
