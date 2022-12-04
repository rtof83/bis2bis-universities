const updateUniversity = require('express').Router();
const University = require('../../models/University.js');

updateUniversity.put('/:id', async (req, res) => {
  const id = req.params.id;
  const university = req.body;

  try {
    const updateUniversity = await University.updateOne({ _id: id }, university);

    if (updateUniversity.matchedCount === 0)
      return res.status(422).json({ message: 'Record not found!' });

    res.status(200).json(updateUniversity);
  } catch (error) {
    res.status(500).json({ erro: error });
  };
});

module.exports = updateUniversity;
