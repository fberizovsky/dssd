import React, { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../config/config';

const ListadoColectas = () => {
  const [colectas, setColectas] = useState([]);
  const [colectaSeleccionada, setColectaSeleccionada] = useState(null);

  useEffect(() => {
    cargarColectas();
  }, []);

  const cargarColectas = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get(`${config.BASE_URL}/api/colecta/depositocomunal`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setColectas(response.data);
    } catch (error) {
      console.error('Error al cargar las colectas:', error);
    }
  };

  const seleccionarColecta = (colecta) => {
    setColectaSeleccionada(colecta);
  };

  const actualizarCantidadItem = async (idItem, nuevaCantidad) => {
    const token = localStorage.getItem('token');
    try {
      await axios.put(
        `${config.BASE_URL}/api/items/${idItem}`,
        nuevaCantidad,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      alert('Cantidad actualizada correctamente');
      cargarColectas(); // Refrescar lista después de actualizar
    } catch (error) {
      console.error('Error al actualizar la cantidad:', error);
      alert('Error al actualizar la cantidad');
    }
  };

  // Función para aceptar la colecta
  const aceptarColecta = async (id) => {
    const token = localStorage.getItem('token');
    try {
      await axios.put(`${config.BASE_URL}/api/colecta/${id}/aceptar`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert('Colecta aceptada');
      cargarColectas(); // Refrescar lista después de aceptar
    } catch (error) {
      console.error('Error al aceptar la colecta:', error);
      alert('Error al aceptar la colecta');
    }
  };

  // Función para rechazar la colecta
  const rechazarColecta = async (id) => {
    const token = localStorage.getItem('token');
    try {
      await axios.put(`${config.BASE_URL}/api/colecta/${id}/rechazar`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert('Colecta rechazada');
      cargarColectas(); // Refrescar lista después de rechazar
    } catch (error) {
      console.error('Error al rechazar la colecta:', error);
      alert('Error al rechazar la colecta');
    }
  };

  return (
    <div className="container mt-4">
      <h2>Listado de Colectas</h2>

      {/* Tabla de colectas */}
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre Recolector</th>
            <th>DNI Recolector</th>
            <th>Items</th>
            <th>Acción</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {colectas.map((colecta) => (
            <tr key={colecta.id}>
              <td>{colecta.id}</td>
              <td>{colecta.nombreRecolector}</td>
              <td>{colecta.dniRecolector}</td>
              <td>{colecta.items.length}</td>
              <td>
                <button
                  className="btn btn-primary"
                  onClick={() => seleccionarColecta(colecta)}
                  disabled={colectaSeleccionada?.id === colecta.id}
                >
                  Ver más
                </button>
              </td>
              <td>{colecta.estado}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Detalles de la colecta seleccionada */}
      {colectaSeleccionada && (
        <div className="mt-4">
          <h4>Detalles de la Colecta Seleccionada</h4>
          <p><strong>ID:</strong> {colectaSeleccionada.id}</p>
          <p><strong>Nombre Recolector:</strong> {colectaSeleccionada.nombreRecolector}</p>
          <p><strong>DNI Recolector:</strong> {colectaSeleccionada.dniRecolector}</p>
          <p><strong>Items Recolectados:</strong></p>

          {/* Listado editable de items recolectados */}
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Cantidad</th>
                <th>Acción</th>
              </tr>
            </thead>
            <tbody>
              {colectaSeleccionada.items.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.nombre}</td>
                  <td>
                    <input
                      type="number"
                      className="form-control"
                      defaultValue={item.cantidad}
                      onBlur={(e) =>
                        actualizarCantidadItem(item.id, parseInt(e.target.value, 10))
                      }
                    />
                  </td>
                  <td>
                    <button
                      className="btn btn-success"
                      onClick={() =>
                        actualizarCantidadItem(item.id, item.cantidad)
                      }
                    >
                      Guardar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Botones Aceptar y Rechazar */}
          {colectaSeleccionada.estado === 'CREADO' && (
            <div>
              <button
                className="btn btn-success mt-2"
                onClick={() => aceptarColecta(colectaSeleccionada.id)}
              >
                Aceptar
              </button>
              <button
                className="btn btn-danger mt-2 ml-2"
                onClick={() => rechazarColecta(colectaSeleccionada.id)}
              >
                Rechazar
              </button>
            </div>
          )}

          {/* Botón para cerrar */}
          <button
            className="btn btn-secondary mt-2"
            onClick={() => setColectaSeleccionada(null)}
          >
            Cerrar
          </button>
        </div>
      )}
    </div>
  );
};

export default ListadoColectas;
