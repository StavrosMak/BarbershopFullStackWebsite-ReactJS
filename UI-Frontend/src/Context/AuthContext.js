import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {

    const storedUser = JSON.parse(localStorage.getItem('user')); //retrieve User
    const [user, setUser] = useState(storedUser);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleLogin = (userData) => {
        setUser(userData);
        setIsLoggedIn(true);
        localStorage.setItem('user', JSON.stringify(userData)); // Store user in localStorage
    };

    const handleLogout = () => {
        setUser(null);
        setIsLoggedIn(false);
        localStorage.removeItem('user'); // Remove user from localStorage
    };


  useEffect(() => {//update when mount.
        const storedUser = JSON.parse(localStorage.getItem('user'));
        console.log(storedUser);
        if (storedUser.id) {
            setUser(storedUser);
            setIsLoggedIn(true);
        } else {
            setUser(null);
            setIsLoggedIn(false);
        }
    }, []);

    return (
        <AuthContext.Provider value={{ user, isLoggedIn, handleLogin, handleLogout }}>
            {children}
        </AuthContext.Provider>
    );
};
