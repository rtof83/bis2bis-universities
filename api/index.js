// initial config
const express = require('express');
const cors = require('cors');
const app = require('./database/conn.js');

// routes
const createUniversities = require('./routes/University/createUniversities.js');
const deleteUniversity = require('./routes/University/deleteUniversity.js');
const getUniversities = require('./routes/University/getUniversities.js');
const getUniversityById = require('./routes/University/getUniversityById.js');
const postUniversity = require('./routes/University/postUniversity.js');
const updateUniversity = require('./routes/University/updateUniversity.js');
const getCountries = require('./routes/University/getCountries.js');

const getConfig = require('./routes/Config/getConfig.js');

// middlewares
const checkUniversity = require('./middlewares/checkUniversity.js');

app.use(express.json());
app.use(cors());

const routes = [ createUniversities,
                 deleteUniversity,
                 getCountries,
                 getUniversities,
                 getUniversityById,
                 updateUniversity ];

app.use('/universities', routes);
app.use('/universities', checkUniversity, postUniversity);

app.use('/config', getConfig);
