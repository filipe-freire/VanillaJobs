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
    required: true,
    enum: ['Junior', 'Mid', 'Senior']
  },

  tech: [
    {
      type: String,
      required: true,
      enum: [
        'HTML',
        'CSS',
        'NodeJS',
        'React',
        'VueJS',
        'AngularJS',
        'Python',
        'Swift',
        'MongoDB',
        'Java',
        'SQL',
        'GraphQL',
        'AWS',
        'Git',
        'Flask',
        'Ruby',
        'Express',
        'Javascript',
        'Bootstrap',
        'SASS',
        'PHP',
        '.NET',
        'C#',
        'C++'
      ]
    }
  ],

  category: {
    type: String,
    required: true,
    enum: ['Frontend', 'Backend', 'Fullstack']
  }
});

module.exports = mongoose.model('Job-post', schema);
