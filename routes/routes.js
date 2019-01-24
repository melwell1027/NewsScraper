/// Scraping tools ///
const axios = require('axios');
const cheerio = require('cheerio');

const mongoose = require('mongoose');
const db = require("../models");
mongoose.connect("mongodb://localhost/newsdb", { useNewUrlParser: true });

module.exports = function (app) {
    // GET route for scraping website
    app.get("/scrape", function (req, res) {
        /// Scrape the body of the HTML from the below link using axios ///
        axios.get("https://www.chicagotribune.com/news/local/breaking/").then(function (response) {
            /// Then load that info into cheerio and save it to $ for shorthand selector
            const $ = cheerio.load(response.data);

            /// Gran every a tag with the listed class
            $("a.trb_outfit_relatedListTitle_a").each(function (i, element) {
                /// Save empty results object ///
                const results = {};

                /// Add the text and href of every article and save them into the results object
                results.title = $(this).text();
                results.link = $(this).attr("href");

                /// Create new Article usign the 'results' object built from scraping above ///
                db.Article.create(results)
                    .then(function (dbArticle) {
                        /// View the added result in the console ///
                        console.log(dbArticle);
                    })
                    .catch(function (err) {
                        /// Log error if it occurred ///
                        console.log(err)
                    });
            });
            res.send("Scrape complete");
        });
    });


    /// Route for getting the Articles from the db ///
    app.get("/articles", function (req, res) {
        /// Grab every document in the Articles collection ///
        db.Article.find({})
            .then(function (dbArticle) {
                /// If get route successfully found Articles, send then back to client ///
                res.json(dbArticle)
            })
            .catch(function (err) {
                /// Log error if it occurred ///
                res.json(err)
            });
    });

    /// Route for getting a specific Article by id, populate it with it's note ///
    app.get("/articles/:id", function (req, res) {
        /// Using the id passed into the parameter, prepare a query that finds the matching article in the db ///
        db.Article.findOne({ _id: req.params.id })
            /// then populate all the notes associated with it ///
            .populate("note")
            .then(function (dbArticle) {
                /// If get route successfully found the article by Id, send it back to client ///
                res.json(dbArticle);
            })
            .catch(function (err) {
                /// Log error if it occurred ///
                res.json(err);
            })
    })
}


