const getAll = require('./getAll');
const getById = require('./getById');
const postRecord = require('./postRecord');
const putRecord = require('./putRecord');
const deleteRecord = require('./deleteRecord');

module.exports = [ getAll, getById, postRecord, putRecord, deleteRecord ];
