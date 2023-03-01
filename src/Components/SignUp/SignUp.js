import React, { useRef, useState, Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignUp.css';

function SignUp() {
    const navigate = useNavigate();
    const emailRef = useRef();
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();
    const [isLogin, setIsLogin] = useState(true);

    const loginHandler = () => {
        setIsLogin((prevState) => !prevState);
    }

    const submitHandler = async (event) => {
        event.preventDefault();
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        let url;
        if (isLogin) {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAGhMOoCkZh2xzJ3X_mtq7XNf2z2AOvrrQ';
        } else {
            if (password !== confirmPasswordRef.current.value) {
                return alert('Password Do Not Match');
            } else {
                url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAGhMOoCkZh2xzJ3X_mtq7XNf2z2AOvrrQ';
            }
        }
        console.log(email, password)
        try {
            const res = await fetch(url,
                {
                    method: "POST",
                    body: JSON.stringify({
                        email: emailRef.current.value,
                        password: passwordRef.current.value
                    }),
                    headers: {
                        'Content-Type': 'application/json',
                    }
                })
            if (res.ok) {
                const data = await res.json();
                localStorage.setItem('idToken', JSON.stringify(data))
                setIsLogin(true)
                emailRef.current.value = "";
                passwordRef.current.value = "";
                if (!isLogin) {
                    confirmPasswordRef.current.value = ""
                    alert("SignUp Successful")
                } else {
                    alert("Login Successful")
                    navigate("/home")
                }
            } else {
                const data = await res.json();
                throw data.error
            }
        }
        catch (error) {
            console.log(error.message)
        }
    };

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
          </form>
          <div className='isLogin'>
        <button className="toggle" onClick={loginHandler}>{!isLogin?'Have an account?':`Don't have an acoount? `} {!isLogin ? 'Log In': 'Sign Up'}</button>
        </div>
        </div>
        </Fragment>
    );
}

export default SignUp;