import React, { useState, createContext } from 'react';

const AuthContext = createContext(); //creates Provider

export const AuthContextProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const toggleAuth = () => {
        setIsAuthenticated(!isAuthenticated);
    }

    return ( 
        <AuthContext.Provider value={{ isAuthenticated, toggleAuth }}>
            {children}
        </AuthContext.Provider>
     );
}
 
export default AuthContext;
