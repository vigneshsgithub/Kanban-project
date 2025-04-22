import express from "express";
import { getAllTasks, getTasksByStatus, addNewTask, updateTask, deleteTask } from "../controllers/task.controller.js";

const router = express.Router();

// Get all tasks
router.get("/", getAllTasks);

// Get tasks by status
router.get("/:status", getTasksByStatus);

// Add new task
router.post("/", addNewTask);

// Update task
router.patch("/:id", updateTask);

// Delete task
router.delete("/:id", deleteTask);

export default router;