const axios = require('axios');

const University = require('../models/University.js');
const Config = require('../models/Config.js');
const Log = require('../models/Log.js');

const createUniversities = async (res) => {
  try {
    const create = await Config.findOne({}, { _id: 0, url: 1, countries: 1 });

    // create universities list
    const urlList = [];
    for (let i = 0; i < create.countries.length; i++)
      urlList.push(axios.get(create.url + create.countries[i]));

    await Promise.all(urlList)
      .then(async result => {
        // delete collection
        await University.deleteMany();

        // prepare universities list
        const uniList = []; 
        result.forEach(uni => {
          uni.data.forEach(item => uniList.push(item))
        });

        // insert universities list
        await University.insertMany(uniList);

        // success log
        await Log.create({ lastUpdate: new Date(), message: 'list updated successfully' });

        console.log('universities list created!');
        if (res) res.status(201).json({ message: 'created!' });
      });
  } catch (error) {
      //log error
      await Log.create({ lastUpdate: new Date(), message: error.message });

      console.log(error);
      if (res) res.status(500).json({ error: error.message });
  };
};

module.exports = createUniversities;
