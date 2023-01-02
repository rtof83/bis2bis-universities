const app = require('../app/server');
const checkRoute = require('../middlewares/checkRoute');

const Config = require('../models/Config');

const getAll = (route, model) => {
  app.get(route, checkRoute, async (req, res) => {
    try {
      let result;
      let query = {};

      if (req.query.country || req.query.name || req.query.page) {

        if (req.query.country) query.country = req.query.country;
        if (req.query.name) query.name = { $regex: req.query.name, "$options": "i" };

        const perPageConfig = await Config.find({}, { _id: 0, perPage: 1 });
        
        const perPage = perPageConfig[0].perPage;
        const total = await model.count(query);
        const pages = Math.ceil(total / perPage);
        const pageNumber = !req.query.page ? 1 : req.query.page;
        const startFrom = (pageNumber - 1) * perPage;

        if (pageNumber > 0 && pageNumber <= pages) {
            result = await model.find(query)
              .sort('name')
              .skip(startFrom)
              .limit(perPage)
              .exec();
    
            // adding pagination to array
            result.push({ page: parseInt(pageNumber), from: pages });
          }
        } else {
          // GET ALL
          result = await model.find();
        };

      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  });
};

module.exports = getAll;
