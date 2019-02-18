const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// creates a schema
var userSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true }
});

module.exports = userSchema;
