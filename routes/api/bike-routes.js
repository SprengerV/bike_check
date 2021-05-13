const router = require('express').Router();
const { Bike, Comment, Like, Photo, User  } = require('../../models');
const userAuth = require('../../client/src/auth');
// do we need a timestamp helper here for post times?

