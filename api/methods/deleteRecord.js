const app = require('../database/conn');
// const checkAdminDel = require('../middlewares/checkAdminDel');
// const checkRoute = require('../middlewares/checkRoute');

const deleteRecord = (route, model) => {
//   app.delete(`${route}/:id`, [ checkRoute, checkAdminDel ], async (req, res) => {
  app.delete(`${route}/:id`, async (req, res) => {
    const result = await model.findOne({ _id: req.params.id });
    
    if (!result)
      return res.status(422).json({ message: 'Record not found!' });

    try {
      await model.deleteOne({ _id: id });
  
      res.status(200).json({ message: 'Record deleted successfully!' });
    } catch (error) {
      res.status(500).json({ error: error });
    };
  });
};

module.exports = deleteRecord;
