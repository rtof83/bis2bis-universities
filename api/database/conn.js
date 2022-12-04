const mongoose = require('mongoose');
const express = require('express');
require('dotenv').config();

const conn = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_CLUSTER}.${process.env.DB_URL}/${process.env.DB_NAME}?retryWrites=true&w=majority`;

const app = express();
mongoose.connect(conn)
    .then(() => {
        console.log('DB connected...')
        app.listen(process.env.PORT)
    })
    .catch((err) => console.log(err));

module.exports = app;
