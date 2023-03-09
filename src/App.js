import { Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import Home from './pages/Home';
import About from './pages/AboutUs';
import SignUpPage from './pages/SignUpPage';
import UpdateProfile from './Components/UpdateProfile/UpdateProfile';
import ForgotPassword from './Components/ForgotPswd/ForgotPswd';
import Expenses from './Components/Expenses/Expenses';
import Premium from './pages/Premium';
import { useSelector } from 'react-redux';
import './App.css';

function App() {
  const isLoggedIn = useSelector(state=>state.auth.isLoggedin);
  let themeMode = useSelector(state=> state.premium.theme);
  const showPremium = useSelector(state=> state.premium.premiumShow);
  const totalAmount = useSelector(state=>state.expense.totalAmount);
  if(totalAmount<=10000){
    themeMode = '';
  }
  return (
    <div className={themeMode === 'dark'? 'dark': ''}>
      <Navbar />
      {isLoggedIn && showPremium && <div><Premium /></div>}
      <Routes>
        <Route path="/" element={<SignUpPage/>} exact/>
        <Route path="/home" element={<Home/>} />
        <Route path="/updateprofile" element={<UpdateProfile />} />
        <Route path="/login" element={<SignUpPage/>} />
        <Route path='/aboutus' element={<About />} />
        <Route path='/expenses' element={<Expenses />} />
        <Route path='/forgotPassword' element={<ForgotPassword />} />
      </Routes> 
    </div>
  );
}

export default App;
