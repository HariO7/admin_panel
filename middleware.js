const User = require('./models/user')

module.exports = {
    isAuth: 
        (req,res,next) =>{
        if(req.session.name === "admin"){
            next()
        }else{
            res.redirect('/');
        }
    },
    isLoggedin:(req,res,next) =>{
        if(req.session.name === 'admin'){
            res.redirect('/admin')
        }else{
            next();
        }
    }
}