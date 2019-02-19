const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// creates a schema
var recordsSchema = new Schema({
    records: { type: Array }
});

module.exports = recordsSchema;
