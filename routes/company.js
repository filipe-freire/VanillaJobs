'use strict';

const { Router } = require('express');
const companyRouter = new Router();

const User = require('../models/user');

const multer = require('multer');
const cloudinary = require('cloudinary');
const multerStorageCloudinary = require('multer-storage-cloudinary');
const storage = new multerStorageCloudinary.CloudinaryStorage({
  cloudinary: cloudinary.v2
});
const upload = multer({ storage });

companyRouter.get('/me', (req, res) => {
  const user = req.user;
  res.json({ user });
});

// Retrieve and send all companies from the database
companyRouter.get('/listAll', async (req, res, next) => {
  try {
    const allUsers = await User.find();
    if (allUsers) {
      res.json({ allUsers });
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
});

companyRouter.get('/:id', async (req, res, next) => {
  const id = req.params.id;

  try {
    const user = await User.findById(id);
    // console.log('this is the user', user);
    if (user) {
      res.json({
        user: {
          _id: id,
          companyName: user.companyName,
          email: user.email,
          logo: user.logo,
          location: user.location,
          foundedDate: user.foundedDate,
          websiteUrl: user.websiteUrl,
          sizeInEmployees: user.sizeInEmployees,
          summary: user.summary
        }
      });
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
});

companyRouter.patch('/:id', upload.single('logo'), (req, res, next) => {
  const id = req.params.id;
  let url;
  if (req.file) {
    url = req.file.path;
  }

  const {
    companyName,
    email,
    location,
    foundedDate,
    websiteUrl,
    sizeInEmployees,
    summary
  } = req.body;

  let updatedObject;
  if (url) {
    updatedObject = {
      companyName,
      email,
      logo: url,
      location,
      foundedDate,
      websiteUrl,
      sizeInEmployees,
      summary
    };
  } else {
    updatedObject = {
      companyName,
      email,
      location,
      foundedDate,
      websiteUrl,
      sizeInEmployees,
      summary
    };
  }

  User.findOneAndUpdate({ _id: id }, updatedObject, { new: true })
    .then(post => {
      res.json({ post });
    })
    .catch(error => {
      next(error);
    });
});

module.exports = companyRouter;
