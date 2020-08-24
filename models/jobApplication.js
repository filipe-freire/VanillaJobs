'use strict';

const mongoose = require('mongoose');

const schema = new mongoose.Schema(
  {
    candidateName: {
      type: String,
      required: true,
      minlength: 3
    },
    candidateEmail: {
      type: String,
      required: true,
      minlength: 5
    },
    candidateLocation: {
      type: String
    },
    motivation: {
      type: String
    },
    resumeUpload: {
      type: String
    },
    linkedinUrl: {
      type: String
    },
    githubUrl: {
      type: String
    },
    photo: {
      type: String
    },
    jobId: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Job-application', schema);
