// src/components/Home.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext"; // Importamos el contexto de autenticación

const Base = () => {
  const { userType } = useAuth(); // Obtenemos el tipo de usuario desde el contexto
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path); // Función para redirigir a las rutas especificadas
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Bienvenido al Sistema</h1>

      {userType === "DEPOSITO_COMUNAL" ? (
        // Mostrar estos cuadros si el usuario es DEPOSITO_COMUNAL
        <div className="row">
          <div className="col-12 col-md-4 mb-4">
            <div
              className="card h-100"
              onClick={() => handleNavigation("/ordenesPendientes")}
              style={{ cursor: "pointer" }}>
              <div className="card-body">
                <h4 className="card-title">Órdenes Pendientes</h4>
                <p className="card-text">
                  Consulta y gestiona las órdenes pendientes.
                </p>
              </div>
            </div>
          </div>

          <div className="col-12 col-md-4 mb-4">
            <div
              className="card h-100"
              onClick={() => handleNavigation("/listadoColectas")}
              style={{ cursor: "pointer" }}>
              <div className="card-body">
                <h4 className="card-title">Listado de Colectas</h4>
                <p className="card-text">Ver las colectas realizadas.</p>
              </div>
            </div>
          </div>

          <div className="col-12 col-md-4 mb-4">
            <div
              className="card h-100"
              onClick={() => handleNavigation("/ordenesReservadas")}
              style={{ cursor: "pointer" }}>
              <div className="card-body">
                <h4 className="card-title">Órdenes Reservadas</h4>
                <p className="card-text">Consulta las órdenes reservadas.</p>
              </div>
            </div>
          </div>
        </div>
      ) : userType === "DEPOSITO_PRINCIPAL" ? (
        <div className="row justify-content-center">
          {/* Tarjeta para "Formulario de Pedido" */}
          <div className="col-12 col-md-6 mb-4">
            <div
              className="card"
              onClick={() => handleNavigation("/formularioPedido")}
              style={{ cursor: "pointer" }}>
              <div className="card-body">
                <h4 className="card-title">Formulario de Pedido</h4>
                <p className="card-text">Crear un nuevo pedido desde aquí.</p>
              </div>
            </div>
          </div>

          {/* Tarjeta para "Mis Ordenes" */}
          <div className="col-12 col-md-6 mb-4">
            <div
              className="card"
              onClick={() => handleNavigation("/MisOrdenes")}
              style={{ cursor: "pointer" }}>
              <div className="card-body">
                <h4 className="card-title">Mis Órdenes</h4>
                <p className="card-text">
                  Ver el listado de mis órdenes pendientes.
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        // Si el tipo de usuario no está definido, puedes mostrar un mensaje o algo predeterminado
        <p className="text-center">No tienes acceso a esta sección.</p>
      )}
    </div>
  );
};

export default Base;
