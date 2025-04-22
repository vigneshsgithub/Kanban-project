import { Tasks } from "../models/Task.model.js";

const getAllTasks = async (req, res) => {
  try {
    const tasks = await Tasks.find();
    return res.status(200).send(tasks);
  } catch (error) {
    console.error("Error fetching all tasks:", error);
    res.status(500).send({ message: "Error fetching tasks", error: error.message });
  }
};

const getTasksByStatus = async (req, res) => {
  const status = req.params.status;
  try {
    const tasks = await Tasks.find({ status });
    return res.status(200).send(tasks);
  } catch (error) {
    console.error(`Error fetching ${status} tasks:`, error);
    res.status(500).send({ message: `Error fetching ${status} tasks`, error: error.message });
  }
};

const addNewTask = async (req, res) => {
  try {
    console.log("Request body:", req.body);
    const task = new Tasks(req.body);
    const savedTask = await task.save();
    console.log("Saved task:", savedTask);
    return res.status(201).send(savedTask);
  } catch (error) {
    console.error("Error adding task:", error);
    res.status(500).send({ message: "Failed to add task", error: error.message });
  }
};

const updateTask = async (req, res) => {
  const { id } = req.params;
  try {
    console.log("Update request:", id, req.body);
    
    const updatedTask = await Tasks.findByIdAndUpdate(
      id, 
      req.body, 
      { new: true, runValidators: true }
    );
    
    if (!updatedTask) {
      return res.status(404).send({ message: "Task not found" });
    }
    
    console.log("Updated task:", updatedTask);
    return res.status(200).send(updatedTask);
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).send({ message: "Unable to update, Please try again", error: error.message });
  }
};

const deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    const task = await Tasks.findByIdAndDelete(id);
    
    if (!task) {
      return res.status(404).send({ message: "Task not found" });
    }
    
    return res.status(200).send({ message: "Task deleted successfully" });
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).send({ message: "Unable to delete, Please try again", error: error.message });
  }
};

export { getAllTasks, getTasksByStatus, addNewTask, updateTask, deleteTask };