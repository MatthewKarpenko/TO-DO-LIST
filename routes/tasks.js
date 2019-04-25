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
  res.send("Task created");
});

tasks.put("/:id", async (req, res) => {
  res.send("Updated task");
});

tasks.delete("/:id", async (req, res) => {
  res.send("Deleted task");
});

tasks.get("/:isDone", async (req, res) => {
  const tasks = await Task.find({ isDone: req.params.isDone });
  res.send(tasks);
});

module.exports = tasks;
