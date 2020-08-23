'use strict';

const { Router } = require('express');
const companyRouter = new Router();

companyRouter.get('/', (req, res) => {
  res.json({ type: 'success', data: { title: 'Company' } });
});

module.exports = companyRouter;
