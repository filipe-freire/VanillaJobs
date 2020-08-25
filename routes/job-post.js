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
    tech,
    category
  } = req.body;

  JobPost.create({
    creator: req.user._id,
    title,
    location,
    description,
    tasks,
    requirements,
    seniority,
    tech,
    category
  })
    .then(post => {
      console.log('this is the job post to be sent in json', post);
      return res.json({ post });
    })
    .catch(err => {
      next(err);
    });
});

jobPostRouter.get('/all', async (req, res, next) => {
  try {
    const jobPosts = await JobPost.find().populate('creator');

    if (jobPosts) {
      console.log(jobPosts);
      res.json({ jobPosts });
    } else {
      next();
    }
  } catch (err) {
    next(err);
  }
});

jobPostRouter.get('/:id', async (req, res, next) => {
  const id = req.params.id;

  try {
    const post = await JobPost.findById(id).populate('creator');
    if (post) {
      res.json({ post });
    } else {
      next();
    }
  } catch (err) {
    next(err);
  }
});

jobPostRouter.delete('/:id', authenticationGuard, (req, res, next) => {
  const id = req.params.id;

  JobPost.findOneAndDelete({ _id: id, creator: req.user._id })
    .then(() => res.json({}))
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
    tech,
    category
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
      tech,
      category
    }
  )
    .then(post => {
      res.json({ post });
    })
    .catch(err => {
      next(err);
    });
});

jobPostRouter.get('/creator/:id', async (req, res, next) => {
  const id = req.params.id;

  try {
    const jobPosts = await JobPost.find({ creator: id });
    if (jobPosts) {
      res.json({ jobPosts });
    } else {
      next();
    }
  } catch (err) {
    next(err);
  }
});

module.exports = jobPostRouter;
