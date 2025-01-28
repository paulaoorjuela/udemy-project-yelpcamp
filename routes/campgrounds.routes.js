const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const { isLoggedIn, isAuthor, validateCampground } = require('../middleware')
const Campground = require('../models/campground');

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
    campground.author = req.user._id;
    await campground.save();
    req.flash('success', 'New Campground has been created')
    res.redirect(`/campgrounds/${campground._id}`);
}))

// SHOW ONE CAMPGROUND

router.get('/:id', catchAsync(async (req, res) => {
    const campground = await Campground.findById(req.params.id).populate({
        path:'reviews',
        populate: {
            path: 'author',
            select: 'username'
        }
    }).populate('author');
    if (!campground) {
        req.flash('error', 'Campground not found')
        return res.redirect('/campgrounds');
    }
    res.render('campgrounds/show', { campground });
}))

// UPDATE

router.get('/:id/update', isLoggedIn, isAuthor, catchAsync(async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findById(id);
    if (!campground) {
        req.flash('error', 'Campground not found')
        return res.redirect('/campgrounds');
    }
    res.render('campgrounds/update', { campground });
}))

router.put('/:id', isLoggedIn, isAuthor, validateCampground, catchAsync(async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findByIdAndUpdate(id, { ...req.body.campground });
    req.flash('success', 'Campground updated successfully')
    res.redirect(`/campgrounds/${campground._id}`);
}))

// DELETE

router.delete('/:id', isLoggedIn, isAuthor, catchAsync(async (req, res) => {
    const { id } = req.params;
    await Campground.findByIdAndDelete(id);
    req.flash('success', 'Campground deleted successfully')
    res.redirect('/campgrounds');
}))

module.exports = router;