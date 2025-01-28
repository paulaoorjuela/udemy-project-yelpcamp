const { campgroundSchema, reviewSchema } = require('./schemas')
const ExpressError = require('./utils/ExpressError'); 
const Campground = require('./models/campground');
const Review = require('./models/review');


module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.flash('error', 'You must be signed in first!');
        return res.redirect('/login');
    }
    next();
}

module.exports.validateCampground = (req, res, next) => {

    const result = campgroundSchema.validate(req.body)
    if (result.error) {
        throw new ExpressError(result.error.details[0].message, 400)
    } else {
        next();
    }
}

module.exports.isAuthor = async(req, res, next) => {
    const { id } = req.params;
    const campground = await Campground.findById(id)
    if(!campground.author.equals(req.user._id)){
        req.flash('error', 'You do not have permission to do that')
        return res.redirect(`/campgrounds/${id}`)
    }
    next();
}

module.exports.validateReview = (req, res, next) => {
    const result = reviewSchema.validate(req.body)
    if (result.error) {
        throw new ExpressError(result.error.details[0].message, 400)
    } else {
        next();
    }
}

module.exports.isReviewAuthor = async(req, res, next) => {
    const { id, reviewId } = req.params;
    const review = await Review.findById(reviewId)
    if(!review.author.equals(req.user._id)){
        req.flash('error', 'You do not have permission to do that')
        return res.redirect(`/campgrounds/${id}`)
    }
    next();
}