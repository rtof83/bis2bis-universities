const app = require('../../app/server');

const University = require('../../models/University.js');

const getCountries = (route) => {
  return (
    app.get(route, async (_, res) => {
      try {
        const countries = await University.aggregate([{$group: { _id: '$country' }}, {$sort: { _id: 1 }}]);

        if (!countries)
          return res.status(404).json({ message: 'Record not found!' });

        res.status(200).json(countries);
      } catch (error) {
        res.status(500).json({ error: error });
      };
    })
  );
};

module.exports = getCountries;
