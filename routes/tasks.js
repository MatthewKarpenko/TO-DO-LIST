const mongoose = require("mongoose");
const express = require("express");

const { Task, validate } = require("../models/task");
const tasks = express.Router();

tasks.get("/", async (req, res) => {
  const tasks = await Task.find();
  //console.log(tasks);
  res.send(tasks);
  //res.send("Task");
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
