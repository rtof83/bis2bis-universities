const mongoose = require('mongoose');

const conn = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_CLUSTER}.${process.env.DB_URL}/${process.env.DB_NAME}?retryWrites=true&w=majority`;

mongoose.connect(conn)
    .then(() => {
        console.log('DB connected...')
    })
    .catch((error) => console.log(error));
