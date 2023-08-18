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
    AddRequestActivity,
    DeleteBlacklist,
    getFavorite,
    getBlacklist } =require('./controller/controller');



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



//Activities
app.post('/activities',showActivityRequest)

app.get('/activities',AddRequestActivity)

//Favori
app.get('/favori',getFavorite)




//Blacklist
app.get('/blacklist',getBlacklist)


app.delete('/blacklist/:key',DeleteBlacklist)

app.listen(3000,func=>{
    console.log("hello world");
})