const express = require('express');
const router = express.Router({ mergeParams:true });
const catchAsync = require('../utils/catchAsync');
const { validateReview, isLoggedIn, isReviewAuthor } = require('../middleware')
const reviewsController = require('../controllers/reviews.controller')

// REVIEW
router.post('/', isLoggedIn, validateReview, catchAsync(reviewsController.creteReview))

router.delete('/:reviewId', isLoggedIn, isReviewAuthor, catchAsync(reviewsController.deleteReview))

module.exports = router;