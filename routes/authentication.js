<<<<<<< HEAD
const express = require('express');
const bcrypt = require('bcryptjs');

const User = require('./../models/user');

const authenticationRouter = new express.Router();

// authenticationRouter.post('/sign-up', async (req, res, next) => {
//   const { name, email, password } = req.body;

// });

module.exports = authenticationRouter;
=======
'use strict';

const { Router } = require('express');
const router = new Router();

router.get('/', (req, res, next) => {
  res.json({ type: 'success', data: { title: 'Authentication' } });
});

module.exports = router;
>>>>>>> 43f7f976e396aee25ab3ccdb31c5a2f1c47f9e13
