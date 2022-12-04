const deleteUniversity = require('express').Router();
const University = require('../../models/University.js');

deleteUniversity.delete('/:id', async (req, res) => {
  const id = req.params.id;
  const university = await University.findOne({ _id: id });

  if (!university)
    return res.status(422).json({ message: 'Record not found!' });

  try {
    await University.deleteOne({ _id: id });

    res.status(200).json({ message: 'Record deleted successfully!' });
  } catch (error) {
    res.status(500).json({ erro: error });
  };
});

module.exports = deleteUniversity;
