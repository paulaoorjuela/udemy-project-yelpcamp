const express = require('express');
const router = express.Router({ mergeParams: true });
const User = require('../models/user')
const catchAsync = require('../utils/catchAsync')

router.get('/register', (req, res) => {
    res.render('users/register')
})

router.post('/register', catchAsync(async (req, res) => {
    try {
        const { email, username, password } = req.body
        const user = new User({ email, username })
        const registeredUser = await User.register(user, password)
        req.flash('success', 'Welcome to YelpCamp, ' + registeredUser.username + '!')
        res.redirect('/campgrounds')
    } catch (err) {
        req.flash('error', err.message)
        return res.redirect('/register')
    }
}))

module.exports = router