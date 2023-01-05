const mongoose = require('mongoose');

const Config = require('../../models/Config');
const Group = require('../../models/Group');
const Log = require('../../models/Log');
const University = require('../../models/University');
const User = require('../../models/User');

require('dotenv').config();

const conn = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_CLUSTER}.${process.env.DB_URL}/${process.env.DB_NAME}_test?retryWrites=true&w=majority`;



/* Connecting to the database before each test. */
beforeEach(async () => {
  await mongoose.connect(conn);

  // ========= initial configs =========
  // await require('../services/initialConfig')();
  // await require('../services/initialUser')();
  // await require('../services/initialGroup')();
});
  
/* Closing database connection after each test. */
afterEach(async () => {
  // await mongoose.connection.dropDatabase();

  await mongoose.connection.close();
});

afterAll(async () => {
  await mongoose.connect(conn);

  await Log.deleteMany();
  await Config.deleteMany();
  await User.deleteMany();
  await Group.deleteMany();
  await University.deleteMany();

  await mongoose.connection.close();
});
