const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema(
  {
    activity: String,
    accessibility: Number,
    type: String,
    participants: Number,
    price: Number,
    link:String,
    key:Number,
    isFavorite:Number
    //Custom variable
    // permet de savoir
    // si blacklist
    // ou favori
  }
);
  
//permet de démarrer la DB, à mettre au début du serveur
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', () => {
  console.log('Connected to the database');
});

const CreateActivity = async (data)=>{

  const newActivity = new Activity({
    "activity": data.activity,
    "accessibility": data.accessibility,
    "type": data.type,
    "participants": data.participants,
    "price": data.price,
    "link":data.link,
    "key":data.price

  });
  await newActivity.save();
};
//Start DB
//Start DB
//Start DB
//Start DB


const Activity = mongoose.model('Activity', activitySchema);
module.exports = Activity;
