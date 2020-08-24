'use strict';

const { Router } = require('express');
const companyRouter = new Router();

const User = require('../models/user');

companyRouter.get('/user/:id', async (req, res, next) => {
  const id = req.params.id;
  try {
    const user = await User.findById(id);
    if (user) {
      res.json({
        user: {
          _id: user._id,
          companyName: user.companyName,
          email: user.email,
          location: user.location
        }
      });
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
});

companyRouter.patch('/user/:id', (req, res, next) => {
  const id = req.params.id;

  User.findOneAndUpdate({ _id: id }, { companyName: req.body.companyName }, { new: true })
    .then(post => {
      res.json({ post });
    })
    .catch(error => {
      next(error);
    });
});

module.exports = companyRouter;
