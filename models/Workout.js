const mongoose = require("mongoose");

const workoutSchema = new mongoose.Schema({
  day: {
    type: Date,
    default: Date.now,
  },

  exercise: [
    {
      name: {
        type: String,
        trim: true,
        required: "Please include a workout name",
      },

      type: {
        type: String,
        trim: true,
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
        required: "Please include a workout duration",
      },

      distance: {
        type: Number,
      },
    },
  ],
});

module.exports = mongoose.model("Workout", workoutSchema);
