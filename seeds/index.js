const mongoose = require('mongoose');
const cities = require('./cities');
const {places, descriptors} = require('./seedHelpers');
const Campground = require('../models/campground');


const dbConnection = "mongodb://0.0.0.0:27017/yelp-camp";
mongoose.connect(dbConnection, {
    serverSelectionTimeoutMS: 5000
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => console.log('Database connected successfully.'));

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '6787c2fd201e3e2197b5fdf1',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci amet animi aut debitis deserunt distinctio dolores ea earum excepturi hic, labore maxime non nostrum, nulla officia officiis quod similique voluptatibus.',
            price,
            images: [
                {
                    "url": "https://res.cloudinary.com/da6matqzj/image/upload/v1740063313/YelpCamp/nr6crntlcwl0w3ibnfzb.jpg"
                },
                {
                    "url": "https://res.cloudinary.com/da6matqzj/image/upload/v1740063314/YelpCamp/kaik6cgzlpbgckezsz9k.jpg"
                }
            ]
        });
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
});
