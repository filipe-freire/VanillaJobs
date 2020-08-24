'use strict';

const { Router } = require('express');
const jobApplicationRouter = new Router();
const JobApplication = require('../models/jobApplication');

jobApplicationRouter.post('/submitApplication', async (req, res, next) => {
  const {
    candidateName,
    candidateEmail,
    candidateLocation,
    motivation,
    resumeUpload,
    linkedinUrl,
    githubUrl,
    photo,
    jobId
  } = req.body;
  try {
    const jobApplication = await JobApplication.create({
      candidateName,
      candidateEmail,
      candidateLocation,
      motivation,
      resumeUpload,
      linkedinUrl,
      githubUrl,
      photo,
      jobId
    });
    res.json({
      jobApplication: {
        _id: jobApplication._id,
        candidateName: jobApplication.candidateName,
        candidateEmail: jobApplication.candidateEmail,
        candidateLocation: jobApplication.candidateLocation,
        motivation: jobApplication.motivation,
        resumeUpload: jobApplication.resumeUpload,
        linkedinUrl: jobApplication.linkedinUrl,
        githubUrl: jobApplication.githubUrl,
        photo: jobApplication.photo,
        jobId: jobApplication.jobId
      }
    });
  } catch (error) {
    next(error);
  }
});

// jobApplicationRouter.get('/', (req, res) => {
//   res.json({ type: 'success', data: { title: 'Application' } });
// });

module.exports = jobApplicationRouter;
