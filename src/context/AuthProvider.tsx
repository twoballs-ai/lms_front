'use client';
import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [role, setRole] = useState(null);

  useEffect(() => {
    const storedRole = localStorage.getItem('role');
    if (storedRole) {
      setRole(storedRole);
      setAuthenticated(true);
    }
  }, []);

  const toggleAuthentication = () => {
    const currentRole = localStorage.getItem('role');
    if (currentRole === 'teacher_model' || currentRole === 'student_model') {
      setAuthenticated(!authenticated);
    }
  };

  return (
    <AuthContext.Provider value={{ authenticated, role, toggleAuthentication }}>
      {children}
    </AuthContext.Provider>
  );
};
