'use strict';

const { join } = require('path');
const express = require('express');
const createError = require('http-errors');
const logger = require('morgan');
const serveFavicon = require('serve-favicon');

// Insert Necessary Packages
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
const expressSession = require('express-session');
const connectMongo = require('connect-mongo');
const mongoStore = connectMongo(expressSession);
const mongoose = require('mongoose');

const app = express();

const deserializeUser = require('./middleware/deserialize-user');

const applicationRouter = require('./routes/application');
const authenticationRouter = require('./routes/authentication');
const companyRouter = require('./routes/company');
const jobPostRouter = require('./routes/jobPost');

app.use(serveFavicon(join(__dirname, 'public/images', 'favicon.ico')));
app.use(logger('dev'));

// Middleware

app.use(
  cors({
    origin: [process.env.CLIENT_APP_DEV_URL],
    credentials: true
  })
);
app.use(express.json());
app.use(
  expressSession({
    secret: process.env.COOKIE_SECRET,
    resave: true,
    saveUninitialized: false,
    cookie: {
      maxAge: 15 * 24 * 60 * 60 * 1000
    },
    store: new mongoStore({
      mongooseConnection: mongoose.connection,
      ttl: 60 * 60
    })
  })
);
app.use(deserializeUser);

// Route Handlers

// CHANGE ROUTES TO OUR OWN
app.use('/job-post', jobPostRouter);
app.use('/authentication', authenticationRouter);
app.use('/application', applicationRouter);
app.use('/company', companyRouter);

// Catch missing routes and forward to error handler
app.use('*', (req, res, next) => {
  next(createError(404));
});

// Catch all error handler
app.use((error, req, res) => {
  res.status(error.status || 500);
  res.json({ type: 'error', error: { message: error.message } });
});

module.exports = app;
