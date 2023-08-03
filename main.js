//main.js
const express = require("express");
const bodyParser = require('body-parser');
const app = express();
const mongoose = require("mongoose");




app.set('view engine','ejs');
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json());


//Index
app.get('/',(req,res)=>{
    res.render('index');
}
)


app.post('/activities',(req,res)=>{
    /**
     * Je dois vérifier si le contenu et bon
     * si ce n'est pas le cas je redirige vers "/"
     */
    console.log(req.body);
    let type_activities=req.body.type_activities;
    let participants=req.body.participants;
    let price=req.body.price;
    console.log(type_activities,participants,price);

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