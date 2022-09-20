import express from 'express';
import axios from 'axios';
import University from '../models/University.js';
import createUniversities from '../createUniversities.js';

const router = express.Router();

// CREATE universities
router.post('/create', async (_, res) => {
  await University.deleteMany();

  for (let i = 0; i < createUniversities.countries.length; i++) {
    await axios.get(createUniversities.url + createUniversities.countries[i])
            .then(({ data }) => {
              data.forEach(async uni => {
                await University.create(uni);
              });
            })
            .catch(error => res.status(500).json({ erro: error }));
  }

  res.status(201).json({ message: 'Created!' });
})

// POST university
router.post('/', async (req, res) => {
  const university = req.body;

  try {
    await University.create(university);
    res.status(201).json({ message: 'Record inserted successfully!' });
  } catch (error) {
    res.status(500).json({ erro: error });
  }
})

// GET ALL universities or by country
router.get('/', async (req, res) => {
  try {
    const universities = req.query.country ? await University.find({ country: req.query.country }) : await University.find();

    res.status(200).json(universities);
  } catch (error) {
    res.status(500).json({ erro: error });
  }
})


// testing pagination
router.get('/page', async (_, res) => {
  try {
    console.log(await University.count());
    const universities = await University.find()
    .sort('country')
      .skip(0)
      .limit(20)
      .exec();;

    res.status(200).json(universities);
  } catch (error) {
    res.status(500).json({ erro: error });
  }
})
// testing pagination


// DELETE university
router.delete('/:id', async (req, res) => {
  const id = req.params.id;
  const university = await University.findOne({ _id: id });

  if (!university) {
    res.status(422).json({ message: 'Record not found!' });
    return
  }

  try {
    await University.deleteOne({ _id: id });

    res.status(200).json({ message: 'Record deleted successfully!' });
  } catch (error) {
    res.status(500).json({ erro: error });
  }
})

// GET university by _id
router.get('/:id', async (req, res) => {
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
})

// UPDATE university
router.put('/:id', async (req, res) => {
  const id = req.params.id;
  const university = req.body;

  try {
    const updateUniversity = await University.updateOne({ _id: id }, university);

    if (updateUniversity.matchedCount === 0) {
      res.status(422).json({ message: 'Record not found!' });
      return
    }

    res.status(200).json(updateUniversity);
  } catch (error) {
    res.status(500).json({ erro: error });
  }
})

export default router;
