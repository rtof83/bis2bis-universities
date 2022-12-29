const Config = require('../models/Config.js');

const initialConfig = async () => {
  try {
    const config = await Config.find();

    if (!config.length) {
      await Config.create({ url: process.env.URL_CONFIG,
                            countries: process.env.COUNTRIES_CONFIG.split(", "),
                            perPage: process.env.PER_PAGE,
                            updateHour: process.env.UPDATE_HOUR,
                            secret: process.env.SECRET,
                            secretTimeOut: process.env.SECRET_TIMEOUT });
    };
  } catch (error) {
    console.log(error);
  };
};

module.exports = initialConfig;
