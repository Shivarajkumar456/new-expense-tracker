import { Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import Home from './pages/Home';
import About from './pages/AboutUs';
import SignUpPage from './pages/SignUpPage';
import { Fragment } from 'react';

function App() {
  return (
    <Fragment>
      <Navbar />
      <SignUpPage />
      <Routes>
        <Route path="/home" element={<Home/>} />
        <Route path="/login" element={<SignUpPage/>} />
        <Route path='/aboutus' element={<About />} />
      </Routes> 
    </Fragment>
  );
}

export default App;
