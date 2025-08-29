// backend/index.js
import express from "express";
import cors from "cors";

const app = express();
app.use(cors());            // allow requests from frontend (dev)
app.use(express.json());    // parse JSON bodies

// In-memory data
let tasks = [
  { id: 1, title: "Learn React", completed: false },
  { id: 2, title: "Build API", completed: true },
];

// GET all tasks
app.get("/api/tasks", (req, res) => {
  res.json(tasks);
});

// POST create a task
app.post("/api/tasks", (req, res) => {
  const { title } = req.body || {};
  if (!title) return res.status(400).json({ error: "title is required" });

  const newTask = { id: tasks.length + 1, title, completed: false };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

// PATCH toggle completion
app.patch("/api/tasks/:id", (req, res) => {
  const id = Number(req.params.id);
  const task = tasks.find((t) => t.id === id);
  if (!task) return res.status(404).json({ error: "not found" });

  task.completed = !task.completed;
  res.json(task);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`API running on http://localhost:${PORT}`));
