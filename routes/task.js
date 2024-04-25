const express = require("express");
const router = express.Router();

const { addTask, updateTask, deleteTask, changeStatus, getAllTasks, getTaskById, testTaskAPI } = require("../controllers/task.js");

const { body } = require("express-validator");

//@desc Get User By Id  API
//@route POST task/add
//@access Public
router.post("/add/:id", [body("title", "Enter a valid title"), body("description", "Enter a valid description")], addTask);

//@desc Get User By Id  API
//@route POST task/update:id
//@access Public
router.post("/update/:id", [body("title", "Enter a valid title"), body("description", "Enter a valid description")], updateTask);

//@desc Get User By Id  API
//@route POST task/change-status/:id
//@access Public
router.post("/change-status/:id", [body("status", "Enter a valid status")], changeStatus);

//@desc Get User By Id  API
//@route DELETE task/delete/:id
//@access Public
router.delete("/delete/:id", deleteTask);

//@desc Get User By Id  API
//@route get task/change-status/:id
//@access Public
router.get("/get-all-tasks/:id", getAllTasks);

//@desc Get User By Id  API
//@route get task/change-status/:id
//@access Public
router.get("/get-task-by-id/:id", getTaskById);

//@desc Get User By Id  API
//@route get task/
//@access Public
router.get("/", testTaskAPI);

module.exports = router;
