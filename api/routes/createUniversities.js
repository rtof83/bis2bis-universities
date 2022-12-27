const createUniversities = require('express').Router();
const axios = require('axios');

const University = require('../models/University.js');
const Create = require('../models/Create.js');
const Log = require('../models/Log.js');

createUniversities.post('/create', async (_, res) => {
  // create universities list
  const urlList = [];
  for (let i = 0; i < Create.countries.length; i++)
    urlList.push(axios.get(Create.url + Create.countries[i]));

  await Promise.all(urlList)
    .then(async (result) => {
      // delete all universities
      await University.deleteMany();

      // insert universities list
      result.forEach(async uni => {
        await University.create(uni.data);
      });

      // success log
      await Log.create({ lastUpdate: new Date(), message: 'list updated successfully' });

      res.status(201).json({ message: 'Created!' });
    })
    .catch(async (error) => {
      //log error
      await Log.create({ lastUpdate: new Date(), message: error });

      res.status(500).json({ error: error });
    });
});

module.exports = createUniversities;
