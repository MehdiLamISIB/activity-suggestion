const fs=require('fs')
const axios = require('axios');
const mongoose = require("mongoose");




const {
    Activity,
    CreateActivity
}=require('../model/model');
const { json, query } = require('express');





// CacheFile
const cacheWriter = (jsonData)=>{
    const jsonStr = JSON.stringify(jsonData);
    fs.writeFile('cache.json', jsonStr, (err) => {
        if (err) {
          console.error('Error writing cache file:', err);
        } else {
          console.log('Cache file written successfully');
        }
      });
}


const dataCache = (callback)=>{
    fs.readFile('cache.json', 'utf8', (err, data) => {
        if (err) {
          console.error(err);
          return;
        }
        console.log(data);
        callback( JSON.parse(data) );
      });   
}

// Controller

const chooseActivity=(req,res)=>{
    res.render('index',{warning:false});
};




const showActivityRequest=(req,res)=>{
    // requete url que je vais envoyer pour obtenir l'activité de boredAPI
    let api_url={
        url:'http://www.boredapi.com/api/activity/',
        method:'GET',
        type:'',
        participants:'',
        max_price:'',
        final_url:''
    };

    /**
     * Différent status :
     * 0 = pas de data recu
     * 1 = les données ont été obtenu
     * 2 = la requête obtient rien (trop de participants)
     * -1 = il y a une erreur pour obtenir les données
     */
    /**
     * Je dois vérifier si le contenu et bon
     * si ce n'est pas le cas je redirige vers "/"
     */
    //console.log(req.body);
    let type_activities=req.body.type_activities;
    let participants=req.body.participants;
    let price=req.body.price;
    //console.log(type_activities,participants,price);

    price=(parseFloat(price)/100).toFixed(2).toString();
    // requête API pour le test
    api_url.type=type_activities;
    api_url.max_price=price;
    api_url.participants=participants;
    // Cas où on veut de tout types
    if(api_url.type=='all'){
        api_url.final_url=api_url.url+'?'+'participants='+api_url.participants+'&minprice=0&maxprice'+(price);
    }
    else{
        api_url.final_url=api_url.url+'?'+'type='+api_url.type+'&participants='+api_url.participants+'&minprice=0.00&maxprice'+(price);
    }
    // REQUETE AVEC AXIOS
    axios.get(api_url.final_url).then(
        async (response)=>{
            json_data=response.data
            //console.log("fetch data");//console.log(json_data);  
            // si une clée "error" existe, j'envoie à la page no activity
            if(json_data.hasOwnProperty("error")){
                status_GettingJsonData=1;
                res.render('error/no_activity');
            }
            else{
                Activity.countDocuments({key:json_data.key}).then((count)=>{
                    console.log("nombre de même occurence",count);
                    if(count==0){
                        status_GettingJsonData=2;
                        cacheWriter(json_data);
                        res.render('proposition',{data:json_data}); 
                    }
                    else{
                        res.render('index',{warning:true});
                    }
                }).catch((err)=>{
                    status_GettingJsonData=-1;
                    console.log(err);
                    res.redirect("/");
                })

            }
        }
    ).catch(
        (err)=>{
            status_GettingJsonData=-1;
            console.log(err);
            res.redirect("/");
        }
    );   
}


const AddRequestActivity=(req,res)=>{
    dataCache((data)=>{
        let favorite=req.query["favorite"];
        console.log("favori=",favorite);
        CreateActivity( data ,favorite).then(res.redirect('/'))//res.render('index',{warning:false,success:true})
    })
    //console.log("jsonData ---> ",jsonData);

}




/// GET
const getFavorite=(req,res)=>{
    Activity.find({isFavorite:1}).then(
        (doc)=>{
            res.render('favorite',{activities:doc})
            //console.log(doc);
        }
      ).catch((err)=>{console.log(err);}); 
    
};


const getBlacklist=(req,res)=>{
    Activity.find({isFavorite:0}).then(
        (doc)=>{
            res.render('blacklist',{activities:doc})
            //console.log(doc);
        }
      ).catch((err)=>{console.log(err);}); 
}




/// DELETE
const DeleteBlacklist=(req,res)=>{
    Activity.deleteOne({key:req.params.key}).then(()=>{
        console.log("element supprimer")
        res.sendStatus(200);
    }).catch((err)=>{console.log(err);}); 
    
}

const DeleteFavorite=(req,res)=>{
    Activity.deleteOne({key:req.params.key}).then(()=>{
        console.log("element supprimer")
        res.sendStatus(200);
    }).catch((err)=>{console.log(err);}); 
    
}



//UPDATE
const ChangeToBlacklist=(req,res)=>{
    Activity.updateOne({key:req.params.key},{isFavorite:0}).then(()=>{
        console.log("element supprimer")
        res.sendStatus(200);
    }).catch((err)=>{console.log(err);}); 
}


module.exports={
    chooseActivity,
    showActivityRequest,
    AddRequestActivity,
    DeleteBlacklist,
    DeleteFavorite,
    ChangeToBlacklist,
    getFavorite,
    getBlacklist
}