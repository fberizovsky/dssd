import React, { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../config/config';

const OrdenesDepositoPrincipal = () => {
  const [ordenes, setOrdenes] = useState([]); // Lista de órdenes del depósito principal
  const [ordenSeleccionada, setOrdenSeleccionada] = useState(null);

  // Cargar las órdenes al montar el componente
  useEffect(() => {
    cargarOrdenes();
  }, []);

  // Función para cargar las órdenes del depósito principal
  const cargarOrdenes = async () => {
    try {
      // Obtener el token de autenticación desde el almacenamiento local
      const token = localStorage.getItem('token');

      if (!token) {
        alert("No estás autenticado.");
        return;
      }

      // Hacer una solicitud GET al backend para obtener las órdenes del depósito principal
      const response = await axios.get(`${config.BASE_URL}/api/orden/misOrdenes`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Guardar las órdenes en el estado
      setOrdenes(response.data);
    } catch (error) {
      console.error('Error al cargar las órdenes:', error);
      alert('Error al cargar las órdenes. Revisa los logs para más detalles.');
    }
  };

  // Función para seleccionar una orden y ver más detalles
  const seleccionarOrden = (orden) => {
    setOrdenSeleccionada(orden);
  };


  return (
    <div className="container mt-4">
      <h2>Órdenes del Depósito Principal</h2>

      {/* Tabla de órdenes */}
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Emitida Por</th>
            <th>Estado</th>
            <th>Items</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {ordenes.map((orden) => (
            <tr key={orden.id}>
              <td>{orden.id}</td>
              <td>{orden.emitidaPor}</td>
              <td>{orden.estado}</td>
              <td>{orden.items.length}</td>
              <td>
                <button
                  className="btn btn-primary"
                  onClick={() => seleccionarOrden(orden)}
                  disabled={ordenSeleccionada?.id === orden.id}
                >
                  Ver más
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Detalles de la orden seleccionada */}
      {ordenSeleccionada && (
        <div className="mt-4">
          <h4>Detalles de la Orden Seleccionada</h4>
          <p><strong>ID:</strong> {ordenSeleccionada.id}</p>
          <p><strong>Emitida Por:</strong> {ordenSeleccionada.emitidaPor}</p>
          <p><strong>Estado:</strong> {ordenSeleccionada.estado}</p>
          <p><strong>Items:</strong></p>

          {/* Listado de items */}
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Cantidad</th>
              </tr>
            </thead>
            <tbody>
              {ordenSeleccionada.items.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.nombre}</td>
                  <td>{item.cantidad}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default OrdenesDepositoPrincipal;
