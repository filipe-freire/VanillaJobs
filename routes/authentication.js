const express = require('express');
const bcrypt = require('bcryptjs');

const User = require('./../models/user');

const authenticationRouter = new express.Router();

// authenticationRouter.post('/sign-up', async (req, res, next) => {
//   const { name, email, password } = req.body;

// });

authenticationRouter.post('/sign-in', (req, res, next) => {
  console.log(req.body);
});

module.exports = authenticationRouter;
