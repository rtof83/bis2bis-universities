// const request = require('supertest');

// const Config = require('../models/Config');
// const Group = require('../models/Group');
// const User = require('../models/User');

// // database connection
// require('./database/dbConnTest');
// const { initialConfig, initialUser, initialGroupAdmin } = require('./database/dbInitialTest');

// const getConfig = require('../routes/getConfig')('/config');
// const updateConfig = require('../routes/updateConfig')('/config/:id');
// const login = require('../routes/login')('/login');

// describe('Test Config Endpoint', () => {
//   // initial
//   it('create admin, config and group from dbTest', async () => {
//     try {
//       await User.create(initialUser);
//       await Config.create(initialConfig);
//       await Group.create(initialGroupAdmin);
//     } catch (error) {
//       console.log(error);  
//     };
//   });

//   // test 01
//   it('should get standard config', async () => {
//     const config = await request(getConfig).get('/config');

//     expect(config.statusCode).toEqual(200);
//     expect(config.body).toHaveProperty('url');
//   });

//   // test 02
//   it('should get complete config', async () => {
//     // admin access login
//     const access = await request(login)
//                      .post('/login')
//                      .send({ name: 'admin', password: 'admin' });
    
//     const config = await request(getConfig)
//                      .get('/config')
//                      .set('Authorization', `Bearer ${access.body.token}`);

//     expect(config.statusCode).toEqual(200);
//     expect(config.body).toHaveProperty('timeOut');
//     expect(config.body).toHaveProperty('countries');
//   });

//   // test 03
//   it('should update config', async () => {
//     // admin access login
//     const access = await request(login)
//                     .post('/login')
//                     .send({ name: 'admin', password: 'admin' });

//     const config = await request(getConfig)
//                     .get('/config')
//                     .set('Authorization', `Bearer ${access.body.token}`);

//     const configPerPage = await request(updateConfig)
//                             .put(`/config/${config.body._id}`)
//                             .send({ perPage: 10 })
//                             .set('Authorization', `Bearer ${access.body.token}`);

//     expect(configPerPage.statusCode).toEqual(200);
//   });
// });
