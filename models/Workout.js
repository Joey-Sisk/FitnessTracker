const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
  name: {
    type: String,
    required: "Please include a workout name",
  },

  type: {
    type: String,
    required: "Please include a workout type",
  },

  weight: {
    type: Number,
  },

  sets: {
    type: Number,
  },

  reps: {
    type: Number,
  },

  duration: {
    type: Number,
  },

  distance: {
    type: Number,
  },
});

const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;
