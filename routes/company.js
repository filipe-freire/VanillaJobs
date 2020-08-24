'use strict';

const { Router } = require('express');
const companyRouter = new Router();

const User = require('../models/user');

companyRouter.get('/me', (req, res) => {
  const user = req.user;
  res.json({ user });
});

companyRouter.get('/:id', async (req, res, next) => {
  const id = req.user._id;

  try {
    const user = await User.findById(id);
    console.log('this is the user', user);
    if (user) {
      res.json({
        user: {
          _id: id,
          companyName: user.companyName,
          email: user.email,
          logo: user.logo,
          location: user.location,
          foundedDate: user.foundedDate,
          websiteUrl: user.websiteUrl,
          sizeInEmployees: user.sizeInEmployees,
          summary: user.summary
        }
      });
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
});

companyRouter.patch('/:id', (req, res, next) => {
  const id = req.user._id;
  const {
    companyName,
    email,
    logo,
    location,
    foundedDate,
    websiteUrl,
    sizeInEmployees,
    summary
  } = req.body;

  console.log(req.body);

  User.findOneAndUpdate(
    { _id: id },
    {
      companyName,
      email,
      logo,
      location,
      foundedDate,
      websiteUrl,
      sizeInEmployees,
      summary
    },
    { new: true }
  )
    .then(post => {
      res.json({ post });
    })
    .catch(error => {
      next(error);
    });
});

module.exports = companyRouter;
