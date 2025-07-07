module.exports.isLoggedin=(req,res,next)=>{
    if(!req.isAuthenticated()){
        //redirect url for users
        req.session.redirectUrl=req.originalUrl;
        req.flash("error","You must login to gain access!");
        return res.redirect("/login");
    }
    next();
}

module.exports.saveRedirectUrl=(req,res,next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl=req.session.redirectUrl;
    }
    next();
};