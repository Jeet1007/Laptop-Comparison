const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: false
  },
  favorites: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Laptop'
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Add username, hash and salt fields to schema
UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', UserSchema);