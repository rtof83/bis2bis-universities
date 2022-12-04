const express = require('express');
const University = require('../../models/University.js');

// require('dotenv').config();

const getUniversities = express.Router();

getUniversities.get('/', async (req, res) => {
  try {
    let universities;
    let query = {};

    if (req.query.country || req.query.name || req.query.page) {

      if (req.query.country) query.country = req.query.country;
      if (req.query.name) query.name = { $regex: req.query.name, "$options": "i" };

      const perPage = parseInt(process.env.PER_PAGE);
      const total = await University.count(query);
      const pages = Math.ceil(total / perPage);
      const pageNumber = !req.query.page ? 1 : req.query.page;
      const startFrom = (pageNumber - 1) * perPage;

      if (pageNumber > 0 && pageNumber <= pages) {
        universities = await University.find(query)
          .sort('country')
          .skip(startFrom)
          .limit(perPage)
          .exec();

        // adding pagination to array
        universities.push({ page: parseInt(pageNumber), from: pages });
      }
    } else {
      // GET ALL
      universities = await University.find();
    };

    res.status(200).json(universities);
  } catch (error) {
    res.status(500).json({ erro: error });
  };
});

module.exports = getUniversities;
