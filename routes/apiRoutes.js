const db = require("../models"); // connects schema to routes

// connects to rest of app
module.exports = function (app) {
  // getLastWorkout --find all--
  app.get("/api/workouts", (req, res) => {
    try {
      db.Workout.aggregate([
        {
          $addFields: {
            totalDuration: {
              $sum: "$exercises.duration",
            },
          },
        },
      ]).then((data) => {
        res.json(data);
      });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

  // addExercise
  app.put("/api/workouts/:id", (req, res) => {
    try {
      db.Workout.findByIdAndUpdate(
        req.params.id,
        { $push: { exercise: req.body } },
        res.json(data)
      );
    } catch (err) {
      res.json({ message: err.message });
    }
  });

  // createWorkout
  app.post("/api/workouts", (req, res) => {
    try {
      db.Workout.create({}, (err, data) => {
        res.json(data);
        // else res.status(400).json(data);
      });
    } catch (err) {
      res.json({ message: err.message });
    }
  });

  // getWorkoutsInRange
  app.get("/api/workouts/range", (req, res) => {
    try {
      db.Workout.aggregate([
        {
          $addFields: {
            totalDuration: {
              $sum: "$exercises.duration",
            },
          },
        },
        {
          $limit: 10,
        },
      ]).then((data) => {
        res.json(data);
      });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
};
