import React, { useEffect, useState } from "react";
import SubTasks from "./components/subTasks";
import Button from "../../../../components/button";

import uuid from "react-uuid";

import _get from "lodash/get";
import _map from "lodash/map";
import _reject from "lodash/reject";
import _filter from "lodash/filter";

import PrioritySelect from "react-select";

import "./AddTodo.css";

function AddTodo({ onAddNewTask, onCloseModal, defaultPriority }) {
  const defaultTaskState = {
    title: "",
    description: "",
    subTasks: [],
  };
  const [task, setTask] = useState(defaultTaskState);

  useEffect(() => {
    setTask((prevTask) => ({
      ...prevTask,
      priority: defaultPriority,
    }));
  }, [defaultPriority]);

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
    onCloseModal();
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

  const priorityOptions = [
    { label: "Low", value: "low" },
    { label: "Medium", value: "medium" },
    { label: "High", value: "high" },
  ];

  const handlePriorityChanged = ({ value }) => {
    handleInputChange({ target: { name: "priority", value } });
  };

  return (
    <div className='modal'>
      <button className='modal-header btn btn-lg' onClick={onCloseModal}>
        <i className='fa fa-close'></i>
      </button>

      <form
        className='modal-body container-fluid'
        onSubmit={handleAddTaskButtonClicked}
      >
        <div className='modal-body__main p-3 bg-light rounded'>
          <h5 className='text-capitalize'>
            <i className='fa fa-plus'></i> Add your task
          </h5>

          <p className='text-muted'>
            Get started by adding task title and other details can be added
            later.
          </p>

          <div className='mb-2 row align-items-end g-2'>
            <input
              type='text'
              name='title'
              id='title'
              value={task.title}
              onChange={handleInputChange}
              className='title form-control'
              placeholder='Eg: Complete login functionality'
              autoCapitalize='words'
              autoFocus
              required
            />

            <div className='form-group col-md-3'>
              <label htmlFor='priority'>Priority</label>
              <PrioritySelect
                options={priorityOptions}
                value={_filter(priorityOptions, ["value", task.priority])}
                onChange={handlePriorityChanged}
              />
            </div>
          </div>

          <div className='row mb-2'>
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
          </div>

          <SubTasks
            subTasks={task.subTasks}
            onAddNewSubTask={handleAddNewSubTask}
            onSubTaskChange={handleUpdateSubTask}
            onDeleteSubTask={handleDeleteSubTask}
          />
        </div>

        <div className='modal-body__footer text-end float-right'>
          <Button
            buttonText='Add Todo'
            type='submit'
            disabled={task.title.length === 0}
          />
          {/* <button
            className='btn btn-primary'
            disabled={task.title.length === 0}
            type='submit'
          >
            <i className='fa fa-check'></i> Add Task
          </button> */}
        </div>
      </form>
    </div>
  );
}

export default AddTodo;
