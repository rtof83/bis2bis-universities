const getConfig = require('express').Router();
const Create = require('../models/Create.js');

getConfig.get('/', (_, res) => {
    try {
        if (!Create)
          res.status(422).json({ message: 'Configuration not found!' });
    
        res.status(200).json(Create);
      } catch (error) {
        res.status(500).json({ erro: error });
      };
});

module.exports = getConfig;
