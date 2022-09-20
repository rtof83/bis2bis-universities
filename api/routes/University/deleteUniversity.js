import express from 'express';
import University from '../../models/University.js';

const deleteUniversity = express.Router();

deleteUniversity.delete('/:id', async (req, res) => {
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
});

export default deleteUniversity;
