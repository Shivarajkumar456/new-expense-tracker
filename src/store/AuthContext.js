import React, { useState } from "react";
const AuthContext = React.createContext({
    token : "",
    isLoggedIn : false,
    login : (token)=>{},
    logout : ()=>{}
})

export const AuthContextProvider=(props)=>{
    const initialToken = localStorage.getItem('token');
    console.log(initialToken);;
    const[token , setToken] = useState(initialToken);

    const userLoggedIn = !!token;
    const loginHandler =(token)=>{
        console.log("Auth login handler called")
        localStorage.setItem('token' , token);
        setToken(token);

    }
    const logoutHandler = ()=>{

        setToken(null);
        localStorage.removeItem('token');
    }
    const contextValue = {
        token : token,
        isLoggedIn : userLoggedIn,
        login : loginHandler,
        logout : logoutHandler
    }
    return <AuthContext.Provider value={contextValue}>{props.children}</AuthContext.Provider>
}
export default AuthContext