import University from '../models/University.js';

const checkUniversity = async (req, res, next) => {
  try {
    const university = await University.findOne({ country: req.body.country, name: req.body.name, 'state-province': req.body['state-province'] });

    if (!university)
      next();
    else
      res.status(409).json({ message: 'Record already exist in database!' });

  } catch (error) {
    res.status(500).json({ erro: error });
  }
};

export default checkUniversity;
