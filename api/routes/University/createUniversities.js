import express from 'express';
import axios from 'axios';
import University from '../../models/University.js';
import Create from '../../models/Create.js';

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
  }

  res.status(201).json({ message: 'Created!' });
})

export default createUniversities;
