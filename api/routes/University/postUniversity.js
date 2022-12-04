const express = require('express');
const University = require('../../models/University.js');

const postUniversity = express.Router();

postUniversity.post('/', async (req, res) => {
  const university = req.body;
  
  try {
    await University.create(university);

    res.status(201).json({ message: 'Record inserted successfully!' });
  } catch (error) {
    res.status(500).json({ erro: error });
  };
});

module.exports = postUniversity;
