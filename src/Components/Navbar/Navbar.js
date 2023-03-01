import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
      <NavLink to="/" className="navbar-heading" style={{color: '#007bff', fontStyle: 'italic'}}><h1>MyWeblink</h1></NavLink>
      <ul className="navbar-list">
          <li><NavLink to="/" className="navbar-link">Home</NavLink></li>
          <li><NavLink to="/products" className="navbar-link">Products</NavLink></li>
          <li><NavLink to="/aboutus" className="navbar-link">About Us</NavLink></li>
        </ul>
    </div>
    </nav>
  );
}

export default Navbar;