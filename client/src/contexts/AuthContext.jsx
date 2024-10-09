import React, { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';


const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(null);
    const [userData, setUserData] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    // const storedData = JSON.parse(localStorage.getItem('user_data'));

    useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem('user_data'));
        if(storedData){
            const {userToken, user} = storedData;
            setToken(userToken);
            setUserData(user);
            setIsAuthenticated(true);
            
        }
    }, []);
    
    const login = (newToken, newData) => {
       
        localStorage.setItem('user_data', JSON.stringify({ userToken: newToken, user: newData }));
        setToken(newToken);
        setUserData(newData);
        setIsAuthenticated(true);
        console.log('User Data:', newData);
    };
    
    const logout = () => {
        localStorage.removeItem('user_data');
        setToken(null);
        setUserData(null);
        setIsAuthenticated(false);
    }

    const updateUserData = (newData) => {
        setUserData(newData);
    };
    
    return (
    <AuthContext.Provider value={{token, isAuthenticated, login, logout, userData, updateUserData}}>
        {children}
    </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export const useAuth = () => useContext(AuthContext);
