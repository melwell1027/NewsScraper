/// Dependencies ///
const express = require('express');
const logger = require('morgan');
// const mongoose = require('mongoose');

/// Require models ///
// const db = require("./models");

/// Express Configuration and PORT ///
const app = express()
const PORT = process.env.PORT || 3000

/// Use morgan logger for logging requests ///
app.use(logger("dev"));

/// Set up the Express app to handle data parsing ///
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

/// Make public static folder ///
app.use(express.static('public'));

/// Connect to the Mongo Database ///
// mongoose.connect("mongodb://localhost/newsdb", { useNewUrlParser: true });

/// Routes ///
require("./routes/routes")(app);

/// Start the server ///
app.listen(PORT, function () {
    console.log("App running on port " + PORT + "!");
});