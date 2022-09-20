import express from 'express';
import University from '../../models/University.js';

const updateUniversity = express.Router();

updateUniversity.put('/:id', async (req, res) => {
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
});

export default updateUniversity;
