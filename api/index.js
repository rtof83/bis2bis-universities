// ====== environment variables ======
require('dotenv').config();


// ============ database ============
require('./database/conn');


// ========= initial configs =========
require('./services/initialConfig')();
require('./services/initialUser')();
require('./services/initialGroup')();
require('./services/initialUniversities')();
require('./services/updateHour')();


// ========= standard routes =========
const models = require('./models');
const methods = require('./methods');
const routes = [ '/universities', '/users', '/groups' ];

for (let i = 0; i < routes.length; i++) {
  // for each standard method
  for (let j = 0; j < methods.length; j++) {
    methods[j](routes[i], models[i]);
  };
};


// ========== custom routes ==========

// login to sign token
require('./routes/login/login')('/login');

// validate access
require('./routes/login/validate')('/validate');

// create universities list
require('./routes/universities/createUniList')('/create');

// get countries
require('./routes/universities/getCountries')('/countries');

// get config
require('./routes/config/getConfig.js')('/config');

// update config
require('./routes/config/updateConfig.js')('/config/:id');

// get and delete log
require('./routes/log/getLog')('/log');
require('./routes/log/deleteLog')('/log');
