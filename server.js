
var express = require("express");
var exphbs = require("express-handlebars");
var mongoose = require("mongoose");
var cheerio = require("cheerio");
var axios = require("axios");

// initialize express
var app = express();

var PORT = process.env.PORT || 3030;

// middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// Handlebars
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Routes
require("./apiRoutes")(app);
require("./htmlRoutes")(app);

// require models
var db = require("./models");

// connect mongo db
// This code should connect mongoose to your remote mongolab database if deployed, 
// but otherwise will connect to the local mongoScraper database on your computer.

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://liz:elmather1@ds129670.mlab.com:29670/heroku_tn9gk877";
mongoose.connect(MONGODB_URI, { useNewUrlParser: true } );

// start server
app.listen(PORT, function () {
    console.log("Running on port " + PORT);
})