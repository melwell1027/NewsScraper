const mongoose = require("mongoose");

/// Reference to the schema constructor ///
const Schema = mongoose.Schema;

/// Using schema constructor, create new ArticleSchema object ///
const ArticleSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    link: {
        type: String,
        required: true,
        unique: true
    },
    /// 'note' is an object that stores a note Id, with the ref property linking the ObjectId to the Note model. This allows us to populate the Article with an associated Note /// 
    note: {
        type: Schema.Types.ObjectId,
        ref: "Note"
    }
});

/// Create our model from the above schema, using Mongoose model method, then export it ///
const Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;