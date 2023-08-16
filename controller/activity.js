const chooseActivity=(req,res)=>{
    res.render('index');
};

const getFavori=(req,res)=>{
    res.render('favori');
};


const getBlacklist=(req,res)=>{
    res.render('blacklist');
}

module.exports={
    chooseActivity,
    getFavori,
    getBlacklist
}