// exports standard methods
const getAll = require('./getAll');
const getById = require('./getById');
const createRecord = require('./createRecord');
const updateRecord = require('./updateRecord');
const deleteRecord = require('./deleteRecord');

module.exports = [ getAll, getById, createRecord, updateRecord, deleteRecord ];
