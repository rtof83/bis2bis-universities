const app = require('../database/conn');
// const checkRoute = require('../middlewares/checkRoute');

const putRecord = (route, model) => {
//   app.put(`${route}/:id`, checkRoute, async (req, res) => {
  app.put(`${route}/:id`, async (req, res) => {
    // const result = await model.updateOne({ _id: req.params.id }, req.body);
    
    // if (result.matchedCount === 0)
    //   return res.status(422).json({ message: 'Record not found!' });

    // check middleware if record exists

    try {
      await model.updateOne({ _id: req.params.id }, req.body);

      res.status(200).json({ message: 'Record updated successfully!' });
    } catch (error) {
      res.status(500).json({ error: error });
    };
  });
};

module.exports = putRecord;
