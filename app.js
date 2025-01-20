const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');
const session = require('express-session')
const flash = require('connect-flash')
const ExpressError = require('./utils/ExpressError');
const campgrounds = require('./routes/campgrounds')
const reviews = require('./routes/reviews')


const app = express();
app.engine('ejs', ejsMate)
mongoose.connect('mongodb://localhost:27017/yelp-camp')
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Connection error:', err));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))
// CONFIGURATION
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')))
const sessionConfig = {
    secret: 'mysecretsecret',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7, // 7 days
        maxAge: 1000 * 60 * 60 * 24 * 7 // 7 days
    }
}
app.use(session(sessionConfig))
app.use(flash())
app.use((req, res, next) => {
    res.locals.success = req.flash('success')
    res.locals.error = req.flash('error')
    next();
})

// ROUTES
app.use('/campgrounds', campgrounds)
app.use('/campgrounds/:id/reviews', reviews)


app.get('/', (req, res) => {
    res.render('home');
})

// ERROR HANDLING
app.all('*', (req, res, next) => {
    next(new ExpressError('page not found', 404))

})

app.use((err, req, res, next) => {
    const { statusCode = 500 } = err
    if (!err.message) err.message = 'Something went wrong'
    res.status(statusCode).render('error', { err })
})

app.listen(3000, () => {
    console.log('Server is running on port 3000');
})