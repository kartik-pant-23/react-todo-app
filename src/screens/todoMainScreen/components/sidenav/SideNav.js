import React, { useState } from "react";

import classNames from "classnames";

import _get from "lodash/get";
import _find from "lodash/find";

import AddTodoModal from "react-modal";
import AddTodo from "../addTodo";

import "./SideNav.css";

function SideNav({ onAddNewTask, priorityFilter, onChangePriorityFilter }) {
  const [showModal, setShowMadal] = useState(false);

  const modalStyle = {
    overlay: {
      background: "rgba(0, 0, 0, 0.5)",
    },
    content: {
      border: "none",
      boxShadow: "0 0 16px rgba(0,0,0,0.25)",
      margin: "auto",
      height: "500px",
      maxWidth: "850px",
      borderRadius: "0",
      padding: "0.5rem",
    },
  };

  const handleShowModal = () => {
    setShowMadal(true);
  };

  const handleCloseModal = () => {
    setShowMadal(false);
  };

  return (
    <nav className='side-nav h-100 p-4'>
      <div>
        <h6 className='text-uppercase text-muted mb-3'>Filter By Priority</h6>

        <ul className='nav nav-pills nav-fill flex-column'>
          {Object.keys(priorityFilter).map((filterValue) => (
            <li className='nav-item' key={filterValue}>
              <button
                className={classNames("text-capitalize", "nav-link", {
                  active: _get(priorityFilter, filterValue),
                })}
                onClick={() => onChangePriorityFilter(filterValue)}
              >
                {filterValue}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <button className='btn-tonal rounded mt-5' onClick={handleShowModal}>
        <i className='fa fa-plus-circle'></i> Add To-do
      </button>

      <AddTodoModal
        isOpen={showModal}
        style={modalStyle}
        shouldCloseOnOverlayClick={true}
        onRequestClose={handleCloseModal}
        appElement={document.getElementById("root")}
        portalClassName=''
      >
        <AddTodo
          onAddNewTask={onAddNewTask}
          onCloseModal={handleCloseModal}
          defaultPriority={
            _get(priorityFilter, "all")
              ? "low"
              : _find(Object.keys(priorityFilter), (value) =>
                  _get(priorityFilter, value)
                )
          }
        />
      </AddTodoModal>
    </nav>
  );
}

export default SideNav;
