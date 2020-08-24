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
  },
  logo: {
    type: String
  },
  location: {
    type: String
  },
  foundedDate: {
    type: String
  },
  websiteUrl: {
    type: String
  },
  sizeInEmployees: {
    type: String
  },
  summary: {
    type: String
  }
});

module.exports = mongoose.model('User', schema);
