const request = require('supertest');
const mongoose = require('mongoose');

const User = require('../models/User');
const Log = require('../models/Log');
const Config = require('../models/Config');

// database connection
const conn = require('./database/dbConnTest');

const { initialUser,
        initialLog,
        initialConfig } = require('./database/dbInitialTest');

const login = require('../routes/login')('/login');
const getLog = require('../routes/getLog')('/log');
const deleteLog = require('../routes/deleteLog')('/log');

// create admin, config, log from dbTest
beforeAll(async () => {
    await mongoose.connect(conn);
  
    await User.create(initialUser);
    await Config.create(initialConfig);
    await Log.create(initialLog);
  
    await mongoose.connection.close();
  });
  
  // clear collections
  afterAll(async () => {
    await mongoose.connect(conn);
  
    await Config.deleteMany();
    await User.deleteMany();
    await Log.deleteMany();
  
    await mongoose.connection.close();
  });
  
  // Connecting to the database before each test
  beforeEach(async () => {
    await mongoose.connect(conn);
  });
      
  // Closing database connection after each test
  afterEach(async () => {
    await mongoose.connection.close();
  });

describe('Test Log Endpoint', () => {
 
  // ========================= test 01 =========================
  it('should get logs', async () => {
    // admin access login
    const access = await request(login)
                           .post('/login')
                           .send({ name: 'admin', password: 'admin' });

    const log = await request(getLog)
                        .get('/log')
                        .set('Authorization', `Bearer ${access.body.token}`);

    expect(log.statusCode).toEqual(200);
  });

  // ========================= test 02 =========================
  it('should delete logs', async () => {
    const access = await request(login)
                           .post('/login')
                           .send({ name: 'admin', password: 'admin' });
    
    const delLogs = await request(deleteLog)
                     .delete('/log')
                     .set('Authorization', `Bearer ${access.body.token}`);

    expect(delLogs.statusCode).toEqual(200);
  });
});
