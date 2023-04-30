import React, { useRef, useState, Fragment } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { authAction } from "../../store/authReducer";
import './SignUp.css';

function SignUp() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const emailRef = useRef();
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();
    const [isLogin, setIsLogin] = useState(true);

    const loginHandler = () => {
        setIsLogin((prevState) => !prevState);
    }

    
  const submitHandler = (event) => {
    event.preventDefault();
    const enteredEmail = emailRef.current.value;
    const enteredPassword = passwordRef.current.value;
    let url;

    if(isLogin){
      url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA_ExM6hUtlNzZIYCMuHlySvECo1wviuC4';
    }else {
      url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA_ExM6hUtlNzZIYCMuHlySvECo1wviuC4'
    }
    fetch(url,
    {
      method: 'POST',
      body: JSON.stringify({
        email: enteredEmail,
        password: enteredPassword,
        returnSecureToken: true
      }),
      headers:{
        'Content-type': 'application/json'
      }
    }).then((res)=>{
      if(res.ok){
        return res.json();
      }else{
        return res.json().then(data=>{
          let errorMessage = 'Authentication Failed!';
          // if(data && data.error && data.error.message){
          //   errorMessage = data.error.message
          // }
          throw new Error(errorMessage);
        })
      }
    }).then((data) => {
      dispatch(authAction.updateAuthInfo({
        token: data.idToken,
        email: emailRef.current.value
      }))
        navigate('/expenses');
    })
    .catch((err) => {
      alert(err.message);
    });
  }
    return (
        <Fragment>
        <div className="signup">
          <form onSubmit={submitHandler}>
          <h2>{isLogin ? 'Sign In': 'Sign Up'}</h2>
            <input type="email" id="email" name="email" placeholder='Email' ref={emailRef} required />
            <input type="password" id
            ="password" name="password" placeholder='Password' ref={passwordRef} required />
            {!isLogin && <input type="password" id="confirm-password" name="confirm-password" ref={confirmPasswordRef} placeholder='Confirm Password' required />}
            <button type="submit" className="btn-primary">{isLogin ? 'Sign In': 'Sign Up'}</button>
            {isLogin && <p className='login-prompt '><NavLink to='/forgotPassword'>Forget password?</NavLink></p>}
          </form>
          <div className='isLogin'>
        <button className="toggle" onClick={loginHandler}>{!isLogin?'Have an account?':`Don't have an acoount? `} {!isLogin ? 'Log In': 'Sign Up'}</button>
        </div>
        </div>
        </Fragment>
    );
}

export default SignUp;