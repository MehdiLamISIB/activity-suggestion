// @/main.js
const express = require("express");
const app = express();
const mongoose = require("mongoose");




app.set('view engine','ejs');




//Index
app.get('/',(req,res)=>{
    res.render('index');
}
)


//Proposition activities
app.post('/activities',(req,res)=>{
    res.render('proposition');
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