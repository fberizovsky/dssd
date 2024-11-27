import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/authServices";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("DEPOSITO_PRINCIPAL"); // Inicializamos con DEPOSITO_PRINCIPAL
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError(null); // Limpia errores previos
      // Llamamos al servicio de autenticación, pasamos email, password y userType
      await login(email, password, userType); 
      navigate("/formulario"); // Redirige al formulario después del login
    } catch (err) {
      setError("Credenciales inválidas. Inténtalo de nuevo.");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "50px auto" }}>
      <h1>Iniciar Sesión</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Correo Electrónico:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Contraseña:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Tipo de Usuario:</label>
          <select
            value={userType}
            onChange={(e) => setUserType(e.target.value)} // Actualiza el valor de userType
            required
          >
            <option value="DEPOSITO_PRINCIPAL">Deposito Principal</option>
            <option value="DEPOSITO_COMUNAL">Deposito Comunal</option>
          </select>
        </div>
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
};

export default Login;
