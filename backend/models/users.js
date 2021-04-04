const mongoose = require('mongoose');
const unique = require('mongoose-unique-validator');


//schema for the users in the database
const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true},
  isActive: {type: Boolean, default: true}
});

//ensures that there cant be 2 accounts with the same email
userSchema.plugin(unique);

//defining the name for the model & the schema you want to use
module.exports = mongoose.model('User', userSchema);
