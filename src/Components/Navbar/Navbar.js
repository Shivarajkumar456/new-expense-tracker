import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { authAction } from "../../store/authReducer";
import './Navbar.css';

function Navbar() {
  const isLoggedIn = useSelector(state=> state.auth.isLoggedin);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutHandler = (e) => {
    e.preventDefault();
    dispatch(authAction.logout());
    alert("logout successful");
    navigate('/login');
  }
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <NavLink to="/" className="navbar-heading" style={{ color: '#007bff', fontStyle: 'italic' }}><h1>MyWeblink</h1></NavLink>
        <ul className="navbar-list">
          <li><NavLink to="/home" className="navbar-link">Home</NavLink></li>
          <li><NavLink to="/products" className="navbar-link">Products</NavLink></li>
          {isLoggedIn && <li><NavLink to="/expenses" className="navbar-link">My Expenses</NavLink></li>}
          <li><NavLink to="/aboutus" className="navbar-link">About Us</NavLink></li>
          {isLoggedIn && <li><NavLink className="navbar-link" onClick={logoutHandler}>LogOut</NavLink></li>}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;