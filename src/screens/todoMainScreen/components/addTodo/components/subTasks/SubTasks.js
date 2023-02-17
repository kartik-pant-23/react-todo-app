import React from "react";
import SubTaskInputItem from "./components/subTaskInputItem";

import "./SubTasks.css";

function SubTasks({
  subTasks,
  onAddNewSubTask,
  onSubTaskChange,
  onDeleteSubTask,
}) {
  return (
    <div className='subtasks-container container border rounded p-2 mt-2'>
      {subTasks.map((subTask, idx) => (
        <SubTaskInputItem
          key={subTask.id}
          index={idx}
          subTask={subTask}
          onSubTaskChange={onSubTaskChange}
          onDeleteSubTask={onDeleteSubTask}
        />
      ))}

      <button
        type='button'
        className='btn btn-sm btn-tonal rounded'
        onClick={onAddNewSubTask}
      >
        <i className='fa fa-circle-plus'></i> Add new Sub-Task
      </button>
    </div>
  );
}

export default SubTasks;
