import React from "react";

function Navbar({ isSideNavExpanded, onSideNavStateChanged }) {
  const expandSideNav = () => {
    onSideNavStateChanged(true);
  };

  const closeSideNav = () => {
    onSideNavStateChanged(false);
  };

  return (
    <nav className='app-nav navbar'>
      <div className='container-fluid justify-content-start'>
        {isSideNavExpanded ? (
          <button className='btn' onClick={closeSideNav}>
            <i className='fa fa-close'></i>
          </button>
        ) : (
          <button className='btn' onClick={expandSideNav}>
            <i className='fa fa-bars'></i>
          </button>
        )}

        <a
          href='https://tekion.com'
          className='navbar-brand ms-2'
          target='_blank'
          rel='noreferrer'
        >
          Tekion To-Do App
        </a>
      </div>
    </nav>
  );
}

export default Navbar;
