const request = require('supertest');

const Config = require('../models/Config');
const Group = require('../models/Group');
const User = require('../models/User');

// database connection
require('./database/dbConnTest');
const { initialConfig, initialUser, initialGroupAdmin, initialUniversity } = require('./database/dbInitialTest');

const getUsers = require('../methods/getAll')('/users', User);
const getUserById = require('../methods/getById')('/users', User);
const createUser = require('../methods/createRecord')('/users', User);
const deleteUser = require('../methods/deleteRecord')('/users', User);
const updateUser = require('../methods/updateRecord')('/users', User);
const login = require('../routes/login')('/login');

describe('Test User Endpoint', () => {
  // initial
  it('create admin, config and group from dbTest', async () => {
    try {
      await User.create(initialUser);
      await Config.create(initialConfig);
      await Group.create(initialGroupAdmin);
    } catch (error) {
      console.log(error);  
    };
  });

  // // test 01
  // it('should get countries list', async () => {
  //   const countries = await request(getCountries).get('/countries');

  //   expect(countries.statusCode).toEqual(200);
  // });

  // test 02
  it('should get users list', async () => {
    const access = await request(login)
                  .post('/login')
                  .send({ name: 'admin', password: 'admin' });

    const users = await request(getUsers)
                    .get('/users')
                    .set('Authorization', `Bearer ${access.body.token}`);

    expect(users.statusCode).toEqual(200);
    expect(users.body.length).toBeGreaterThan(0);
  });

  // test 03
  it('should get user by id', async () => {
    const user = await User.findOne({ access: 'admin' });

    const userById = await request(getUserById).get(`/users/${user._id}`);

    expect(userById.statusCode).toEqual(200);
    expect(userById.body).toHaveProperty('_id');
  });

  // // test 04
  // it('should create university', async () => {
  //   const access = await request(login)
  //                   .post('/login')
  //                   .send({ name: 'admin', password: 'admin' });

  //   const newUniversity = await request(createUniversity)
  //                           .post('/universities')
  //                           .send({ alpha_two_code: 'TT',
  //                                   web_pages: ['page1@page.com', 'page2@page.com', '000'],
  //                                   name: 'University Test',
  //                                   country: 'Test',
  //                                   domains: ['uni.br', 'uni.org', 'dddd'],
  //                                   'state-province': 'AA'
  //                                 })
  //                           .set('Authorization', `Bearer ${access.body.token}`);

  //   expect(newUniversity.statusCode).toEqual(201);
  // });

  // // test 05
  // it('should return error when create same university', async () => {
  //   const access = await request(login)
  //                   .post('/login')
  //                   .send({ name: 'admin', password: 'admin' });

  //   // first record
  //   await request(createUniversity)
  //     .post('/universities')
  //     .send({ alpha_two_code: 'TT',
  //             web_pages: ['page1@page.com', 'page2@page.com', '000'],
  //             name: 'University Test',
  //             country: 'Test',
  //             domains: ['uni.br', 'uni.org', 'dddd'],
  //             'state-province': 'AA'
  //           })
  //     .set('Authorization', `Bearer ${access.body.token}`);

  //   // same record (name and country)
  //   const sameUniversity = await request(createUniversity)
  //                           .post('/universities')
  //                           .send({ alpha_two_code: 'TT',
  //                                   web_pages: ['page1@page.com', 'page2@page.com', '000'],
  //                                   name: 'University Test',
  //                                   country: 'Test',
  //                                   domains: ['uni.br', 'uni.org', 'dddd'],
  //                                   'state-province': 'AA'
  //                                 })
  //                           .set('Authorization', `Bearer ${access.body.token}`);

  //   expect(sameUniversity.statusCode).toEqual(409);
  // });

  // // test 06
  // it('should update university', async () => {
  //   const access = await request(login)
  //                   .post('/login')
  //                   .send({ name: 'admin', password: 'admin' });

  //   const university = await University.findOne();

  //   const updatedUniversity = await request(updateUniversity)
  //                              .put(`/universities/${university._id}`)
  //                              .send({ name: 'University Updated' })
  //                              .set('Authorization', `Bearer ${access.body.token}`);

  //   expect(updatedUniversity.statusCode).toEqual(200);
  // });

  // // test 07
  // it('should delete university', async () => {
  //   const access = await request(login)
  //                   .post('/login')
  //                   .send({ name: 'admin', password: 'admin' });

  //   const university = await University.findOne();

  //   const deletedUniversity = await request(deleteUniversity)
  //                              .put(`/universities/${university._id}`)
  //                              .send({ name: 'University Updated' })
  //                              .set('Authorization', `Bearer ${access.body.token}`);

  //   expect(deletedUniversity.statusCode).toEqual(200);
  // });


});
