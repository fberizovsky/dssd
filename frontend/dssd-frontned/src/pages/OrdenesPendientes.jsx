import React, { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../config/config';

const OrdenesPendientes = () => {
  const [ordenesPendientes, setOrdenesPendientes] = useState([]);
  const [ordenSeleccionada, setOrdenSeleccionada] = useState(null);

  useEffect(() => {
    cargarOrdenesPendientes();
  }, []);

  const cargarOrdenesPendientes = async () => {
    try {
      const response = await axios.get(`${config.BASE_URL}/api/orden/pendientes`);
      setOrdenesPendientes(response.data);
    } catch (error) {
      console.error('Error al cargar las órdenes pendientes:', error);
    }
  };

  const seleccionarOrden = (orden) => {
    setOrdenSeleccionada(orden);
  };

  const cambiarEstado = async () => {
    if (!ordenSeleccionada) return;

    const token = localStorage.getItem('token');

    try {
      await axios.put(
        `${config.BASE_URL}/api/orden/reservar/${ordenSeleccionada.id}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert('Estado actualizado correctamente');
      cargarOrdenesPendientes();
      setOrdenSeleccionada(null);
    } catch (error) {
      console.error('Error al actualizar el estado:', error);
      alert('Error al actualizar el estado. Revisa los logs para más detalles.');
    }
  };

  return (
    <div className="container mt-4">
      <h2>Órdenes Pendientes</h2>

      {/* Tabla de órdenes pendientes */}
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Depositante</th>
            <th>Estado</th>
            <th>Items</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {ordenesPendientes.map((orden) => (
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

          {/* Botón para cambiar estado */}
          <button className="btn btn-success mt-3" onClick={cambiarEstado}>
            Cambiar Estado a "RESERVADO"
          </button>
        </div>
      )}
    </div>
  );
};

export default OrdenesPendientes;
