import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/authServices";
import { useAuth } from "../context/authContext";// Importamos el contexto

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("DEPOSITO_PRINCIPAL"); // Inicializamos con DEPOSITO_PRINCIPAL
  const [error, setError] = useState(null);
  const { setUserType: setGlobalUserType } = useAuth(); // Obtener la función para actualizar el tipo de usuario global
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError(null); // Limpia errores previos
      await login(email, password, userType);  // Asumimos que esta función autentica al usuario
      setGlobalUserType(userType);  // Actualizamos el tipo de usuario en el contexto global
      navigate("/home"); // Redirige al formulario después del login
    } catch (err) {
      setError("Credenciales inválidas. Inténtalo de nuevo.");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
      <div className="card p-4 shadow-lg" style={{ width: "100%", maxWidth: "400px" }}>
        <h2 className="text-center mb-4">Iniciar Sesión</h2>
        {error && <p className="text-danger text-center">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label" htmlFor="email">Correo Electrónico</label>
            <input
              type="email"
              id="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label" htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label" htmlFor="userType">Tipo de Usuario</label>
            <select
              id="userType"
              className="form-select"
              value={userType}
              onChange={(e) => setUserType(e.target.value)}
              required
            >
              <option value="DEPOSITO_PRINCIPAL">Deposito Principal</option>
              <option value="DEPOSITO_COMUNAL">Deposito Comunal</option>
            </select>
          </div>

          <div className="d-grid gap-2">
            <button type="submit" className="btn btn-primary">Entrar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
