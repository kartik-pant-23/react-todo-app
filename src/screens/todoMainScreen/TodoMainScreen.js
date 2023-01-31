import React, { useState } from "react";
import Navbar from "./components/navbar";
import AddTodo from "./components/addTodo";
import TasksList from "./components/tasksList";
import SideNav from "./components/sidenav";

import uuid from "react-uuid";

import _filter from "lodash/filter";
import _reject from "lodash/reject";
import _get from "lodash/get";
import _map from "lodash/map";
import _size from "lodash/size";

function TodoMainScreen() {
  const [tasks, setTasks] = useState([]);
  const [isSideNavExpanded, setIsSideNavExpanded] = useState(true);

  const handleAddNewTask = (task) => {
    setTasks((prevTasks) => [
      {
        ...task,
        id: uuid(),
      },
      ...prevTasks,
    ]);
  };

  const handleSideNavStateChanged = (expanded) => {
    setIsSideNavExpanded(expanded);
  };

  const handleUpdateTask = (newTask) => {
    // checking if the task is fully completed or not
    const subTasks = _get(newTask, "subTasks");
    const allSubTasksCompleted =
      _size(subTasks) > 0 &&
      _size(_filter(subTasks, "completed")) === _size(subTasks);

    if (newTask.completed || allSubTasksCompleted) {
      newTask = {
        ...newTask,
        completed: true,
        subTasks: _map(subTasks, (subTask) => ({
          ...subTask,
          completed: true,
        })),
      };
    }

    setTasks((prevTasks) =>
      _map(prevTasks, (task) => (task.id === newTask.id ? newTask : task))
    );
  };

  const handleDeleteTask = (taskId) => {
    setTasks((prevTasks) => _reject(prevTasks, ["id", taskId]));
  };

  const handleDeleteCompletedTasks = () => {
    setTasks((prevTasks) => _reject(prevTasks, "completed"));
  };

  return (
    <div className='d-flex flex-column overflow-hidden'>
      <Navbar
        isSideNavExpanded={isSideNavExpanded}
        onSideNavStateChanged={handleSideNavStateChanged}
      />

      <div className='app-body row g-0'>
        {isSideNavExpanded ? (
          <div className='col-md-3 col-sm-6 col-xsm-12'>
            <SideNav onAddNewTask={handleAddNewTask} />
          </div>
        ) : (
          <div></div>
        )}

        <div
          className={`${
            isSideNavExpanded ? "col-md-9 col-sm-6 col-xsm-12" : "col-xsm-12"
          }`}
        >
          <TasksList
            tasks={tasks}
            onDeleteTask={handleDeleteTask}
            onDeleteCompletedTasks={handleDeleteCompletedTasks}
            onUpdateTask={handleUpdateTask}
          />
        </div>
      </div>
    </div>
  );
}

// <div className='main-content container mx-auto'>
//   <div className='row g-2'>
//     <div className='col-md-4'>
//       <AddTodo onAddNewTask={handleAddNewTask} />
//     </div>
//     <div className='col'>
//       <TasksList
//         tasks={tasks}
//         onDeleteTask={handleDeleteTask}
//         onDeleteCompletedTasks={handleDeleteCompletedTasks}
//         onUpdateTask={handleUpdateTask}
//       />
//     </div>
//   </div>
// </div>

export default TodoMainScreen;