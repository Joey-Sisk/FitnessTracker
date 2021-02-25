const db = require("../models"); // connects schema to routes

// ideally I'd like to build these as try/catch's and use async/await instead of .then

// connects to rest of app
module.exports = function (app) {
  // getLastWorkout
  app.get("/api/workouts", (req, res) => {
    db.Workout.aggregate([
      {
        $addFields: {
          totalDuration: { $sum: "$exercises.duration" },
        },
      },
    ])
      .then((data) => {
        res.json(data);
      })
      .catch((error) => {
        res.sendStatus(500).json(error);
      });
  });

  // addExercise
  app.put("/api/workouts/:id", (req, res) => {
    db.Workout.findByIdAndUpdate(
      req.params.id,
      { $push: { exercise: req.body } },
      (err, data) => {
        if (err) return err;
        else res.json(data);
        // else res.status(400).json(data);
      }
    );
  });

  // createWorkout
  app.post("/api/workouts", (req, res) => {
    db.Workout.create({}, (err, data) => {
      if (err) {
        res.send(err);
      } else {
        res.json(data);
      }
      // else res.status(400).json(data);
    });
  });

  // getWorkoutsInRange
  app.get("/api/workouts/range", (req, res) => {
    db.Workout.aggregate([
      {
        $addFields: {
          totalDuration: { $sum: "$exercises.duration" },
        },
      },
      {
        $limit: 10,
      },
    ])
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  });
};
