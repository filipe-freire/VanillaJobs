'use strict';

const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  companyName: {
    type: String,
    trim: true
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true
  },
  passwordHashAndSalt: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('User', schema);
