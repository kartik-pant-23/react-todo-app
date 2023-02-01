import React, { useState } from "react";

import AddTodoModal from "react-modal";
import AddTodo from "../addTodo";

function SideNav({ onAddNewTask }) {
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
    <nav className='h-100 p-4'>
      <div>
        <h6 className='text-uppercase text-muted mb-3'>Filter By</h6>

        <ul className='nav nav-pills nav-fill flex-column'>
          <li className='nav-item'>
            <button className='nav-link active'>All</button>
          </li>
          <li className='nav-item'>
            <button className='nav-link'>Important</button>
          </li>
          <li className='nav-item'>
            <button className='nav-link'>Home</button>
          </li>
          <li className='nav-item'>
            <button className='nav-link'>Work</button>
          </li>
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
        <AddTodo onAddNewTask={onAddNewTask} onCloseModal={handleCloseModal} />
      </AddTodoModal>
    </nav>
  );
}

export default SideNav;
