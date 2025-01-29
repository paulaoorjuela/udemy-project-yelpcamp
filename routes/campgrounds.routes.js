const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const { isLoggedIn, isAuthor, validateCampground } = require('../middleware')
const Campground = require('../models/campground');
const campgroundsController = require('../controllers/campgrounds.controller')

// SHOW ALL CAMPGROUNDS

router.get('/', catchAsync(campgroundsController.index))

// NEW CAMPGROUND

router.get('/new', isLoggedIn, campgroundsController.renderNewForm)

router.post('/', isLoggedIn, validateCampground, catchAsync(campgroundsController.createCampground))

// SHOW ONE CAMPGROUND

router.get('/:id', catchAsync(campgroundsController.showCampground))

// UPDATE

router.get('/:id/update', isLoggedIn, isAuthor, catchAsync(campgroundsController.renderUpdateForm))

router.put('/:id', isLoggedIn, isAuthor, validateCampground, catchAsync(campgroundsController.updateCampground))

// DELETE

router.delete('/:id', isLoggedIn, isAuthor, catchAsync(campgroundsController.deleteCampground))

module.exports = router;