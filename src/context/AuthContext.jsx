import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // 🔴 Page load hone ki loading state

  // Jab bhi page refresh hoga, yeh turant localStorage check karega
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    
    if (savedUser && token) {
      try {
        setUser(JSON.parse(savedUser)); // User state wapas set kar di
      } catch (error) {
        console.error("Failed to parse saved user:", error);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
      }
    }
    setLoading(false); // Checking khatam
  }, []);

  // Login hone par user aur token dono save honge
  const login = (userData, token) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    if (token) {
      localStorage.setItem('token', token);
    }
  };

  // Logout hone par sab kuch clear ho jayega
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);