import React from "react";
import "./TaskItem.css";
import SubTaskItem from "./components/subTaskItem";

import _map from "lodash/map";
import _get from "lodash/get";

import classNames from "classnames";

function TaskItem({ task, onDeleteTask, onUpdateTask }) {
  const handleUpdateSubTask = (newSubTask) => {
    onUpdateTask({
      ...task,
      completed: newSubTask.completed ? task.completed : false,
      subTasks: task.subTasks.map((subTask) =>
        subTask.id === newSubTask.id ? newSubTask : subTask
      ),
    });
  };

  const priorityStyles = {
    low: "low",
    medium: "medium",
    high: "high",
  };
  const _classNames = classNames.bind(priorityStyles);

  return (
    // <div className='col-lg-4 col-md-6 col-sm-12'>
    <div className='task-container'>
      <div className='card border-0'>
        <div className='card-body'>
          <div className='card-body--header d-flex align-items-center'>
            <input
              type='checkbox'
              name='checked'
              id='checked'
              checked={_get(task, "completed")}
              onChange={() =>
                onUpdateTask({
                  ...task,
                  completed: !_get(task, "completed"),
                })
              }
            />
            <h5
              className={`card-title text-capitalize m-0 ms-2 ${classNames({
                "text-muted task_item--checked": _get(task, "completed"),
              })}`}
            >
              {task.title}
            </h5>
          </div>
          <div
            className={classNames(
              "priority",
              `priority-${_classNames({
                [_get(task, "priority")]: true,
              })}`
            )}
          >
            {task.priority}
          </div>
          <p className='card-text text-muted my-2'>
            {task.description || "No description added"}
          </p>
          <div className='subtask-section'>
            {_map(_get(task, "subTasks"), (subTask) => (
              <SubTaskItem
                subTask={subTask}
                onUpdateSubTask={handleUpdateSubTask}
                key={subTask.id}
              />
            ))}
          </div>
          <button
            className='btn btn-outline-danger btn-sm mt-3'
            onClick={() => onDeleteTask(task.id)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default TaskItem;
