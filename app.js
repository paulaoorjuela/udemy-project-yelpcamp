const express = require('express');
const path = require('path');
const mongoose = require('mongoose')
const Campground = require('./models/campground');

const app = express();
mongoose.connect('mongodb://localhost:27017/yelp-camp')
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Connection error:', err));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

app.get('/', (req, res) => {
    res.render('home');
})

app.get('/makecampground', async (req, res) => {
    const camp = new Campground({
        title: 'Example Campground',
        price: '$15',
        description: 'This is a great place for hiking',
        location: 'New York City'
    })
    await camp.save()
    res.send(camp)
})

app.listen(3000, () => {
    console.log('Server is running on port 3000');
})