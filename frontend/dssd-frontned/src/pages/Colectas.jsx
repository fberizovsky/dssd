import React, { useEffect, useState } from 'react';
import axios from 'axios';
import config from '../config/config';

const Colectas = () => {
  const [colectas, setColectas] = useState([]);

  useEffect(() => {
    const fetchColectas = async () => {
      try {
        const response = await axios.get(`${config.BASE_URL}/api/colectas`);
        setColectas(response.data);
      } catch (error) {
        console.error('Error fetching colectas:', error);
      }
    };
    fetchColectas();
  }, []);

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Listado de Colectas</h1>
      {colectas.length > 0 ? (
        <div className="row">
          {colectas.map(colecta => (
            <div className="col-md-6 col-lg-4 mb-4" key={colecta.id}>
              <div className="card shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">Colecta ID: {colecta.id}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">Items:</h6>
                  {colecta.items.length > 0 ? (
                    <ul className="list-group list-group-flush">
                      {colecta.items.map(item => (
                        <li className="list-group-item" key={item.id}>
                          {item.nombre} - <strong>Cantidad:</strong> {item.cantidad}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-danger">No hay items en esta colecta.</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-muted">No hay colectas disponibles.</p>
      )}
    </div>
  );
};

export default Colectas;
