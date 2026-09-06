import React from 'react';
import { NavLink } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar navbar-expand navbar-dark bg-dark border-bottom border-secondary px-4 py-3">
      <div className="container-fluid">
        <span className="navbar-brand fw-bold text-primary mb-0">
          ⚡ ApexFit Studio <span className="text-secondary small fw-normal">| Trainer OS</span>
        </span>
        <div className="navbar-nav ms-auto gap-2">
          <NavLink 
            to="/" 
            className={({ isActive }) => `nav-link px-3 rounded ${isActive ? 'bg-primary text-white' : 'text-light'}`}
            end
          >
            Dashboard
          </NavLink>
          <NavLink 
            to="/session" 
            className={({ isActive }) => `nav-link px-3 rounded ${isActive ? 'bg-primary text-white' : 'text-light'}`}
          >
            Active Session
          </NavLink>
          <NavLink 
            to="/analytics" 
            className={({ isActive }) => `nav-link px-3 rounded ${isActive ? 'bg-primary text-white' : 'text-light'}`}
          >
            Analytics
          </NavLink>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;