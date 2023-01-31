import React from "react";

function SideNav({ onAddNewTask }) {
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

      <button
        className='btn-tonal rounded mt-5'
        onClick={() =>
          onAddNewTask({
            title: "Some task title",
            description: "some task description",
            completed: false,
          })
        }
      >
        <i className='fa fa-plus-circle'></i> Add To-do
      </button>
    </nav>
  );
}

export default SideNav;
