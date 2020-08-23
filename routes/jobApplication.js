'use strict';

const { Router } = require('express');
const jobApplicationRouter = new Router();

jobApplicationRouter.get('/', (req, res) => {
  res.json({ type: 'success', data: { title: 'Application' } });
});

module.exports = jobApplicationRouter;
