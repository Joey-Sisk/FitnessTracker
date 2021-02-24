// const Workout = require("../models/workout");
const db = require("../models");

// const { Workout } = require("../models");

module.exports = function (app) {
  // getLastWorkout --find all--
  app.get("/api/workouts", async (req, res) => {
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
  // try {
  //   const workouts = await db.Workout.find();
  //   res.json(workouts);
  // } catch (err) {
  //   res.status(500).json({ message: err.message });
  // }
  // });

  // addExercise PUT req.params.id
  app.put("/api/workouts/:id", (req, res) => {
    // make into try catch
    db.Workout.findByIdAndUpdate(
      req.params.id,
      { $push: { exercise: req.body } },
      (err, data) => {
        if (err) return err;
        else res.json(data);
      }
    );

    // try {
    //   db.Workout.findByIdAndUpdate(req.params.id, {
    //     $push: {
    //       exercise: req.body
    //       // {
    //         // name: req.body.type,
    //         // type: req.body.name,
    //         // weight: req.body.weight,
    //         // sets: req.body.sets,
    //         // reps: req.body.reps,
    //         // duration: req.body.duration,
    //         // distance: req.body.distance,
    //       // },
    //     },
    //   });
    // } catch (err) {
    //   res.status(400).json({ message: err.message });
    // }
  });

  // createWorkout POST req.query.params
  app.post("/api/workouts", async (req, res) => {
    // make into try catch
    db.Workout.create({}, (err, data) => {
      if (err) return err;
      else res.json(data);
    });

    // const workout = new db.Workout(body);
    // try {
    //   const newWorkout = await workout.create();
    //   res.status(201).json(newWorkout);
    // } catch {
    //   res.status(400).json({ message: err.message });
    // }
  });

  // getWorkoutsInRange --find all, aggregration of duration-- --same as first get--
  app.get("/api/workouts/range", async (req, res) => {
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
      // const workouts = await db.Workout.find();
      // res.json(workouts);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
};
