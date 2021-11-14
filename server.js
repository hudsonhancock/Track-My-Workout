const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const db = require("./models");
const router = require("express").Router();

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
  db.Workout.create({})
    .then((newWorkout) => {
      res.json(newWorkout);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
}); //this is the post route for the workout

app.get("/api/workouts", (req, res) => {
  db.Workout.find({})
    .then((workout) => {
      console.log(workout);
      res.json(workout);
    })
    .catch((err) => {
      res.json(err);
    });
}); //this is the get route for the workout

app.post("/api/workouts", (req, res) => {
  db.Workout.create({})
    .then(function (response) {
      console.log(response);
      res.json(response);
    })
    .catch(function (err) {
      res.json(err);
      console.log("error");
    });
}); //this is the post route for the workout

app.put("/api/workouts/:id", (req, res) => {
  const id = req.params.id;
  const body = req.body;

  db.Workout.findOneAndUpdate({ _id: id }, { $push: { exercises: body } })
    .then((data) => {
      console.log(data);
      res.json(data);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

app.put("/api/workouts/:id", (req, res) => {
  const id = req.params.id;
  const body = req.body;

  db.Workout.findOneAndUpdate(
    { _id: id },
    { $push: { exercises: body } },
    { new: true, runValidators: true }
  )
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

app.get("/api/workouts/range", (req, res) => {
  db.Workout.find({})
    .sort({ date: -1 })
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

const server = app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
