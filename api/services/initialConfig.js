const Config = require('../models/Config.js');

const initialConfig = async () => {
  try {
    const config = await Config.find();

    if (!config.length) {
      await Config.create({ url: process.env.URL_CONFIG,
                            countries: process.env.COUNTRIES_CONFIG.split(", "),
                            perPage: process.env.PER_PAGE,
                            timeOut: process.env.SECRET_TIMEOUT });

      console.log('initial config created...');
    };
  } catch (error) {
    console.log(error);
  };
};

module.exports = initialConfig;
