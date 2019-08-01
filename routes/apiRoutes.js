var db = require("../models");
var axios = require("axios");
var moment = require('moment');
var cheerio = require("cheerio");

module.exports = function (app) {

    app.get("/scrape", function (req, res) {

        axios.get("https://www.laweekly.com/").then(function (response) {
            // console.log(response);

            var $ = cheerio.load(response.data);
            // console.log($);

            $("article h1").each(function (i, element) {
                var result = {};
                // console.log(result);

                result.title = $(this).text();
                // console.log($(this).text());
                result.link = $(this).parent("a").attr("href");
                // console.log($(this).parent("a").attr("href"));

                db.Article.create(result).then(function (dbArticle) {
                    console.log(dbArticle);
                })
                    .catch(function (err) {
                        console.log(err);
                    });

            });

        });

    });

    app.get("/articles", function (req, res) {
        db.Article.find({}).then(function (dbArticle) {
            res.json(dbArticle);
        })
            .catch(function (err) {
                res.json(err);
            });
    });

    app.get("/articles/:id", function(req, res) {
        // Using the id passed in the id parameter, prepare a query that finds the matching one in our db...
        db.Article.findOne({ _id: req.params.id })
          // ..and populate all of the comments associated with it
          .populate("comment")
          .then(function(dbArticle) {
            // If we were able to successfully find an Article with the given id, send it back to the client
            res.json(dbArticle);
          })
          .catch(function(err) {
            // If an error occurred, send it to the client
            res.json(err);
          });
      });

      app.post("/articles/:id", function(req, res) {
        // Create a new note and pass the req.body to the entry
        db.Comment.create(req.body)
          .then(function(dbComment) {
            // If a Note was created successfully, find one Article with an `_id` equal to `req.params.id`. Update the Article to be associated with the new Note
            // { new: true } tells the query that we want it to return the updated User -- it returns the original by default
            // Since our mongoose query returns a promise, we can chain another `.then` which receives the result of the query
            return db.Article.findOneAndUpdate({ _id: req.params.id }, { comment: dbComment._id }, { new: true });
          })
          .then(function(dbArticle) {
            // If we were able to successfully update an Article, send it back to the client
            res.json(dbArticle);
          })
          .catch(function(err) {
            // If an error occurred, send it to the client
            res.json(err);
          });
      });     

};