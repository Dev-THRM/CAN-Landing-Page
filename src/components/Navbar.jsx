import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../assets/can logo.png';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <div className="logo" style={{ display: 'flex', alignItems: 'center' }}>
          <img src={logo} alt="CAN Logo" style={{ height: '40px', objectFit: 'contain' }} />
        </div>
      </div>
      
      <div className="navbar-center">
        <ul className="nav-links">
          <li>
            <NavLink to="/" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/technology" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
              Technology
            </NavLink>
          </li>
          <li>
            <NavLink to="/blog" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
              Blog
            </NavLink>
          </li>
          <li>
            <NavLink to="/contact" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
              Contact
            </NavLink>
          </li>
        </ul>
      </div>

      <div className="navbar-right">
        <button className="btn-nav-primary">IQ World App</button>
      </div>
    </nav>
  );
};

export default Navbar;
