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
    type: String,
    default:
      'https://res.cloudinary.com/dlfxinw9v/image/upload/v1598346625/default-logo-vanilla-jobs_jdt2uq.png'
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
