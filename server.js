const express = require("express");
const path = require("path");
const logger = require("morgan");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3000;

const db = require("./models");

const Workout = require("./models/Workout.js");
const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/userdb", {
  useNewUrlParser: true,
});

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});



app.get("/stats", function (req, res) {
  res.sendFile(path.join(__dirname, "./public/stats.html"));
});

app.get("/exercise", function (req, res) {
  res.sendFile(path.join(__dirname, "./public/exercise.html"));
});
