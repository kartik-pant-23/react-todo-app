import React from "react";

function SubTaskItem({ subTask, onUpdateSubTask }) {
  return (
    <div
      className={`ms-3 mt-1 ${
        subTask.completed ? "task_item--checked text-muted" : ""
      }`}
    >
      <div className='d-flex align-items-start text-sm'>
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
        <p className='text-justify'>{subTask.title}</p>
      </div>
    </div>
  );
}

export default SubTaskItem;
