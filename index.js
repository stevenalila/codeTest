//Initialising node modules
const express = require("express");
const chai = require("chai");
const mocha = require("mocha");
const dotenv = require("dotenv").config()
const exphbs = require("express-handlebars");
const nodemon = require("nodemon");
const sequelize = require("sequelize");
const bodyParser = require("body-parser")
const path =require("path");
const mysql = require('mysql');
const cors = require('cors');
 
const app = express();
const handlebars = exphbs.create({ /* config */ });

//To set views folder and layouts in handlebars
app.engine('handlebars', exphbs({defaultLayout: false}));
app.set('view engine', 'handlebars');

//Setting Base directory
app.use(cors()); //enables/allows cors origin requests
app.use(bodyParser.json()); //assist in reading JSON code
app.use(bodyParser.urlencoded({ extended: true })); //Bodyparser extension including urlencoding
app.use(express.static(path.join(__dirname, "./public")));

//connection string
let connection = mysql.createConnection({
   host     : process.env.DB_HOST,
   user     : process.env.DB_USER,
   password : process.env.DB_PASS,
   database : process.env.DB_DATABASE
 }); 
 
 
connection.connect(function(err){
 if(!err) {
     console.log("Database is connected ... \n\n");  
 } else {
     console.log("Error connecting database ... \n\n");  
 }
});

//Home Route
app.get('/', function(req, res){
    res.render('home');
});

//First Name required route
app.post('/name', function(req, res){
    const firstname = {
        firstname : req.body.firstname
    };
    
    //this line is optional and will print the response on the command prompt
    //It's useful so that we know what infomration is being transferred 
    //using the server
    console.log(firstname);
    
    //convert the response in JSON format
    res.end(JSON.stringify(response));
});

app.listen(process.env.PORT || 8080, () => {
    console.log("We have lift off on port " + process.env.PORT)
});