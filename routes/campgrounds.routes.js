const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/ExpressError');
const { isLoggedIn } = require('../middleware')
const Campground = require('../models/campground');
const { campgroundSchema } = require('../schemas')


// MIDDLEWARE
const validateCampground = (req, res, next) => {

    const result = campgroundSchema.validate(req.body)
    if (result.error) {
        throw new ExpressError(result.error.details[0].message, 400)
    } else {
        next();
    }
}

// SHOW ALL CAMPGROUNDS

router.get('/', async (req, res) => {
    const campgrounds = await Campground.find({})
    res.render('campgrounds/index', { campgrounds });
})

// NEW CAMPGROUND

router.get('/new', isLoggedIn, (req, res) => {
    res.render('campgrounds/new');
})

router.post('/', isLoggedIn, validateCampground, catchAsync(async (req, res, next) => {
    const campground = new Campground(req.body.campground)
    await campground.save();
    req.flash('success', 'New Campground has been created')
    res.redirect(`/campgrounds/${campground._id}`);
}))

// SHOW ONE CAMPGROUND

router.get('/:id', catchAsync(async (req, res) => {
    const campground = await Campground.findById(req.params.id).populate('reviews');
    if (!campground) {
        req.flash('error', 'Campground not found')
        return res.redirect('/campgrounds');
    }
    res.render('campgrounds/show', { campground });
}))

// UPDATE

router.get('/:id/update', isLoggedIn, catchAsync(async (req, res) => {
    const campground = await Campground.findById(req.params.id);
    if (!campground) {
        req.flash('error', 'Campground not found')
        return res.redirect('/campgrounds');
    }
    res.render('campgrounds/update', { campground });
}))

router.put('/:id', isLoggedIn, validateCampground, catchAsync(async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findByIdAndUpdate(id, { ...req.body.campground });
    req.flash('success', 'Campground updated successfully')
    res.redirect(`/campgrounds/${campground._id}`);
}))

// DELETE

router.delete('/:id', isLoggedIn, catchAsync(async (req, res) => {
    const { id } = req.params;
    await Campground.findByIdAndDelete(id);
    req.flash('success', 'Campground deleted successfully')
    res.redirect('/campgrounds');
}))

module.exports = router;