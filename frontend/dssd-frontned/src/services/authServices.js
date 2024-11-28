import axios from "axios";
import config from '../config/config';

const API_URL = `${config.BASE_URL}/auth`;
//const API_URL = "https://entrega3dssd.onrender.com/auth"; // Cambia esto por la URL de tu API

// Función para iniciar sesión
export const login = async (email, password, userType) => {
  const response = await axios.post(`${API_URL}/login`, { 
    email, 
    password, 
    userType // Pasamos el userType al backend
  });
  
  if (response.data.token) {
    localStorage.setItem("token", response.data.token); // Guarda el token en localStorage
  }
  
  return response.data;
};

// Función para cerrar sesión
export const logout = () => {
  localStorage.removeItem("token"); // Elimina el token de localStorage
};

// Obtener el token almacenado
export const getToken = () => {
  return localStorage.getItem("token");
};
