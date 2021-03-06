const dotenv = require('dotenv');
dotenv.config();

const { join } = require('path');
const express = require('express');
const createError = require('http-errors');
const logger = require('morgan');
const serveFavicon = require('serve-favicon');

// Insert Necessary Packages
const cors = require('cors');
const expressSession = require('express-session');
const connectMongo = require('connect-mongo');
const mongoose = require('mongoose');

const deserializeUser = require('./middleware/deserialize-user');

const jobApplicationRouter = require('./routes/job-application');
const authenticationRouter = require('./routes/authentication');
const companyRouter = require('./routes/company');
const jobPostRouter = require('./routes/job-post');

const mongoStore = connectMongo(expressSession);

const app = express();

app.set('trust proxy', 1);

app.use(serveFavicon(join(__dirname, 'public/images', 'favicon.ico')));
app.use(logger('dev'));

app.use(
  cors({
    origin: [process.env.CLIENT_APP_URL],
    credentials: true
  })
);

// Middleware

app.use(express.json());
app.use(
  expressSession({
    secret: process.env.COOKIE_SECRET,
    resave: true,
    saveUninitialized: false,
    cookie: {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      sameSite: 'none',
      secure: process.env.NODE_ENV === "production"
    },
    store: new mongoStore({
      mongooseConnection: mongoose.connection,
      ttl: 60 * 60
    })
  })
);
app.use(deserializeUser);

// CHANGE ROUTES TO OUR OWN
app.use('/job-post', jobPostRouter);
app.use('/authentication', authenticationRouter);
app.use('/job-application', jobApplicationRouter);
app.use('/user', companyRouter);

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
