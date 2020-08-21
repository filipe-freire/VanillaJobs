'use strict';

const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  title: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },

  description: {
    type: String,
    required: true
  },

  tasks: {
    type: [],
    minlength: 1,
    required: true
  },

  requirements: {
    type: [],
    required: true
  },

  seniority: {
    type: String,
    required: true
  },

  tech: {
    type: [],
    required: true
  }
});

module.exports = mongoose.model('Job-post', schema);
