import express from 'express';
import University from '../../models/University.js';

const getUniversityById = express.Router();

getUniversityById.get('/:id', async (req, res) => {
  try {
    const university = await University.findOne({ _id: req.params.id });

    if (!university) {
      res.status(422).json({ message: 'Record not found!' });
      return
    }

    res.status(200).json(university);
  } catch (error) {
    res.status(500).json({ erro: error });
  }
});

export default getUniversityById;
