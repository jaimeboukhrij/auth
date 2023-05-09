const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  username: {
    type: String,
    unique: true
  },
  password: String,
  date: Date,
  city: String,
  FavPilot: String
});

const User = model("User", userSchema);

module.exports = User;
