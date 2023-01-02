const app = require('./app/server');

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
require('./routes/login')('/login');

// validate access
require('./routes/validate')('/validate');

// create universities list
require('./routes/postUniversities')('/create');

// get countries
require('./routes/getCountries.js')('/countries');

// get config
require('./routes/getConfig.js')('/config');

// update config
require('./routes/updateConfig.js')('/config/:id');

// get and delete log
require('./routes/getLog')('/log');
require('./routes/deleteLog')('/log');


// ========== listening ==========
app.listen(process.env.PORT, () => 
    console.log(`server listening on port ${process.env.PORT}...`));
