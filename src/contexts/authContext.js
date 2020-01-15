import React, { useState, createContext } from 'react';

const AuthContext = createContext(); //creates Provider

export const AuthContextProvider = ({ children }) => {
    const [authenticated, setAuthenticated] = useState(false);
    const [user, setUser] = useState({});
    // const setAuth = (value) => {
    //     setIsAuthenticated(value);
    //     if (!value) {
    //         setUser({});
    //     }
    // }

    return ( 
        <AuthContext.Provider value={{ authenticated, setAuthenticated, user, setUser }}>
            {children}
        </AuthContext.Provider>
     );
}
 
export default AuthContext;
