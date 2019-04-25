const mongoose = require("mongoose");
const express = require("express");

const { Task, validate } = require("../models/task");
const tasks = express.Router();

tasks.get("/", async (req, res) => {
  const tasks = await Task.find().sort("date");
  res.send(tasks);
});

tasks.post("/", async (req, res) => {
  let task = new Task({
    text: req.body.text,
    isDone: req.body.isDone,
    date: req.body.date
  });

  task = await task.save();
  res.send(task);
});

tasks.put("/:id", async (req, res) => {

  //let date = await Task.findById(req.params.id).date;

  //console.log(date);

  //date = date.date;

  //console.log(date);

  if(!req.body.date)
  {
    //let date = await Task.findById(req.params.id).date;

    const task = await Task.findByIdAndUpdate(
      req.params.id,
      {
        text: req.body.text,
        isDone: req.body.isDone
        //date: req.body.date
      },
      { new: true }
    );

    res.send(task);
  } else {
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      {
        text: req.body.text,
        isDone: req.body.isDone,
        date: req.body.date
      },
      { new: true }
    );

    res.send(task);
  }

  
});

tasks.delete("/:id", async (req, res) => {
  const task = await Task.findByIdAndRemove(req.params.id);

  if (!task) {
    return res.status(404).send("The task with given ID was not found");
  }

  res.send(task);

  res.send("Deleted task");
});

tasks.get("/isDone=:isDone", async (req, res) => {
  const tasks = await Task.find({ isDone: req.params.isDone });
  res.send(tasks);
});

module.exports = tasks;
