const mongoose = require("mongoose");
const User = require("./User");

const { Schema } = mongoose;

const TaskShema = new Schema({
  title: {
    type: String,
    required: true,
  },
  userId: {
    type: "objectId",
    ref: "User",
    required: true,
  },

  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Task", TaskShema);
