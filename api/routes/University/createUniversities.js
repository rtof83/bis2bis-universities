const express = require('express');
const axios = require('axios');
const University = require('../../models/University.js');
const Create = require('../../models/Create.js');

const createUniversities = express.Router();

createUniversities.post('/create', async (_, res) => {
  await University.deleteMany();

  for (let i = 0; i < Create.countries.length; i++) {
    await axios.get(Create.url + Create.countries[i])
            .then(({ data }) => {
              data.forEach(async uni => {
                await University.create(uni);
              });
            })
            .catch(error => res.status(500).json({ erro: error }));
  };

  res.status(201).json({ message: 'Created!' });
});

module.exports = createUniversities;
