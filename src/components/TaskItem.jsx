import { authFetch } from "../services/api";
import "../styles/Tasks.css";

function TaskItem({ task, onUpdate, onDelete }) {
  const updateStatus = async (status) => {
    const updated = await authFetch(`/api/tasks/${task._id}`, {
      method: "PUT",
      body: JSON.stringify({ status })
    });
    onUpdate(updated);
  };

  const deleteTask = async () => {
    await authFetch(`/api/tasks/${task._id}`, {
      method: "DELETE"
    });
    onDelete(task._id);
  };

  return (
    <div className={`task ${task.status}`}>
      <span>{task.title}</span>

      <div className="actions">
        {task.status !== "todo" && (
          <button onClick={() => updateStatus("todo")}>Todo</button>
        )}
        {task.status !== "doing" && (
          <button onClick={() => updateStatus("doing")}>Doing</button>
        )}
        {task.status !== "done" && (
          <button onClick={() => updateStatus("done")}>Done</button>
        )}

        <button className="delete" onClick={deleteTask}>✕</button>
      </div>
    </div>
  );
}

export default TaskItem;
