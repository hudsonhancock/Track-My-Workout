const express = require("express");

const staticPath = path.join(__dirname, "../public");

app.get("/", (req, res) => {
  res.sendFile(path.join(staticPath, "index.html"));
});

app.get("/excercise", (req, res) => {
  res.sendFile(path.join(staticPath, "excercise.html"));
});

app.get("/stats", (req, res) => {
  res.sendFile(path.join(staticPath, "stats.html"));
});