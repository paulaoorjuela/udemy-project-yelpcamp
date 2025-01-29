const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const passport = require('passport');
const usersController = require('../controllers/users.controller')

router.route('/register')
    // REGISTER FORM
    .get(usersController.renderRegister)
    // REGISTER USER
    .post(catchAsync(usersController.register))


router.route('/login')
    // LOGIN FORM
    .get(usersController.renderLogin)
    // LOGIN USER
    .post(passport.authenticate('local', { failureFlash: true, failureRedirect: '/login', keepSessionInfo: true, }), usersController.login);

// LOGOUT USER
router.get('/logout', usersController.logout);

module.exports = router