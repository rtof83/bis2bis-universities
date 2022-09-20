import express from 'express';
import University from '../../models/University.js';

const getUniversities = express.Router();

getUniversities.get('/', async (req, res) => {
  try {
    let universities;

    if (req.query.country || req.query.page) {
      const query = req.query.country ? { country: req.query.country } : null;

      const perPage = 2;
      const total = await University.count(query);
      const pages = Math.ceil(total / perPage);
      const pageNumber = !req.query.page ? 1 : req.query.page;
      const startFrom = (pageNumber - 1) * perPage;

      // GET universities by country and/or pagination
      universities = await University.find(query);

      if (pageNumber > 0 && pageNumber <= pages) {
        universities = await University.find()
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
    }

    res.status(200).json(universities);
  } catch (error) {
    res.status(500).json({ erro: error });
  }
})

export default getUniversities;
