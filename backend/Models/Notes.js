const mongoose = require("mongoose");

const NotesSchema = new Schema({
  Title: {
    type: "string",
    required: true,
  },
  Description: {
    type: "string",
    required: true,
  },
  tag: {
    type: "string",
    default: "General",
  },
  Date: {
    type: "date",
    default: Date.now,
  },
});

module.exports = mongoose.model("Notes", NotesSchema);
