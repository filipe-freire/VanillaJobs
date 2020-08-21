'use strict';

const { Router } = require('express');
const router = new Router();

router.get('/', (req, res, next) => {
  res.json({ type: 'success', data: { title: 'jobPost' } });
});

module.exports = router;
