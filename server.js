require('dotenv').config()

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const User = require('./models/user');
const session = require('express-session')
const methodOverride = require('method-override');
const router = require('./routes/router');
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
app.use(methodOverride('_method'));
app.use(router)
 
mongoose.connect(process.env.DATABASE_URL,()=>{
    console.log("connected to database");
})


app.listen(3000,()=>{
    console.log("server listening on port 3000");
})

