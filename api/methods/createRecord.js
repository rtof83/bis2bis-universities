const app = require('../app/server');
const checkRoute = require('../middlewares/checkRoute');
const checkUniversity = require('../middlewares/checkUniversity');
const checkUser = require('../middlewares/checkUser');

const createRecord = (route, model) => {
  return (
    app.post(route, [ checkRoute, checkUniversity, checkUser ], async (req, res) => {
      try {
        await model.create(req.body);

        res.status(201).json({ message: 'Record inserted successfully!' });
      } catch (error) {
        res.status(500).json({ error: error.message });
      };
    })
  );
};

module.exports = createRecord;
