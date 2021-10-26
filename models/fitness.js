const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  day: {
    type: Date,
    default: Date.now,
    required: "First Name is Required",
  },

  excercise: [
    {
      type: String,
      name: String,
      duration: Number,
      weight: Number,
      reps: Number,
      sets: Number,
    },
  ],
});

const User = mongoose.model("User", UserSchema);

module.exports = User;