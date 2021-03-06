const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('./../models/user');

const authenticationRouter = new express.Router();

authenticationRouter.post('/sign-up', async (request, response, next) => {
  const { companyName, email, password } = request.body;
  try {
    if (password.length < 3) throw new Error('Password is too short.');
    const hashAndSalt = await bcrypt.hash(password, 10);
    const user = await User.create({
      companyName, // check "name" in user model
      email,
      passwordHashAndSalt: hashAndSalt
    });
    request.session.userId = user._id;
    response.json({
      user: { _id: user._id, companyName: user.companyName, email: user.email }
    });
  } catch (error) {
    next(error);
  }
});

authenticationRouter.post('/sign-in', async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) throw new Error("Either your email or your password don't match");

    const comparePassword = await bcrypt.compare(password, user.passwordHashAndSalt);
    console.log(comparePassword);
    if (!comparePassword) throw new Error('There was an error either with your email our password');
    req.session.userId = user._id;
    res.json({
      user: { _id: user._id, companyName: user.companyName, email: user.email }
    });
  } catch (err) {
    next(err);
  }
});

authenticationRouter.post('/sign-out', async (req, res) => {
  req.session.destroy();
  res.json({});
});

authenticationRouter.get('/me', (req, res) => {
  const user = req.user;
  res.json({ user });
});

module.exports = authenticationRouter;
