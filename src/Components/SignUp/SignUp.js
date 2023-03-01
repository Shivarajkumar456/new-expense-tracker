import React from 'react';
import './SignUp.css';

function SignUp() {
  return (
    <div className="signup">
      <form>
      <h2>SignUp</h2>
        <input type="email" id="email" name="email" placeholder='Email' required />
        <input type="password" id="password" name="password" placeholder='Password' required />
        <input type="password" id="confirm-password" name="confirm-password" placeholder='Confirm Password' required />
        <button type="submit" className="btn-primary">Sign Up</button>
        <p className="login-prompt">Have an account? <a href="/login">Login</a></p>
      </form>
    </div>
  );
}

export default SignUp;