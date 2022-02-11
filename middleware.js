const User = require('./models/user')

module.exports = {
    isAuth: 
        (req,res,next) =>{
        if(req.session.name === "admin"){
            next()
        }else{
            res.send("You need ADMIN premission of accessing")
        }
    },
    isReg:
        (req,res,next) => {
            if(req.session.name){
                next()
            }else{
                res.redirect('/register')
            }
        }
    
}