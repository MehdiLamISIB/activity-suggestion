//main.js
const express = require("express");
const bodyParser = require('body-parser');
const app = express();
const mongoose = require("mongoose");
//const request=require('request');

//const axios = require('axios');


const Activity = require('./model/model');

const { 
    chooseActivity,
    showActivityRequest,
    getFavori,
    getBlacklist } =require('./controller/activity');



//Start DB
//Start DB
//Start DB
//Start DB

mongoose.connect('mongodb://localhost:27017/BoredDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});



//app config
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json());







//Index
app.get('/',chooseActivity)


app.post('/activities',showActivityRequest)


app.get('/activities')

//Favori
app.get('/favori',getFavori)




//Blacklist
app.get('/blacklist',getBlacklist)


app.listen(3000,func=>{
    console.log("hello world");
})