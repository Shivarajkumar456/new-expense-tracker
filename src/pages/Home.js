import { Fragment } from "react";
import { NavLink } from "react-router-dom";
import './Home.css';

const Home = () => {
    return <Fragment> <div className='main-home'>
    <h2 className='margin-auto'>Welcome To Expense Tracker</h2>
    <div className='profile'>
        <p>Your Profile is incomplete <NavLink className="link-profile" to="/updateprofile">complete now</NavLink></p>
    </div>
    </div></Fragment>
}

export default Home;