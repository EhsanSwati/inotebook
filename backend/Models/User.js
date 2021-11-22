const mongoose = require("mongoose");
const { Schema } = mongoose;
const UserSchema = new Schema({
  Name: {
    type: "string",
    required: true,
  },
  Email: {
    type: "string",
    unique: true,
    required: true,
  },
  Password: {
    type: "string",
    required: true,
  },
  Genders: {
    type: "string",
    required: true,
  },
  Date: {
    type: "date",
    default: Date.now,
  },
});

module.exports = mongoose.model("User", UserSchema);
