require('dotenv').config()

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const User = require('./models/user');
const {isAuth , isLoggedin} = require('./middleware');
const session = require('express-session')
const methodOverride = require('method-override');
app.set("view engine", "ejs"); 
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(
	session({
		secret: 'just be yourself always',
		resave: false,
		saveUninitialized: true
	})
);
app.use(methodOverride('_method'))
 
mongoose.connect(process.env.DATABASE_URL,()=>{
    console.log("connected to database");
})
//routes
app.get('/login', (req,res) =>{
    res.render('login');
})
app.post('/login', async(req,res)=>{
    try {
       const { name, password } = req.body;
       if(!(name && password )){
           res.status(404).send('all input should be filled')
       }
       const user = await User.findOne({ name });
       

       if(user.password === password){
           if(req.session.name === 'admin'){
               res.redirect('/admin')
           }else{
            res.redirect('/dash');
            console.log(req.session.name);
           }  
            }else{
           res.status(404).send("incorrect password");
       }

    } catch (error) {
        console.log(error)
    }
})



app.get('/admin', (req,res) =>{
    res.render('admin')
})

app.get('/register', (req,res) =>{
    res.render('register')
})

app.post('/register', (req,res) =>{ 
    const user = new User({
        name: req.body.name,
        projects: req.body.projects,
        password: req.body.password,
        role: req.body.role
    })
    if(req.body.name === "admin"){
        req.session.name = "admin";
        console.log(req.session.name);
    }
    user.save((err)=>{
        if(err){
            console.log(err);
        }else{
            res.redirect('/login')
        }
        
    })
})

app.get('/dash', (req,res) =>{
    if(req.body.name === 'admin'){
        req.session.name = 'admin';
        res.redirect('/admin')
    }else{
        console.log(req.session);
        res.render('dash')
    }
})

app.get('/users',(req,res)=>{
    if(req.query.search){
        const regex = new RegExp(req.query.search);
        User.find({ name: regex}).then((data)=>{
            console.log(data);
            res.render('users',{ data: data }) ;
        })
    }else{
        User.find({}).then((data) =>{
            res.render('users',{data: data} )
        })
    }
})

app.get('/user/:id',(req,res)=>{
    res.render("editUser");
})


app.listen(3000,()=>{
    console.log("server listening on port 3000");
})

