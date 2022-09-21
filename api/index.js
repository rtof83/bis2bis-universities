// config inicial
import express from 'express';
import cors from 'cors';
import app from './database/conn.js';


// rotas da API
import createUniversities from './routes/University/createUniversities.js';
import deleteUniversity from './routes/University/deleteUniversity.js';
import getUniversities from './routes/University/getUniversities.js';
import getUniversityById from './routes/University/getUniversityById.js';
import postUniversity from './routes/University/postUniversity.js';
import updateUniversity from './routes/University/updateUniversity.js';
import getCountries from './routes/University/getCountries.js';

// middlewares
import checkUniversity from './middlewares/checkUniversity.js';

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

// app.get('/', (_, res) => {
//   res.json({ message: 'OK!' });
// });
