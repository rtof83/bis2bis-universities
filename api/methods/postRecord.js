const app = require('../database/conn');
// const checkRoute = require('../middlewares/checkRoute');

const postRecord = (route, model) => {
//   app.post(route, checkRoute, async (req, res) => {
  app.post(route, async (req, res) => {
    const result = await model.findOne({ _id: req.params.id });
    
    if (!result)
      return res.status(422).json({ message: 'Record not found!' });
    
    // if (result)
    //   return res
    //     .status(419)
    //     .json({ message: `user '${result.name}' already exists in database` });

    try {
      await model.create(req.body);
  
      res.status(201).json({ message: 'Record inserted successfully!' });
    } catch (error) {
      res.status(500).json({ error: error });
    };
  });
};

module.exports = postRecord;
