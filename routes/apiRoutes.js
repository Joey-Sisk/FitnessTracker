const express = require("express");
const Workout = require("../models/workout");

// const { Workout } = require("../models");

module.exports = function (app) {
  // getLastWorkout --find all--
  app.get("/api/workouts/:id", async (req, res) => {
    try {
      const workouts = await Workout.find();
      res.json(workouts);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

  // addExercise PUT req.params.id
  app.put("/workouts/:id", (req, res) => {
    try {
      Workout.findByIdAndUpdate(
        {
          $push: {
            exercise: {
              name: req.body.type,
              type: req.body.name,
              weight: req.body.weight,
              sets: req.body.sets,
              reps: req.body.reps,
              duration: req.body.duration,
              distance: req.body.distance,
            },
          },
        }
      )
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });

  // createWorkout POST req.query.params
  app.post("/api/workouts", ({ body }, res) => {
    const workout = new Workout(body);
    try {
      const newWorkout = await workout.create();
      res.status(201).json(newWorkout);
    } catch {
      res.status(400).json({ message: err.message });
    }
  });

  // getWorkoutsInRange --find all, aggregration of duration-- --same as first get--
  app.get("/api/workouts/range", async (req, res) => {
    try {
      const workouts = await Workout.find();
      res.json(workouts);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
};

async function getWorkouts(req, res, next) {
  let workout;
  try {
    workout = await Workout.findById(req.params.id);
    if (subscriber == null) {
      return res.status(404).json({ message: "Cannot find data" }); // 404 means not found
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.workout = workout;
  next();
}
