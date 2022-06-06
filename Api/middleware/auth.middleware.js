var Users = require('../model/user.model')

module.exports.CheckMiddle = async (req, res, next) => {
    if (!req.signedCookies.userID){
        res.redirect('/');
        return;
    }

    next();
}

module.exports.checkAdmin= async function(req,res,next){
        const user= await Users.findOne({_id:req.signedCookies.userID});
        if (user.status === true){
            next();
        }else{
            res.redirect('/')
        }
}

module.exports.userNav=async function(req,res,next){
    const user= await Users.findOne({_id:req.signedCookies.userID});
    res.locals.userNav=user
    next()
}
