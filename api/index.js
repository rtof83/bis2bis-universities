// config inicial
import express from 'express';
import cors from 'cors';
import app from './database/conn.js';

app.use(express.json());
app.use(cors());

// rotas da API

import universityRoutes from './routes/universityRoutes.js';
app.use('/universities', universityRoutes);

app.get('/', (_, res) => {
  res.json({ message: 'OK!' });
})
