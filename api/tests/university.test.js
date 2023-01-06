const request = require('supertest');
const mongoose = require('mongoose');

const Config = require('../models/Config');
const Group = require('../models/Group');
const University = require('../models/University');
const User = require('../models/User');

// database connection
const conn = require('./database/dbConnTest');

const { initialConfig,
        initialUser,
        initialGroupAdmin,
        initialUniversity } = require('./database/dbInitialTest');

const getCountries = require('../routes/getCountries')('/countries');
const getUniversities = require('../methods/getAll')('/universities', University);
const getUniversityById = require('../methods/getById')('/universities', University);
const createUniversity = require('../methods/createRecord')('/universities', University);
const deleteUniversity = require('../methods/deleteRecord')('/universities', University);
const updateUniversity = require('../methods/updateRecord')('/universities', University);
const login = require('../routes/login')('/login');

// create admin, config, universities and group from dbTest
beforeAll(async () => {
  await mongoose.connect(conn);

  await User.create(initialUser);
  await Config.create(initialConfig);
  await Group.create(initialGroupAdmin);

  await University.insertMany([ initialUniversity,
                              { alpha_two_code: 'DD',
                                web_pages: [ 'page1@page.com', 'page2@page.com' ],
                                name: 'University To Delete',
                                country: 'Test Delete',
                                domains: [ 'uni.br', 'uni.org' ],
                                'state-province': 'AA'
                              },
                              { alpha_two_code: 'UU',
                                web_pages: [ 'page1@page.com', 'page2@page.com' ],
                                name: 'University To Update',
                                country: 'Test Update',
                                domains: [ 'uni.br', 'uni.org' ],
                                'state-province': 'AA'
                              }]);

  await mongoose.connection.close();
});

// clear collections
afterAll(async () => {
  await mongoose.connect(conn);

  await Config.deleteMany();
  await User.deleteMany();
  await Group.deleteMany();
  await University.deleteMany();

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

describe('Test University Endpoint', () => {

  // ========================= test 01 =========================
  it('should get countries list', async () => {
    const countries = await request(getCountries).get('/countries');

    expect(countries.statusCode).toEqual(200);
  });

  // ========================= test 02 =========================
  it('should get universities list', async () => {
    const universities = await request(getUniversities).get('/universities');

    expect(universities.statusCode).toEqual(200);
    expect(universities.body.length).toBeGreaterThan(0);
  });

  // ========================= test 03 =========================
  it('should get university by id', async () => {
    const university = await University.findOne({ name: 'University' });

    const universityById = await request(getUniversityById).get(`/universities/${university._id}`);

    expect(universityById.statusCode).toEqual(200);
    expect(universityById.body).toHaveProperty('_id');
  });

  // ========================= test 04 =========================
  it('should create university', async () => {
    const access = await request(login)
                    .post('/login')
                    .send({ name: 'admin', password: 'admin' });

    const newUniversity = await request(createUniversity)
                            .post('/universities')
                            .send({ alpha_two_code: 'TT',
                                    web_pages: [ 'page1@page.com', 'page2@page.com' ],
                                    name: 'University Test',
                                    country: 'Test',
                                    domains: [ 'uni.br', 'uni.org' ],
                                    'state-province': 'AA'
                                  })
                            .set('Authorization', `Bearer ${access.body.token}`);

    expect(newUniversity.statusCode).toEqual(201);
  });

  // ========================= test 05 =========================
  it('should return error when create same university', async () => {
    const access = await request(login)
                    .post('/login')
                    .send({ name: 'admin', password: 'admin' });

    // same record from dbTest (name and country)
    const sameUniversity = await request(createUniversity)
                            .post('/universities')
                            .send({ alpha_two_code: 'TT',
                                    web_pages: ['page1@page.com', 'page2@page.com', '000'],
                                    name: 'University',
                                    country: 'Test',
                                    domains: [ 'uni.br', 'uni.org' ],
                                    'state-province': 'AA'
                                  })
                            .set('Authorization', `Bearer ${access.body.token}`);

    expect(sameUniversity.statusCode).toEqual(409);
  });

  // ========================= test 06 =========================
  it('should update university', async () => {
    const access = await request(login)
                    .post('/login')
                    .send({ name: 'admin', password: 'admin' });

    const university = await University.findOne({ name: 'University To Update' });

    const updatedUniversity = await request(updateUniversity)
                               .put(`/universities/${university._id}`)
                               .send({ name: 'University Updated' })
                               .set('Authorization', `Bearer ${access.body.token}`);

    expect(updatedUniversity.statusCode).toEqual(200);
  });

  // ========================= test 07 =========================
  it('should delete university', async () => {
    const access = await request(login)
                    .post('/login')
                    .send({ name: 'admin', password: 'admin' });

    const university = await University.findOne({ name: 'University To Delete' });

    const deletedUniversity = await request(deleteUniversity)
                               .delete(`/universities/${university._id}`)
                               .set('Authorization', `Bearer ${access.body.token}`);

    expect(deletedUniversity.statusCode).toEqual(200);
  });
});
