import React from "react";
import TaskItem from "./components/taskItem";

import _map from "lodash/map";

import "./TasksList.css";

function TasksList({
  tasks,
  onUpdateTask,
  onDeleteTask,
  onDeleteCompletedTasks,
}) {
  const EmptyTasksList = () => {
    return (
      <div className='tasks-list--empty w-100 h-100 d-flex flex-column align-items-center justify-content-center'>
        <h3 className='text-muted text-capitalize'>
          <i className='fa fa-calendar fa-lg me-2'></i>&nbsp;No tasks added
        </h3>
        <p>Add some tasks to view and manage them here.</p>
      </div>
    );
  };

  return (
    <div className='tasks-list bg-light mx-md-3 mx-sm-2 mb-4 d-flex flex-column'>
      <div className='tasks-list--header p-3 d-flex align-items-center justify-content-between'>
        <h5>
          <i className='fa fa-list-check'></i> Tasks List
        </h5>

        <button className='btn btn-danger' onClick={onDeleteCompletedTasks}>
          <i className='fa fa-trash'></i> Delete Completed Tasks
        </button>
      </div>

      {tasks.length === 0 ? (
        <EmptyTasksList />
      ) : (
        // <div className='tasks-list container mx-auto row g-2 overflow-auto p-3'>
        <div className='tasks-list-container'>
          {_map(tasks, (task) => (
            <TaskItem
              task={task}
              key={task.id}
              onUpdateTask={onUpdateTask}
              onDeleteTask={onDeleteTask}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default TasksList;
