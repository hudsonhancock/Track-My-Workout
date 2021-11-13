const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const db = require("./models");

const app = express();
const PORT = process.env.PORT || 5001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
}); //this is the homepage

app.get("/exercise", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/exercise.html"));
}); //this is the excercise page

app.get("/stats", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/stats.html"));
}); //this is the stats page

app.put("/api/workouts/:id", (req, res) => {
  console.log(req.body);
});

app.post("/api/workouts", (req, res) => {
  db.Workout.create({}).then(function (response) {
    console.log(response);
    res.json(response);
  });
});

const server = app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
