const request = require('supertest');
const mongoose = require('mongoose');

const Config = require('../models/Config');
const Group = require('../models/Group');
const User = require('../models/User');

// database connection
const conn = require('./database/dbConnTest');

const { initialConfig,
        initialUser,
        initialGroupAdmin } = require('./database/dbInitialTest');

const getUsers = require('../methods/getAll')('/users', User);
const getUserById = require('../methods/getById')('/users', User);
const createUser = require('../methods/createRecord')('/users', User);
const deleteUser = require('../methods/deleteRecord')('/users', User);
const updateUser = require('../methods/updateRecord')('/users', User);
const login = require('../routes/login/login')('/login');

// create admin, config and group from dbTest
beforeAll(async () => {
  await mongoose.connect(conn);

  await Config.create(initialConfig);
  await Group.create(initialGroupAdmin);

  await User.insertMany([ initialUser,
                          { name: 'user_to_compare',
                            email: 'user_compare@email.com',
                            password: 'pass_compare',
                            access: 'admin'
                          },
                          { name: 'user_to_delete',
                            email: 'admin_delete@email.com',
                            password: 'pass_delete',
                            access: 'admin'
                          },
                          { name: 'user_to_update',
                            email: 'admin_update@email.com',
                            password: 'pass_update',
                            access: 'admin'
                          }
                        ]);
  
  await mongoose.connection.close();
});

// clear collections
afterAll(async () => {
  await mongoose.connect(conn);

  await Config.deleteMany();
  await User.deleteMany();
  await Group.deleteMany();

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

describe('Test User Endpoint', () => {

  // ========================= test 01 =========================
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

  // ========================= test 02 =========================
  it('should get user by id', async () => {
    const user = await User.findOne({ access: 'admin' });

    const userById = await request(getUserById).get(`/users/${user._id}`);

    expect(userById.statusCode).toEqual(200);
    expect(userById.body).toHaveProperty('_id');
  });

  // ========================= test 03 =========================
  it('should create user', async () => {
    const access = await request(login)
                    .post('/login')
                    .send({ name: 'admin', password: 'admin' });

    const newUser = await request(createUser)
                            .post('/users')
                            .send({ name: 'user_new',
                                    email: 'user_new@email.com',
                                    password: 'pass_new',
                                    access: 'admin'
                                  })
                            .set('Authorization', `Bearer ${access.body.token}`);

    expect(newUser.statusCode).toEqual(201);
  });

  // ========================= test 04 =========================
  it('should return error when create same user', async () => {
    const access = await request(login)
                    .post('/login')
                    .send({ name: 'admin', password: 'admin' });

    // same record (name)
    const sameUser = await request(createUser)
                            .post('/users')
                            .send({ name: 'user_to_compare',
                                    email: 'admin_test@email.com',
                                    password: 'pass_test',
                                    access: 'admin'
                                  })
                            .set('Authorization', `Bearer ${access.body.token}`);

    expect(sameUser.statusCode).toEqual(409);
  });

  // ========================= test 05 =========================
  it('should update user', async () => {
    const access = await request(login)
                    .post('/login')
                    .send({ name: 'admin', password: 'admin' });

    const user = await User.findOne({ name: 'user_to_update' });

    const updatedUser = await request(updateUser)
                               .put(`/users/${user._id}`)
                               .send({ name: 'user_updated' })
                               .set('Authorization', `Bearer ${access.body.token}`);

      expect(updatedUser.statusCode).toEqual(200);
  });

  // ========================= test 06 =========================
  it('should delete user', async () => {
    const access = await request(login)
                    .post('/login')
                    .send({ name: 'admin', password: 'admin' });

    const user = await User.findOne({ name: 'user_to_delete' });

    const deletedUser = await request(deleteUser)
                               .delete(`/users/${user._id}`)
                               .set('Authorization', `Bearer ${access.body.token}`);

    expect(deletedUser.statusCode).toEqual(200);
  });
});
