import { Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import Home from './pages/Home';
import About from './pages/AboutUs';
import SignUpPage from './pages/SignUpPage';
import UpdateProfile from './Components/UpdateProfile/UpdateProfile';
import ForgotPassword from './Components/ForgotPswd/ForgotPswd';
import Expenses from './Components/Expenses/Expenses';
import Premium from './pages/Premium';
import { Fragment } from 'react';

function App() {
  return (
    <Fragment>
      <Navbar />
      <Routes>
        <Route path="/" element={<SignUpPage/>} exact/>
        <Route path="/home" element={<Home/>} />
        <Route path="/updateprofile" element={<UpdateProfile />} />
        <Route path="/login" element={<SignUpPage/>} />
        <Route path='/aboutus' element={<About />} />
        <Route path='/expenses' element={<Expenses />} />
        <Route path='/premium' element={<Premium />} />
        <Route path='/forgotPassword' element={<ForgotPassword />} />
      </Routes> 
    </Fragment>
  );
}

export default App;
