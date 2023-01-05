// const request = require('supertest');

// const User = require('../models/User');
// const Log = require('../models/Log');
// const Config = require('../models/Config');

// // database connection
// require('./database/dbConnTest');
// const { initialUser, initialLog, initialConfig } = require('./database/dbInitialTest');

// const login = require('../routes/login')('/login');
// const getLog = require('../routes/getLog')('/log');
// const deleteLog = require('../routes/deleteLog')('/log');

// describe('Test Log Endpoint', () => {
//   // initial
//   it('create admin, log and config from dbTest', async () => {
//     try {
//       await Config.create(initialConfig);
//       await User.create(initialUser);
//       await Log.create(initialLog);
//     } catch (error) {
//       console.log(error);
//     };
//   });

//   // test 01
//   it('should get logs', async () => {
//     // admin access login
//     const access = await request(login)
//                            .post('/login')
//                            .send({ name: 'admin', password: 'admin' });

//     const log = await request(getLog)
//                         .get('/log')
//                         .set('Authorization', `Bearer ${access.body.token}`);

//     expect(log.statusCode).toEqual(200);
//   });

//   // test 02
//   it('should delete logs', async () => {
//     const access = await request(login)
//                            .post('/login')
//                            .send({ name: 'admin', password: 'admin' });
    
//     const delLogs = await request(deleteLog)
//                      .delete('/log')
//                      .set('Authorization', `Bearer ${access.body.token}`);

//     expect(delLogs.statusCode).toEqual(200);
//   });
// });
