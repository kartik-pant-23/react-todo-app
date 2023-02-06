import React from "react";

import classNames from "classnames";

import "./SubTaskItem.css";

function SubTaskItem({ subTask, onUpdateSubTask }) {
  return (
    <div
      className={`subtask ms-3 mt-1 ${classNames({
        "text-muted task_item--checked": subTask.completed,
      })}`}
    >
      <div className='subtask-body d-flex align-items-start text-sm mt-2'>
        <input
          className='me-2 mt-2'
          type='checkbox'
          checked={subTask.completed}
          onChange={(e) =>
            onUpdateSubTask({
              ...subTask,
              completed: !subTask.completed,
            })
          }
        />
        <p className='mb-0 text-justify'>{subTask.title}</p>
      </div>
    </div>
  );
}

export default SubTaskItem;
