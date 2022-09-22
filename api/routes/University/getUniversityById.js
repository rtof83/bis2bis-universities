const express = require('express');
const mongoose = require('mongoose');
const University = require('../../models/University.js');

const getUniversityById = express.Router();

getUniversityById.get('/:id', async (req, res) => {
  try {
    if (mongoose.isValidObjectId(req.params.id)) {
      const university = await University.findOne({ _id: req.params.id });

      if (!university)
        res.status(422).json({ message: 'Record not found!' });

      res.status(200).json(university);
    } else {
      res.status(400).json({ message: 'invalid id' })
    }
  } catch (error) {
    res.status(500).json({ erro: error });
  }
});

module.exports = getUniversityById;
