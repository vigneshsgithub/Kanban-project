'use client'
import { useState, useEffect } from "react";
import { Dialog } from "@headlessui/react";
import { useForm, useFieldArray } from "react-hook-form";
import { Trash2 } from "lucide-react";

interface Task {
  title: string;
  category: string;
  description: string;
  status: string;
  subTasks: string[];
  _id?: string;
}

interface TaskDialogProps {
  isOpen: boolean;
  onClose: () => void;
  addTask: (task: Task) => void;
}

interface TaskDetailDialogProps {
  isOpen: boolean;
  onClose: () => void;
  task: Task | null;
  updateTask: (id: string, task: Task) => void;
  deleteTask: (id: string) => void;
}

const TaskDialog: React.FC<TaskDialogProps> = ({ isOpen, onClose, addTask }) => {
  const { register, handleSubmit, control, formState: { errors }, reset } = useForm<{
    title: string;
    category: string;
    description: string;
    status: string;
    subTaskFields: { text: string }[];
  }>({
    defaultValues: { 
      title: "", 
      category: "Platform Launch", 
      description: "", 
      subTaskFields: [{ text: "" }], 
      status: "Todo" 
    }
  });

  const { fields, append, remove } = useFieldArray({ 
    control, 
    name: "subTaskFields"
  });

  const onSubmit = (data: {
    title: string;
    category: string;
    description: string;
    status: string;
    subTaskFields: { text: string }[];
  }) => {
    // Convert the subTaskFields array of objects to an array of strings for the API
    const task: Task = {
      title: data.title,
      category: data.category,
      description: data.description,
      status: data.status,
      subTasks: data.subTaskFields
        .filter(item => item.text.trim() !== "")
        .map(item => item.text)
    };
    
    addTask(task);
    reset();
    onClose();
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50">
      <div className="bg-gray-800 p-6 rounded-lg w-2/4">
        <div className="flex justify-between ">
          <h2 className="text-3xl text-white mb-4">Add Task</h2>
          <button onClick={onClose} className="text-white" style={{cursor:"pointer"}}>❌</button>
        </div>
        <hr className="mb-4" />
        <form onSubmit={handleSubmit(onSubmit)}>
          <input {...register("title", { required: "Title is required" })} placeholder="Title" className="w-full p-2 mb-2 outline outline-white" />
          {errors.title && <p className="text-red-500">{errors.title.message}</p>}

          <select {...register("category")} className="w-full p-2 mb-2 outline outline-white">
            <option value="Platform Launch">Platform Launch</option>
            <option value="Marketing Plan">Marketing Plan</option>
          </select>

          <textarea {...register("description", { required: "Description is required" })} placeholder="Description" className="w-full p-2 mb-2 outline outline-white" />
          {errors.description && <p className="text-red-500">{errors.description.message}</p>}

          <p className="text-white text-xl">SubTasks</p>
          {fields.map((item, index) => (
            <div key={item.id} className="flex items-center mb-2">
              <input 
                {...register(`subTaskFields.${index}.text`)} 
                placeholder="SubTask" 
                className="p-2 w-full" 
              />
              <Trash2 className="cursor-pointer ml-2 text-red-500" onClick={() => remove(index)} />
            </div>
          ))}
          <button type="button" onClick={() => append({ text: "" })} className="bg-blue-500 text-white px-4 py-1 rounded mb-4">+ Add SubTask</button>

          <select {...register("status")} className="w-full p-2 my-2 outline outline-white">
            <option value="Todo">Todo</option>
            <option value="Doing">Doing</option>
            <option value="Done">Done</option>
          </select>

          <button type="submit" className="bg-purple-600 text-white px-4 py-2 w-full rounded">Create Task</button>
        </form>
      </div>
    </Dialog>
  );
};

const TaskDetailDialog: React.FC<TaskDetailDialogProps> = ({ isOpen, onClose, task, updateTask, deleteTask }) => {
  const { register, handleSubmit, control, formState: { errors }, reset, setValue } = useForm<{
    title: string;
    category: string;
    description: string;
    status: string;
    subTaskFields: { text: string }[];
  }>();
  
  const { fields, append, remove } = useFieldArray({ 
    control, 
    name: "subTaskFields" 
  });

  // Set form values when task changes
  useEffect(() => {
    if (task) {
      setValue("title", task.title);
      setValue("category", task.category);
      setValue("description", task.description);
      setValue("status", task.status);
      
      // Clear any existing subtasks first
      if (fields.length > 0) {
        // This approach avoids the "cannot remove all fields" error
        for (let i = fields.length - 1; i >= 0; i--) {
          remove(i);
        }
      }
      
      // Add subtasks from the task
      if (Array.isArray(task.subTasks) && task.subTasks.length > 0) {
        task.subTasks.forEach(subtaskText => {
          append({ text: subtaskText });
        });
      } else {
        // Add an empty field if no subtasks
        append({ text: "" });
      }
    }
  }, [task, setValue, append, remove, fields.length]);

  const onSubmit = (data: {
    title: string;
    category: string;
    description: string;
    status: string;
    subTaskFields: { text: string }[];
  }) => {
    if (task && task._id) {
      // Convert the subTaskFields array of objects to an array of strings for the API
      const updatedTask: Task = {
        title: data.title,
        category: data.category,
        description: data.description,
        status: data.status,
        subTasks: data.subTaskFields
          .filter(item => item.text.trim() !== "")
          .map(item => item.text)
      };
      
      updateTask(task._id, updatedTask);
      onClose();
    }
  };

  const handleDelete = () => {
    if (task && task._id) {
      if (window.confirm("Are you sure you want to delete this task?")) {
        deleteTask(task._id);
        onClose();
      }
    }
  };

  if (!task) return null;

  return (
    <Dialog open={isOpen} onClose={onClose} className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50">
      <div className="bg-gray-800 p-6 rounded-lg w-2/4">
        <div className="flex justify-between">
          <h2 className="text-3xl text-white mb-4">Task Details</h2>
          <button onClick={onClose} className="text-white" style={{cursor:"pointer"}}>❌</button>
        </div>
        <hr className="mb-4" />
        <form onSubmit={handleSubmit(onSubmit)}>
          <input {...register("title", { required: "Title is required" })} placeholder="Title" className="w-full p-2 mb-2 outline outline-white" />
          {errors.title && <p className="text-red-500">{errors.title.message}</p>}

          <select {...register("category")} className="w-full p-2 mb-2 outline outline-white">
            <option value="Platform Launch">Platform Launch</option>
            <option value="Marketing Plan">Marketing Plan</option>
          </select>

          <textarea {...register("description", { required: "Description is required" })} placeholder="Description" className="w-full p-2 mb-2 outline outline-white" />
          {errors.description && <p className="text-red-500">{errors.description.message}</p>}

          <p className="text-white text-xl">SubTasks</p>
          {fields.map((item, index) => (
            <div key={item.id} className="flex items-center mb-2">
              <input 
                {...register(`subTaskFields.${index}.text`)} 
                placeholder="SubTask" 
                className="p-2 w-full" 
              />
              <Trash2 className="cursor-pointer ml-2 text-red-500" onClick={() => remove(index)} />
            </div>
          ))}
          <button type="button" onClick={() => append({ text: "" })} className="bg-blue-500 text-white px-4 py-1 rounded mb-4">+ Add SubTask</button>

          <select {...register("status")} className="w-full p-2 my-2 outline outline-white">
            <option value="Todo">Todo</option>
            <option value="Doing">Doing</option>
            <option value="Done">Done</option>
          </select>

          <div className="flex gap-4 mt-4">
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 flex-1 rounded">Update Task</button>
            <button type="button" onClick={handleDelete} className="bg-red-600 text-white px-4 py-2 flex-1 rounded">Delete Task</button>
          </div>
        </form>
      </div>
    </Dialog>
  );
};

const Page = () => {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [todoTasks, setTodoTasks] = useState<Task[]>([]);
  const [doingTasks, setDoingTasks] = useState<Task[]>([]);
  const [doneTasks, setDoneTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  
  // Define your API base URL
  const API_BASE_URL = 'http://localhost:8000';

  const fetchTasks = async () => {
    setIsLoading(true);
    setError("");
    
    try {
      // Fetch all tasks at once
      const response = await fetch(`${API_BASE_URL}/tasks`);
      if (!response.ok) throw new Error(`Failed to fetch tasks: ${response.status}`);
      
      const allTasks = await response.json();
      console.log("All tasks:", allTasks);
      
      // Filter tasks by status
      setTodoTasks(allTasks.filter((task: Task) => task.status === "Todo"));
      setDoingTasks(allTasks.filter((task: Task) => task.status === "Doing"));
      setDoneTasks(allTasks.filter((task: Task) => task.status === "Done"));
      
    } catch (err) {
      console.error("Error fetching tasks:", err);
      setError("Failed to fetch tasks. Please ensure the backend server is running at http://localhost:8000");
      
      // Fallback to localStorage if API fails
      if (typeof window !== 'undefined') {
        const storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
        
        // Filter tasks by status
        setTodoTasks(storedTasks.filter((task: Task) => task.status === "Todo"));
        setDoingTasks(storedTasks.filter((task: Task) => task.status === "Doing"));
        setDoneTasks(storedTasks.filter((task: Task) => task.status === "Done"));
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = async (task: Task) => {
    try {
      console.log("Attempting to add task:", task);
      // Add task via API
      const response = await fetch(`${API_BASE_URL}/tasks/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(task),
      });
      
      console.log("Response status:", response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error("Error response body:", errorText);
        throw new Error(`Failed to add task: ${response.status}`);
      }
      
      const savedTask = await response.json();
      console.log("Successfully saved task:", savedTask);
      
      // After successful addition, refresh task lists
      fetchTasks();
      
    } catch (err) {
      console.error("Error adding task:", err);
      setError("Failed to add task. Please try again.");
      
      // Fallback to localStorage only
      if (typeof window !== 'undefined') {
        const storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
        // Generate a unique ID for localStorage tasks
        const newTask = { ...task, _id: Date.now().toString() };
        const updatedTasks = [...storedTasks, newTask];
        localStorage.setItem("tasks", JSON.stringify(updatedTasks));
        
        // Update UI state
        if (task.status === "Todo") {
          setTodoTasks([...todoTasks, newTask]);
        } else if (task.status === "Doing") {
          setDoingTasks([...doingTasks, newTask]);
        } else if (task.status === "Done") {
          setDoneTasks([...doneTasks, newTask]);
        }
      }
    }
  };

  const updateTask = async (id: string, updatedTask: Task) => {
    try {
      console.log("Updating task:", id, updatedTask);
      const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedTask),
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error("Error response body:", errorText);
        throw new Error(`Failed to update task: ${response.status}`);
      }
      
      // After successful update, refresh task lists
      fetchTasks();
      
    } catch (err) {
      console.error("Error updating task:", err);
      setError("Failed to update task. Please try again.");
      
      // Fallback to localStorage
      if (typeof window !== 'undefined') {
        const storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
        const updatedTasks = storedTasks.map((task: Task) => 
          task._id === id ? { ...updatedTask, _id: id } : task
        );
        localStorage.setItem("tasks", JSON.stringify(updatedTasks));
        
        // Update UI state
        fetchTasks(); // Re-fetch from localStorage
      }
    }
  };

  const deleteTask = async (id: string) => {
    try {
      console.log("Deleting task:", id);
      const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error("Error response body:", errorText);
        throw new Error(`Failed to delete task: ${response.status}`);
      }
      
      // After successful deletion, refresh task lists
      fetchTasks();
      
    } catch (err) {
      console.error("Error deleting task:", err);
      setError("Failed to delete task. Please try again.");
      
      // Fallback to localStorage
      if (typeof window !== 'undefined') {
        const storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
        const updatedTasks = storedTasks.filter((task: Task) => task._id !== id);
        localStorage.setItem("tasks", JSON.stringify(updatedTasks));
        
        // Update UI state
        fetchTasks(); // Re-fetch from localStorage
      }
    }
  };

  const handleTaskClick = (task: Task) => {
    setSelectedTask(task);
    setIsDetailDialogOpen(true);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Task Board</h1>
        <button onClick={() => setIsAddDialogOpen(true)} className="bg-blue-500 text-white px-4 py-2 rounded">+ Add New Task</button>
      </div>
      
      <TaskDialog isOpen={isAddDialogOpen} onClose={() => setIsAddDialogOpen(false)} addTask={addTask} />
      
      <TaskDetailDialog 
        isOpen={isDetailDialogOpen} 
        onClose={() => setIsDetailDialogOpen(false)} 
        task={selectedTask} 
        updateTask={updateTask}
        deleteTask={deleteTask}
      />

      {error && <div className="bg-red-500 text-white p-3 rounded mb-4">{error}</div>}
      
      {isLoading ? (
        <div className="text-center py-8">Loading tasks...</div>
      ) : (
        <div className="grid grid-cols-3 gap-4 mt-6">
          {/* Todo Column */}
          <div className="bg-gray-700 p-4 rounded-lg">
            <h2 className="text-white text-xl mb-4">Todo</h2>
            {todoTasks.length === 0 ? (
              <p className="text-gray-400">No todo tasks</p>
            ) : (
              todoTasks.map((task, index) => (
                <div 
                  key={task._id || index} 
                  className="bg-gray-900 p-4 rounded mb-2 text-white cursor-pointer hover:bg-gray-800 transition-colors"
                  onClick={() => handleTaskClick(task)}
                >
                  <h3 className="text-lg font-bold">{task.title}</h3>
                  <p>{task.description}</p>
                  {task.subTasks && task.subTasks.length > 0 && (
                    <ul className="mt-2">
                      {task.subTasks.map((subTask, subIndex) => (
                        <li key={subIndex} className="text-sm">- {subTask}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))
            )}
          </div>
          
          {/* Doing Column */}
          <div className="bg-gray-700 p-4 rounded-lg">
            <h2 className="text-white text-xl mb-4">Doing</h2>
            {doingTasks.length === 0 ? (
              <p className="text-gray-400">No in-progress tasks</p>
            ) : (
              doingTasks.map((task, index) => (
                <div 
                  key={task._id || index} 
                  className="bg-gray-900 p-4 rounded mb-2 text-white cursor-pointer hover:bg-gray-800 transition-colors"
                  onClick={() => handleTaskClick(task)}
                >
                  <h3 className="text-lg font-bold">{task.title}</h3>
                  <p>{task.description}</p>
                  {task.subTasks && task.subTasks.length > 0 && (
                    <ul className="mt-2">
                      {task.subTasks.map((subTask, subIndex) => (
                        <li key={subIndex} className="text-sm">- {subTask}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))
            )}
          </div>
          
          {/* Done Column */}
          <div className="bg-gray-700 p-4 rounded-lg">
            <h2 className="text-white text-xl mb-4">Done</h2>
            {doneTasks.length === 0 ? (
              <p className="text-gray-400">No completed tasks</p>
            ) : (
              doneTasks.map((task, index) => (
                <div 
                  key={task._id || index} 
                  className="bg-gray-900 p-4 rounded mb-2 text-white cursor-pointer hover:bg-gray-800 transition-colors"
                  onClick={() => handleTaskClick(task)}
                >
                  <h3 className="text-lg font-bold">{task.title}</h3>
                  <p>{task.description}</p>
                  {task.subTasks && task.subTasks.length > 0 && (
                    <ul className="mt-2">
                      {task.subTasks.map((subTask, subIndex) => (
                        <li key={subIndex} className="text-sm">- {subTask}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;