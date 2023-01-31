import React, { useState } from "react";
import SubTasks from "./components/subTasks";

import uuid from "react-uuid";

import _get from "lodash/get";
import _map from "lodash/map";
import _reject from "lodash/reject";

function AddTodo({ onAddNewTask }) {
  const defaultTaskState = {
    title: "",
    description: "",
    subTasks: [],
    completed: false,
  };
  const [task, setTask] = useState(defaultTaskState);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };

  const handleAddTaskButtonClicked = (e) => {
    e.preventDefault();
    onAddNewTask({
      ...task,
      id: uuid(),
      createdAt: new Date(),
    });
    setTask(defaultTaskState);
  };

  // functions related to sub-tasks ----------------------------------------
  const handleAddNewSubTask = () => {
    setTask((prevTask) => ({
      ...prevTask,
      subTasks: [
        ...prevTask.subTasks,
        {
          id: uuid(),
          title: "",
          completed: false,
        },
      ],
    }));
  };

  const handleDeleteSubTask = (subTaskId) => {
    setTask((prevTask) => ({
      ...prevTask,
      subTasks: _reject(_get(prevTask, "subTasks"), ["id", subTaskId]),
    }));
  };

  const handleUpdateSubTask = (subTask) => {
    setTask((prevTask) => ({
      ...prevTask,
      subTasks: _map(_get(prevTask, "subTasks"), (value) =>
        value.id === subTask.id ? subTask : value
      ),
    }));
  };
  // ----------------------------------------------------------------------------

  return (
    <form
      className='p-3 bg-light rounded'
      onSubmit={handleAddTaskButtonClicked}
    >
      <h5 className='text-capitalize'>
        <i className='fa fa-plus'></i> Add your task
      </h5>

      <p className='text-muted'>
        Get started by adding task title and other details can be added later.
      </p>

      <div className='form-group mt-4'>
        <input
          type='text'
          name='title'
          id='title'
          value={task.title}
          onChange={handleInputChange}
          className='form-control'
          placeholder='Eg: Complete login functionality'
          autoCapitalize='words'
          autoFocus
          required
        />

        <textarea
          name='description'
          id='description'
          value={task.description}
          cols='30'
          rows='4'
          placeholder='Eg: Add the jsonwebtoken package to return authentication tokens.'
          className='form-control mt-2'
          onChange={handleInputChange}
        ></textarea>

        <SubTasks
          subTasks={task.subTasks}
          onAddNewSubTask={handleAddNewSubTask}
          onSubTaskChange={handleUpdateSubTask}
          onDeleteSubTask={handleDeleteSubTask}
        />
      </div>

      <div className='text-end mt-2'>
        <button
          className='btn btn-primary'
          disabled={task.title.length === 0}
          type='submit'
        >
          <i className='fa fa-check'></i> Add Task
        </button>
      </div>
    </form>
  );
}

export default AddTodo;