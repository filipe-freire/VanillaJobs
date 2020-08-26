'use strict';

const { Router } = require('express');
const jobApplicationRouter = new Router();
const JobApplication = require('../models/jobApplication');
const nodemailer = require('nodemailer');
const transport = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.NODEMAILER_EMAIL,
    pass: process.env.NODEMAILER_PASSWORD
  }
});

jobApplicationRouter.get('/:id', async (req, res, next) => {
  const jobId = req.params.id;
  try {
    const jobApplications = await JobApplication.find({ jobId });
    console.log(jobApplications.length);
    res.json({ applicants: jobApplications });
  } catch (error) {
    next(error);
  }
});

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
    transport.sendMail({
      from: process.env.NODEMAILER_EMAIL,
      to: candidateEmail,
      subject: 'Click the link to activate your account!',
      html: `<html>  
          <head>
          <title>Welcome to BandTracker</title>  
          <meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1">  
          </head>  
          <style>  
          body  {font-family:arial;font-size: 9pt; background-color: orange }  
           </style>
          <body bgcolor="#FFFFFF" text="#000000">  
          <h1> Application submitted Successfully! </h1>
          <h3> Thank you for choosing Vanilla Jobs!</h3>
          <p>Your application is on the way, please be patient while we take care of sending your information to the company. You'll be contacted in no time! Good luck!</p>
          </body>
          </html>`
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

module.exports = jobApplicationRouter;
