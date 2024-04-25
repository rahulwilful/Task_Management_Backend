const Task = require("../models/Task.js");

const { validationResult, matchedData } = require("express-validator");

const testTaskAPI = async (req, res) => {
  return res.status(200).send("Task API test successfull");
};

const addTask = async (req, res) => {
  const data = matchedData(req);
  const id = req.params.id;
  console.log("data : ", data, " id : ", id);

  try {
    const task = await Task.create({
      title: data.title,
      description: data.description,
      userId: id,
      status: "started",
    });

    res.status(201).json({ result: task, message: "Task Added" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    const data = matchedData(req);
    console.log("data : ", data);
    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      {
        title: data.title,
        description: data.description,
        updatedAt: Date.now(),
      },
      { new: true }
    );
    if (!updatedTask) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.status(201).json({ result: updatedTask, message: "Task Updated" });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ error: error.message });
  }
};

const changeStatus = async (req, res) => {
  try {
    const taskId = req.params.id;
    const data = matchedData(req);
    console.log("data : ", data);
    const updatedTask = await Task.findByIdAndUpdate(taskId, { status: data.status }, { new: true });
    if (!updatedTask) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    const deletedTask = await Task.findByIdAndDelete(taskId);
    if (!deletedTask) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllTasks = async (req, res) => {
  const id = req.params.id;
  try {
    const tasks = await Task.find({ userId: id });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getTaskById = async (req, res) => {
  try {
    const taskId = req.params.id;
    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  addTask,
  updateTask,
  deleteTask,
  changeStatus,
  getAllTasks,
  getTaskById,
  testTaskAPI,
};
