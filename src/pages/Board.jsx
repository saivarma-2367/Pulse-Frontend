import { DndContext } from "@dnd-kit/core";
import { useEffect, useState } from "react";
import { authFetch } from "../services/api";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import "../styles/Tasks.css";

function Board() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    authFetch("/api/tasks").then(setTasks);
  }, []);

  const addTask = (task) => setTasks([task, ...tasks]);

  const updateTask = (updated) =>
    setTasks(tasks.map(t => t._id === updated._id ? updated : t));

  const deleteTask = (id) =>
    setTasks(tasks.filter(t => t._id !== id));

  const handleDragEnd = async (event) => {
    const { active, over } = event;

    if (!over) return;

    const task = tasks.find(t => t._id === active.id);
    if (!task || task.status === over.id) return;

    const updated = await authFetch(`/api/tasks/${task._id}`, {
      method: "PUT",
      body: JSON.stringify({ status: over.id })
    });

    updateTask(updated);
  };

  const logout = () => {
  localStorage.removeItem("token");
  window.location.href = "/";
};


  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="dashboard">
        <div className="header">
  <h1>Pulse Dashboard</h1>
  <button className="logout" onClick={logout}>Logout</button>
</div>

        <TaskForm onTaskAdded={addTask} />
        <TaskList
          tasks={tasks}
          onUpdate={updateTask}
          onDelete={deleteTask}
        />
      </div>
    </DndContext>
  );
}

export default Board;
