import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true); // добавляем состояние загрузки

  useEffect(() => {
    const storedRole = localStorage.getItem('role');
    if (storedRole) {
      setRole(storedRole);
      setAuthenticated(true);
    }
    setLoading(false); // Устанавливаем загрузку в false после проверки аутентификации
  }, []);

  const toggleAuthentication = () => {
    const currentRole = localStorage.getItem('role');
    if (currentRole === 'teacher_model' || currentRole === 'student_model') {
      setAuthenticated(prevAuth => !prevAuth);
    }
  };

  if (loading) {
    return <div>Loading...</div>; // Добавляем индикатор загрузки
  }

  return (
    <AuthContext.Provider value={{ authenticated, role, toggleAuthentication }}>
      {children}
    </AuthContext.Provider>
  );
};