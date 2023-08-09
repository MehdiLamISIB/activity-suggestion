//main.js
const express = require("express");
const bodyParser = require('body-parser');
const app = express();
const mongoose = require("mongoose");
const request=require('request');



app.set('view engine','ejs');
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json());





let api_url={
    url:'http://www.boredapi.com/api/activity/',
    method:'GET',
    type:'',
    participants:'',
    max_price:'',
    final_url:''
};




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


    price=(float(price)/100).toFixed(2).toString();
    // requête API pour le test
    api_url.type=type_activities;
    api_url.max_price=price;
    api_url.participants=participants;
    api_url.final_url=api_url.url+'?'+
    'type='+api_url.type+'&participants='+api_url.participants
    +'&minprice=0&maxprice'+(price);
    request({})
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