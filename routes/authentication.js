const express = require('express');
const bcrypt = require('bcryptjs');

const User = require('./../models/user');

const authenticationRouter = new express.Router();

// authenticationRouter.post('/sign-up', async (req, res, next) => {
//   const { name, email, password } = req.body;

// });

authenticationRouter.post('/sign-up', async (request, response, next) => {
  const { companyName, email, password } = request.body;
  try {
    if (password.length < 8) throw new Error('Password is too short.');
    const hashAndSalt = await bcrypt.hash(password, 10);
    const user = await User.create({
      name: companyName, // check "name" in user model
      email,
      passwordHashAndSalt: hashAndSalt
    });
    request.session.userId = user._id;
    response.json({
      user: { _id: user._id, name: user.name, email: user.email }
    }); // research what this means/does
  } catch (error) {
    next(error);
  }
});

module.exports = authenticationRouter;
