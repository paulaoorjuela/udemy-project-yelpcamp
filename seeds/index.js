const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp')
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Connection error:', err));


const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '6790366f695d905410863208',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores vero perferendis laudantium, consequuntur voluptatibus nulla architecto, sit soluta esse iure sed labore ipsam a cum nihil atque molestiae deserunt!',
            price,
            geometry: {
                type: 'Point',
                coordinates: [cities[random1000].longitude, cities[random1000].latitude]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/dr2eh30py/image/upload/v1738182390/YelpCamp/rvsjcjpvzimmfpydgig6.jpg',
                    filename: 'YelpCamp/rvsjcjpvzimmfpydgig6',
                },
                {
                    url: 'https://res.cloudinary.com/dr2eh30py/image/upload/v1738182390/YelpCamp/evrdbwgpliiq8z5bg9o2.jpg',
                    filename: 'YelpCamp/evrdbwgpliiq8z5bg9o2',
                }
            ],
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})