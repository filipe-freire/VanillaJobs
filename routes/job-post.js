'use strict';

const { Router } = require('express');
const jobPostRouter = new Router();

const JobPost = require('./../models/job-post');

const authenticationGuard = require('./../middleware/route-authentication-guard');

jobPostRouter.post('/', authenticationGuard, (req, res, next) => {
  console.log(req.body);
  const {
    title,
    location,
    description,
    tasks,
    requirements,
    seniority,
    tech
  } = req.body;

  JobPost.create({
    creator: req.user._id,
    title,
    location,
    description,
    tasks,
    requirements,
    seniority,
    tech
  })
    .then(post => {
      console.log('this is the job post to be sent in json', post);
      return res.json({ post });
    })
    .catch(err => {
      next(err);
    });
});

jobPostRouter.patch('/:id', authenticationGuard, (req, res, next) => {
  const id = req.params.id;

  const {
    title,
    location,
    description,
    tasks,
    requirements,
    seniority,
    tech
  } = req.body;

  JobPost.findOneAndUpdate(
    { _id: id, creator: req.user._id },
    {
      title,
      location,
      description,
      tasks,
      requirements,
      seniority,
      tech
    }
  )
    .then(post => {
      res.json({ post });
    })
    .catch(err => {
      next(err);
    });
});

module.exports = jobPostRouter;
