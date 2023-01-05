// const request = require('supertest');

// const Config = require('../models/Config');
// const Group = require('../models/Group');
// const University = require('../models/University');
// const User = require('../models/User');

// // database connection
// require('./database/dbConnTest');
// const { initialConfig, initialUser, initialGroupAdmin, initialUniversity } = require('./database/dbInitialTest');

// const getCountries = require('../routes/getCountries')('/countries');
// const getUniversities = require('../methods/getAll')('/universities', University);
// const getUniversityById = require('../methods/getById')('/universities', University);
// const createUniversity = require('../methods/createRecord')('/universities', University);
// const deleteUniversity = require('../methods/deleteRecord')('/universities', University);
// const updateUniversity = require('../methods/updateRecord')('/universities', University);
// const login = require('../routes/login')('/login');

// describe('Test University Endpoint', () => {
//   // initial
//   it('create admin, config, group and university from dbTest', async () => {
//     try {
//       await User.create(initialUser);
//       await Config.create(initialConfig);
//       await Group.create(initialGroupAdmin);
//       await University.create(initialUniversity);
//     } catch (error) {
//       console.log(error);  
//     };
//   });

//   // test 01
//   it('should get countries list', async () => {
//     const countries = await request(getCountries).get('/countries');

//     expect(countries.statusCode).toEqual(200);
//   });

//   // test 02
//   it('should get universities list', async () => {
//     const universities = await request(getUniversities).get('/universities');

//     expect(universities.statusCode).toEqual(200);
//     expect(universities.body.length).toBeGreaterThan(0);
//   });

//   // test 03
//   it('should get university by id', async () => {
//     const university = await University.findOne();

//     const universityById = await request(getUniversityById).get(`/universities/${university._id}`);

//     expect(universityById.statusCode).toEqual(200);
//     expect(universityById.body).toHaveProperty('_id');
//   });

//   // test 04
//   it('should create university', async () => {
//     const access = await request(login)
//                     .post('/login')
//                     .send({ name: 'admin', password: 'admin' });

//     const newUniversity = await request(createUniversity)
//                             .post('/universities')
//                             .send({ alpha_two_code: 'TT',
//                                     web_pages: ['page1@page.com', 'page2@page.com', '000'],
//                                     name: 'University Test',
//                                     country: 'Test',
//                                     domains: ['uni.br', 'uni.org', 'dddd'],
//                                     'state-province': 'AA'
//                                   })
//                             .set('Authorization', `Bearer ${access.body.token}`);

//     expect(newUniversity.statusCode).toEqual(201);
//   });

//   // test 05
//   it('should return error when create same university', async () => {
//     const access = await request(login)
//                     .post('/login')
//                     .send({ name: 'admin', password: 'admin' });

//     // first record
//     await request(createUniversity)
//       .post('/universities')
//       .send({ alpha_two_code: 'TT',
//               web_pages: ['page1@page.com', 'page2@page.com', '000'],
//               name: 'University Test',
//               country: 'Test',
//               domains: ['uni.br', 'uni.org', 'dddd'],
//               'state-province': 'AA'
//             })
//       .set('Authorization', `Bearer ${access.body.token}`);

//     // same record (name and country)
//     const sameUniversity = await request(createUniversity)
//                             .post('/universities')
//                             .send({ alpha_two_code: 'TT',
//                                     web_pages: ['page1@page.com', 'page2@page.com', '000'],
//                                     name: 'University Test',
//                                     country: 'Test',
//                                     domains: ['uni.br', 'uni.org', 'dddd'],
//                                     'state-province': 'AA'
//                                   })
//                             .set('Authorization', `Bearer ${access.body.token}`);

//     expect(sameUniversity.statusCode).toEqual(409);
//   });

//   // test 06
//   it('should update university', async () => {
//     const access = await request(login)
//                     .post('/login')
//                     .send({ name: 'admin', password: 'admin' });

//     const university = await University.findOne();

//     const updatedUniversity = await request(updateUniversity)
//                                .put(`/universities/${university._id}`)
//                                .send({ name: 'University Updated' })
//                                .set('Authorization', `Bearer ${access.body.token}`);

//     expect(updatedUniversity.statusCode).toEqual(200);
//   });

//   // test 07
//   it('should delete university', async () => {
//     const access = await request(login)
//                     .post('/login')
//                     .send({ name: 'admin', password: 'admin' });

//     const university = await University.findOne();

//     const deletedUniversity = await request(deleteUniversity)
//                                .put(`/universities/${university._id}`)
//                                .send({ name: 'University Updated' })
//                                .set('Authorization', `Bearer ${access.body.token}`);

//     expect(deletedUniversity.statusCode).toEqual(200);
//   });
// });
