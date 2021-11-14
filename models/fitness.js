const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  day: {
    type: Date,
    default: Date.now,
    required: "First Name is Required",
  },

  exercises: [
    {
      type: String,
      name: String,
      duration: Number,
      weight: Number,
      reps: Number,
      sets: Number,
    },
    {
      toObject: { virtuals: true },
      toJSON: { virtuals: true },
    },
  ],
});

UserSchema.virtual("excercise.date").get(function () {
  return this.day.toDateString();
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
