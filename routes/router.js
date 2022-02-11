const router = require('express').Router();
const User = require('../models/user')
const {isAuth, isReg} = require('../middleware');
const { route } = require('express/lib/application');


//routes


//CREATE
router.get('/register', (req,res) =>{
    res.render('register')
})

router.post('/register', (req,res) =>{ 
    const user = new User({
        name: req.body.name,
        projects: req.body.projects,
        password: req.body.password,
        role: req.body.role
    })
    user.save((err)=>{
        if(err){
            console.log(err);
        }else{
            req.session.name = 'basic';
            res.redirect('/login')
        }
        
    })
})


//CREATE-LOGIN
router.get('/login',isReg, (req,res) =>{
    res.render('login');
})


router.post('/login', async(req,res)=>{
    try {
       const { name, password, role } = req.body;
       if(!(name && password )){
           res.status(404).send('all input should be filled')
       }
       const user = await User.findOne({ name });

       if(user.password === password){
           if(user.role === 'admin'){
               req.session.name = 'admin'
               res.redirect('/admin')
           }else{
            res.redirect('dash')
           }

            }else{
           res.status(404).send("incorrect password");
       }

    } catch (error) {
        console.log(error)
    }
})


//ACCESS-PAGES
router.get('/admin',isAuth, (req,res) =>{
    res.render('admin')
})


router.get('/dash', (req,res) =>{
    res.render('dash')
})

router.get('/users',(req,res)=>{
    if(req.query.search){
        const regex = new RegExp(req.query.search);
        User.find({ name: regex}).then((data)=>{
            res.render('users',{ data: data }) ;
        })
    }else{
        User.find({}).then((data) =>{
            res.render('users',{data: data} )
        })
    }
})

router.get('/user/:id',(req,res)=>{
    const userData = req.params.id;
    User.findById(userData,(err,data) =>{
        res.render("editUser",{ data : data });
    } )
    
})

router.put('/users/:id',(req,res)=>{
    const id = req.params.id;
    const editUser ={
        name: req.body.name,
        projects: req.body.projects,
        role: req.body.role
    }
    User.findByIdAndUpdate(id, editUser,(err,data)=>{
        console.log(err)
        res.redirect('/users')
    })
})

router.delete('/users/:id',(req,res)=>{
    const id = req.params.id
    User.findByIdAndDelete(id,(err)=>{
        if(err){
            console.log(err);
        }
        res.redirect('/users')
    })
})

router.get('/logout',(req,res)=>{
    req.session.destroy();
    res.send('Logged out successful <a href="/register">register</a>')
})


module.exports = router