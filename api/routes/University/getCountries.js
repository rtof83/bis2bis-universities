const express = require('express');
const University = require('../../models/University.js');

const getCountries = express.Router();

getCountries.get('/countries', async (_, res) => {
  try {
    const countries = await University.aggregate([{$group: { _id: '$country' }}, {$sort: { _id: 1 }}]);

    if (!countries)
      return res.status(422).json({ message: 'Record not found!' });

    res.status(200).json(countries);
  } catch (error) {
    res.status(500).json({ erro: error });
  };
});

module.exports = getCountries;
