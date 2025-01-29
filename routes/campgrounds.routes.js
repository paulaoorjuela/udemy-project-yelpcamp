const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const { isLoggedIn, isAuthor, validateCampground } = require('../middleware')
const campgroundsController = require('../controllers/campgrounds.controller')

router.route('/')
    // SHOW ALL CAMPGROUNDS
    .get(catchAsync(campgroundsController.index))
    // NEW CAMPGROUND
    .post(isLoggedIn, validateCampground, catchAsync(campgroundsController.createCampground))

// NEW CAMPGROUND FORM
router.get('/new', isLoggedIn, campgroundsController.renderNewForm)

router.route('/:id')
    // SHOW ONE CAMPGROUND
    .get(catchAsync(campgroundsController.showCampground))
    // UPDATE CAMPGROUND
    .put(isLoggedIn, isAuthor, validateCampground, catchAsync(campgroundsController.updateCampground))
    // DELETE CAMPGROUND
    .delete(isLoggedIn, isAuthor, catchAsync(campgroundsController.deleteCampground))

// UPDATE FORM
router.get('/:id/update', isLoggedIn, isAuthor, catchAsync(campgroundsController.renderUpdateForm))


module.exports = router;