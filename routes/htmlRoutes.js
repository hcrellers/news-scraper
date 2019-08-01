var db = require("../models");
var axios = require("axios");
var moment = require('moment');
var cheerio = require("cheerio");

module.exports = function (app) {

    // load index page
    app.get("/", function (req, res) {
        db.Article.find({}).then(function (dbArticles) {
            res.render("index", {
                articles: dbArticles
            });
        });
    });
};