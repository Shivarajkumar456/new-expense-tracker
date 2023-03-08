import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { authAction } from "../../store/authReducer";
import { premiumActions } from '../../store/premiumReducer';
import './Navbar.css';
import { Button } from 'react-bootstrap';

function Navbar() {
  const isLoggedIn = useSelector(state=> state.auth.isLoggedin);
  const totalAmount = useSelector(state=> state.expense.totalAmount);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutHandler = (e) => {
    e.preventDefault();
    dispatch(premiumActions.premium(false));
    dispatch(authAction.logout());
    alert("logout successful");
    navigate('/login');
  }
  const showPremium = () =>{
    dispatch(premiumActions.showPremium(true));
    dispatch(premiumActions.premium(true));
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
        {isLoggedIn && totalAmount>10000 && <Button onClick={showPremium}>Activate Premium</Button>}
      </div>
    </nav>
  );
}

export default Navbar;