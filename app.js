'use strict';

const { join } = require('path');
const express = require('express');
const createError = require('http-errors');
const logger = require('morgan');
const serveFavicon = require('serve-favicon');
const indexRouter = require('./routes/index');

// Insert Necessary Packages
const cors = require('cors');
const dotenv = require('dotenv');
const expressSession = require('express-session');
const connectMongo = require('connect-mongo');
const mongoStore = connectMongo(expressSession);
const mongoose = require('mongoose');

const app = express();

const deserializeUser = require('./middleware/deserialize-user');

const postRouter = require('./routes/post');
const authenticationRouter = require('./routes/authentication');

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

app.use('/', indexRouter);

// Route Handlers

// CHANGE ROUTES TO OUR OWN
app.use('/job-post', postRouter);
app.use('/authentication', authenticationRouter);

// Catch missing routes and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// Catch all error handler
app.use((error, req, res) => {
  res.status(error.status || 500);
  res.json({ type: 'error', error: { message: error.message } });
});

module.exports = app;
