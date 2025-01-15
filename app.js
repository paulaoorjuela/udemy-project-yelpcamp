const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');
const { campgroundSchema } = require('./schemas')
const catchAsync = require('./utils/catchAsync');
const ExpressError = require('./utils/ExpressError');
const Campground = require('./models/campground');

const app = express();
app.engine('ejs', ejsMate)
mongoose.connect('mongodb://localhost:27017/yelp-camp')
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Connection error:', err));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

app.use(express.urlencoded({ extended: true}))
app.use(methodOverride('_method'));

const validateCampground = (req, res, next) => {
    
    const result = campgroundSchema.validate(req.body)
    if(result.error){
        throw new ExpressError(result.error.details[0].message, 400)
    }else{
        next();
    }
}

app.get('/', (req, res) => {
    res.render('home');
})

// SHOW ALL CAMPGROUNDS

app.get('/campgrounds', async (req, res) => {
    const campgrounds = await Campground.find({})
    res.render('campgrounds/index', { campgrounds });
})

// NEW CAMPGROUND

app.get('/campgrounds/new', (req, res) => {
    res.render('campgrounds/new');
})

app.post('/campgrounds', validateCampground, catchAsync(async (req, res, next) => {
    const campground = new Campground(req.body.campground)
    await campground.save();
    res.redirect(`/campgrounds/${campground._id}`);
}))

// SHOW ONE CAMPGROUND

app.get('/campgrounds/:id', catchAsync(async(req, res) => {
    const campground = await Campground.findById(req.params.id);
    res.render('campgrounds/show', { campground });
}))

// UPDATE

app.get('/campgrounds/:id/update', catchAsync(async (req, res) => {
    const campground = await Campground.findById(req.params.id);
    res.render('campgrounds/update', { campground });
}))

app.put('/campgrounds/:id', validateCampground, catchAsync(async (req, res) => {
    const {id} = req.params;
    const campground = await Campground.findByIdAndUpdate(id, {... req.body.campground });
    res.redirect(`/campgrounds/${campground._id}`);
}))

// DELETE

app.delete('/campgrounds/:id', catchAsync(async (req, res) => {
    const {id} = req.params;
    await Campground.findByIdAndDelete(id);
    res.redirect('/campgrounds');
}))

app.all('*', (req, res, next) => {
    next(new ExpressError('page not found', 404))

})

app.use((err, req, res, next) =>{
    const {statusCode = 500} = err
    if(!err.message) err.message = 'Something went wrong'
    res.status(statusCode).render('error', {err})
})

app.listen(3000, () => {
    console.log('Server is running on port 3000');
})