// @/main.js
const express = require("express");
const app = express();
const mongoose = require("mongoose");




app.set('view engine','ejs');




//Blacklist
app.get('/',(req,res)=>{
    res.render('index');
}
)



app.post('/',(req,res)=>{
    res.render('index');
}
)



//Favori
app.get('/favori',(req,res)=>{
    res.render('favori');
}
)




//Blacklist
app.get('/blacklist',(req,res)=>{
    res.render('blacklist');
}
)


app.listen(3000,func=>{
    console.log("hello world");
})