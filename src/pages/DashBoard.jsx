import { useEffect, useState } from "react";
import { authFetch } from "../services/api";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";


function DashBoard() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    authFetch("/api/tasks").then(setTasks).catch(() => {
      alert("Unauthorized");
    });
  }, []);

  const addTask = (task) => setTasks([task, ...tasks]);

  const updateTask = (updated) =>
    setTasks(tasks.map(t => t._id === updated._id ? updated : t));

  const deleteTask = (id) =>
    setTasks(tasks.filter(t => t._id !== id));

  return (
    <div className="dashboard">
      <h1>Pulse Dashboard</h1>
      <TaskForm onTaskAdded={addTask} />
      <TaskList
        tasks={tasks}
        onUpdate={updateTask}
        onDelete={deleteTask}
      />
    </div>
  );
}

export default DashBoard;
