import React, { useState } from "react";

const AuthContext = React.createContext({
    token: '',
    email: '',
    isLoggedIn: false,
    login: (token, email) => { },
    logout: () => { },
});

export const AuthContextProvider = (props) => {
    const localToken = localStorage.getItem('token');
    const localEmail = localStorage.getItem('email');
    const [email, setEmail] = useState(localEmail);
    const [token, setToken] = useState(localToken);

    const userIsLoggedIn = !!token;

    const loginHandler = (token, email) => {
        alert('User logged in');
        setToken(token);
        setEmail(email);
        localStorage.setItem('token', token);
        localStorage.setItem('email', email);
    };
    
    const logoutHandler = () => {
        setToken(null);
        localStorage.removeItem('token');
        localStorage.removeItem('email');
    };

    const contextValue = {
        token: token,
        email: email,
        isLoggedIn: userIsLoggedIn,
        login: loginHandler,
        logout: logoutHandler,
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthContext;