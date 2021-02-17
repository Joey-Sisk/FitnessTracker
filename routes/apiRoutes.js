const { Workout } = require("../models");

const router = require("express").Router();

// getLastWorkout --find all--
router.get("/api/workouts:id", (req, res) => {
  Workout.find({})
    .then((workouts) => {
      res.json(workouts);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

// addExercise PUT req.params.id

// createWorkout POST req.query.params
router.post("/api/workouts", ({ body }, res) => {
  const workout = new Workout(body);
  Workout.create(body)
    .then((workouts) => {
      res.json(workouts);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

// getWorkoutsInRange --find all, aggregration of duration-- --same as first get--
router.get("/api/workouts/range", (req, res) => {
  Workout.find({})
    .then((workouts) => {
      res.json(workouts);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

module.exports = router;
