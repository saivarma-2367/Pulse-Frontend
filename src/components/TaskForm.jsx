import React, { useState } from 'react'
import { authFetch } from '../services/api.js';

function TaskForm(onTaskAdded) {
    const [title,setTitle]=useState("");
    const [priority,setPriority]=useState("medium");

    const handleSubmit = async(e)=>{
        e.preventDefault();

        if(!title)return;

        const task=await authFetch("http://localhost:5001/api/tasks",{
            method:"POST",
            body: JSON.stringify({ title, priority })
        })
        onTaskAdded(task);
    setTitle("");
    }
  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        placeholder="New task..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <select value={priority} onChange={(e) => setPriority(e.target.value)}>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>

      <button>Add</button>
    </form>
  )
}

export default TaskForm
