const Joi = require('joi');
const mongoose = require("mongoose");

const Task = mongoose.model(
  "Task",
  new mongoose.Schema({
    text: {
      type: String,
      required: true,
      minlength: 5
    },
    isDone: {
      type: Boolean,
      required: true,
      default: false
    },
    date: {
      type: Date,
      default: Date.now
    }
  })
);

function validateTask(task) {
    const schema = {
        text: Joi.string().min(5).required(),
        isDone: Joi.boolean().required(),
        date: Joi.date()
    };
    return Joi.validate(task, schema);
}

exports.Task = Task;
exports.validate = validateTask;
