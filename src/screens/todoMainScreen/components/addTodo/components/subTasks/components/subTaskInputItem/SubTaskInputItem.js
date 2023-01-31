import React from "react";

function SubTaskInputItem({
  index,
  subTask,
  onSubTaskChange,
  onDeleteSubTask,
}) {
  return (
    <div className='d-flex align-items-center mb-2'>
      <input
        type='text'
        name={`${subTask.id}`}
        id={`${subTask.id}`}
        className='form-control form-control-sm'
        value={subTask.title}
        onChange={(e) =>
          onSubTaskChange({
            ...subTask,
            title: e.target.value,
          })
        }
        placeholder={`Subtask ${index + 1}`}
        autoFocus
        required
      />
      <i
        className='ms-2 fa fa-minus-circle text-danger'
        style={{ cursor: "pointer" }}
        onClick={() => onDeleteSubTask(subTask.id)}
      ></i>
    </div>
  );
}

export default SubTaskInputItem;
