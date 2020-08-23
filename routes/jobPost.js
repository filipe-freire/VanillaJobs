'use strict';

const { Router } = require('express');
const jobPostRouter = new Router();

jobPostRouter.get('/', (req, res) => {
  res.json({ type: 'success', data: { title: 'jobPost' } });
});

module.exports = jobPostRouter;
