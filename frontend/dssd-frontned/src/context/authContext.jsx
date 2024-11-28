import React, { createContext, useState, useContext } from 'react';

// Crear el contexto
const AuthContext = createContext();

// Crear un proveedor para el contexto
export const AuthProvider = ({ children }) => {
  const [userType, setUserType] = useState(null); // Inicializamos el tipo de usuario como null

  return (
    <AuthContext.Provider value={{ userType, setUserType }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personalizado para usar el contexto
export const useAuth = () => useContext(AuthContext);
