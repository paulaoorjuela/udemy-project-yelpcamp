const express = require('express');
const router = express.Router();
const User = require('../models/user')
const catchAsync = require('../utils/catchAsync');
const passport = require('passport');
const usersController = require('../controllers/users.controller')

router.get('/register', usersController.renderRegister)

router.post('/register', catchAsync(usersController.register))

router.get('/login', usersController.renderLogin)

router.post('/login', passport.authenticate('local', { failureFlash: true, failureRedirect: '/login', keepSessionInfo: true, }), usersController.login);

router.get('/logout', usersController.logout);

module.exports = router