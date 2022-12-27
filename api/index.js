// initial config
const express = require('express');
const cors = require('cors');
const app = require('./database/conn.js');
const updateHour = require('./services/updateHour.js');

// university routes
// const createUniversities = require('./routes/University/createUniversities.js');
// const deleteUniversity = require('./routes/University/deleteUniversity.js');
// const getUniversities = require('./routes/University/getUniversities.js');
// const getUniversityById = require('./routes/University/getUniversityById.js');
// const postUniversity = require('./routes/University/postUniversity.js');
// const updateUniversity = require('./routes/University/updateUniversity.js');
// const getCountries = require('./routes/University/getCountries.js');

// user routes
// const getUsers = require('./routes/User/getUsers.js');
// const postUser = require('./routes/User/postUser.js');
// const updateUser = require('./routes/User/updateUser.js');
// const deleteUser = require('./routes/User/deleteUser.js');

// const getConfig = require('./routes/Config/getConfig.js');

// middlewares
// const checkUniversity = require('./middlewares/checkUniversity.js');

app.use(express.json());
app.use(cors());



// mount standard routes
const models = require('./models');
const methods = require('./methods');
const routes = [ '/universities', '/users' ];

for (let i = 0; i < routes.length; i++) {
  // for each method
  for (let j = 0; j < methods.length; j++) {
    methods[j](routes[i], models[i]);
  };
};

// ========== custom routes ==========

// login to sign token
require('./routes/login')('/login');

// validate access
require('./routes/validate')('/validate');



// const universityRoutes = [ createUniversities,
//                            deleteUniversity,
//                            getCountries,
//                            getUniversities,
//                            getUniversityById,
//                            updateUniversity ];

// const userRoutes = [ getUsers,
//                      postUser,
//                      updateUser,
//                      deleteUser

// ];

// app.use('/universities', universityRoutes);
// app.use('/universities', checkUniversity, postUniversity);

// app.use('/users', userRoutes);

// app.use('/config', getConfig);

// // update database based on config hour
// updateHour();
