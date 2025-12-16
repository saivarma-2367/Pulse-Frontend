import React from 'react';
import "../styles/Tasks.css";
import TaskItem from './TaskItem.jsx';

function TaskList({tasks,onDelete,onUpdate}) {

    const groups={
        todo:[],
        doing:[],
        done:[]
    };

    tasks.forEach(task=>groups[task.status].push(task));

  return (
    <div className="task-columns">
      {Object.keys(groups).map(status => (
        <div key={status} className="column">
          <h3>{status.toUpperCase()}</h3>
          {groups[status].map(task => (
            <TaskItem
              key={task._id}
              task={task}
              onUpdate={onUpdate}
              onDelete={onDelete}
            />
          ))}
        </div>
      ))}
    </div>
  )
}

export default TaskList
