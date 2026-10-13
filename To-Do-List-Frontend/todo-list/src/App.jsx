import { useState } from "react";

function App() {
  const [task, setTask] = useState("");
  const [description, setDescription] = useState("");
  const [tasks, setTasks] = useState([]);
  const [editId, setEditId] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (task.trim() === "") {
      alert("Enter task name");
      return;
    }

    if (editId === null) {
      setTasks([
        ...tasks,
        { id: Date.now(), task, description, status: "Pending" }
      ]);
    } else {
      setTasks(tasks.map((t) =>
        t.id === editId ? { ...t, task, description } : t
      ));
      setEditId(null);
    }

    setTask("");
    setDescription("");
  };

  const editTask = (t) => {
    setTask(t.task);
    setDescription(t.description);
    setEditId(t.id);
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));
    if (editId === id) {
      setTask("");
      setDescription("");
      setEditId(null);
    }
  };

  const toggleStatus = (id) => {
    setTasks(tasks.map((t) =>
      t.id === id
        ? { ...t, status: t.status === "Pending" ? "Completed" : "Pending" }
        : t
    ));
  };

  return (
    <div>
      <h1>To-Do List</h1>
      <form onSubmit={handleSubmit}>
        <input aria-label="Task name" placeholder="Task name" value={task}
          onChange={(e) => setTask(e.target.value)} />
        <input aria-label="Description" placeholder="Description" value={description}
          onChange={(e) => setDescription(e.target.value)} />
        <button type="submit">{editId === null ? "Add Task" : "Update Task"}</button>
      </form>
      <h2>Tasks</h2>
      {tasks.map((t) => (
        <div key={t.id}>
          <p>Task: {t.task}</p>
          <p>Description: {t.description}</p>
          <p>Status: {t.status}</p>
          <button onClick={() => editTask(t)}>Edit</button>
          <button onClick={() => deleteTask(t.id)}>Delete</button>
          <button onClick={() => toggleStatus(t.id)}>Change Status</button>
          <hr />
        </div>
      ))}
    </div>
  );
}

export default App;
