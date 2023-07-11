const mongoose=require('mongoose');
const Campground=require('../models/campground');
const cities=require('./cities');
const {places,descriptors}=require('./seedHelpers');
mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp')
.then(()=>{
    console.log("Connection Open");
})
.catch(err=>{
    console.log("OHH error!!!");
    console.log(err);
})

const sample=array=>array[Math.floor(Math.random()*array.length)];

const seedDB=async()=>{
    await Campground.deleteMany({});
   for(let i=0;i<50;i++){
    const random1000=Math.floor(Math.random()*1000);
    const price=Math.floor(Math.random()*20)+10;
    const camp= new Campground({
        author: '64a937d0bc945a3f75d766f3',
        location: `${cities[random1000].city} , ${cities[random1000].state}`,
        title: `${sample(descriptors)} ${sample(places)}`,
        price: price,
        images:[
            {
              url: 'https://res.cloudinary.com/du18vckny/image/upload/v1688845728/YelpCamp/n12q8rytmb910rybi26q.jpg',
              filename: 'YelpCamp/n12q8rytmb910rybi26q',
            },
            {
              url: 'https://res.cloudinary.com/du18vckny/image/upload/v1688845728/YelpCamp/um0anen5xyycrytgl969.jpg',
              filename: 'YelpCamp/um0anen5xyycrytgl969',
            },
            {
              url: 'https://res.cloudinary.com/du18vckny/image/upload/v1688845728/YelpCamp/m5gkmikvemidehkine5p.jpg',
              filename: 'YelpCamp/m5gkmikvemidehkine5p',
            }
          ],
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti ipsa autem asperiores consequatur tempora, inventore placeat, iste optio quod quisquam dolorum! Magni minima totam molestias harum quia voluptates voluptas! Aspernatur!',
    })
    await camp.save();
   }
}
seedDB().then(()=>{
    mongoose.connection.close();
})

