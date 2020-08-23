'use strict';

const { Router } = require('express');
const applicationRouter = new Router();

applicationRouter.get('/', (req, res, next) => {
  res.json({ type: 'success', data: { title: 'Application' } });
});

module.exports = applicationRouter;
