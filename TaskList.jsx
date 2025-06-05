import React, { useState } from "react";

const initialTasks = [
  { id: 1, title: "Buy groceries", completed: false },
  { id: 2, title: "Read a book", completed: true }
];

export default function TaskList() {
  const [tasks, setTasks] = useState(initialTasks);
  const [newTask, setNewTask] = useState("");
  const [filter, setFilter] = useState("all"); // all, completed, pending
  const [error, setError] = useState("");

  const addTask = () => {
    if (!newTask.trim()) {
      setError("Task title cannot be empty");
      return;
    }
    setError("");
    const nextId = tasks.length ? Math.max(...tasks.map(t => t.id)) + 1 : 1;
    setTasks([...tasks, { id: nextId, title: newTask.trim(), completed: false }]);
    setNewTask("");
  };

  const toggleCompleted = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === "completed") return task.completed;
    if (filter === "pending") return !task.completed;
    return true;
  });

  return (
    <div style={{ maxWidth: 400, margin: "2rem auto", fontFamily: "Arial, sans-serif" }}>
      <h2>Task List</h2>

      <div style={{ marginBottom: "1rem" }}>
        <input
          type="text"
          placeholder="New task..."
          value={newTask}
          onChange={e => setNewTask(e.target.value)}
          onKeyDown={e => {
            if (e.key === "Enter") addTask();
          }}
          style={{ padding: "0.5rem", width: "70%" }}
        />
        <button onClick={addTask} style={{ padding: "0.5rem", marginLeft: "0.5rem" }}>
          Add
        </button>
        {error && <div style={{ color: "red", marginTop: "0.5rem" }}>{error}</div>}
      </div>

      <div style={{ marginBottom: "1rem" }}>
        <button
          onClick={() => setFilter("all")}
          style={{
            marginRight: "0.5rem",
            backgroundColor: filter === "all" ? "#007bff" : "#ddd",
            color: filter === "all" ? "white" : "black",
            padding: "0.3rem 0.6rem",
            border: "none",
            cursor: "pointer"
          }}
        >
          All
        </button>
        <button
          onClick={() => setFilter("pending")}
          style={{
            marginRight: "0.5rem",
            backgroundColor: filter === "pending" ? "#007bff" : "#ddd",
            color: filter === "pending" ? "white" : "black",
            padding: "0.3rem 0.6rem",
            border: "none",
            cursor: "pointer"
          }}
        >
          Pending
        </button>
        <button
          onClick={() => setFilter("completed")}
          style={{
            backgroundColor: filter === "completed" ? "#007bff" : "#ddd",
            color: filter === "completed" ? "white" : "black",
            padding: "0.3rem 0.6rem",
            border: "none",
            cursor: "pointer"
          }}
        >
          Completed
        </button>
      </div>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {filteredTasks.length === 0 && <li>No tasks found.</li>}
        {filteredTasks.map(task => (
          <li
            key={task.id}
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "0.5rem",
              textDecoration: task.completed ? "line-through" : "none",
              color: task.completed ? "gray" : "black"
            }}
          >
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleCompleted(task.id)}
              style={{ marginRight: "0.5rem" }}
            />
            <span style={{ flexGrow: 1 }}>{task.title}</span>
            <button
              onClick={() => deleteTask(task.id)}
              style={{
                backgroundColor: "red",
                color: "white",
                border: "none",
                padding: "0.25rem 0.5rem",
                cursor: "pointer"
              }}
              aria-label={`Delete task ${task.title}`}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
