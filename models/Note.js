const mongoose = require("mongoose");

/// Reference to the schema constructor ///
const Schema = mongoose.Schema;

/// Using schema constructor, create new NoteSchema object ///
const NoteSchema = new Schema({
    title: String,
    body: String,
    article: {
        type: Schema.Types.ObjectId,
        href: "Article"
    }
});

/// Create our model from the above schema, using Mongoose model method, then export it ///
const Note = mongoose.model("Note", NoteSchema);

module.exports = Note;