const axios = require('axios');


const chooseActivity=(req,res)=>{
    res.render('index');
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
    console.log(req.body);
    let type_activities=req.body.type_activities;
    let participants=req.body.participants;
    let price=req.body.price;
    console.log(type_activities,participants,price);

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
    axios.get(api_url.final_url).then(
        async (response)=>{
            json_data=response.data
            console.log("fetch data");
            console.log(json_data);
            if(json_data.hasOwnProperty("error")){
                status_GettingJsonData=1;
                res.render('error/no_activity');
            }
            else{
                status_GettingJsonData=2;
                res.render('proposition',{data:json_data});      
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


const CreateActivity=(req,res)=>{

}


const getFavori=(req,res)=>{
    res.render('favori');
};


const getBlacklist=(req,res)=>{
    res.render('blacklist');
}


module.exports={
    chooseActivity,
    showActivityRequest,
    CreateActivity,
    getFavori,
    getBlacklist
}