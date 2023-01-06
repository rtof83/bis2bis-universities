require('dotenv').config();

const conn = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_CLUSTER}.${process.env.DB_URL}/${process.env.DB_NAME}_test?retryWrites=true&w=majority`;

module.exports = conn;
