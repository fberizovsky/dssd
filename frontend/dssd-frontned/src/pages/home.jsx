import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const handleRedirigirRecolector = () => {
    navigate('/formulariocolecta');
  };

  const handleRedirigirDeposito = () => {
    navigate('/login');
  };

  return (
    <div className="d-flex flex-column" style={{ minHeight: '100vh' }}>
      {/* Navbar superior */}
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">APP DSSD Recolecciones</a>
        </div>
      </nav>

      {/* Cuadrados responsivos */}
      <div className="container mt-5 flex-grow-1">
        <div className="row">
          {/* Cuadro Soy Recolector */}
          <div className="col-12 col-md-4 mb-4">
            <div 
              className="card text-white bg-primary h-100" 
              style={{ cursor: 'pointer' }} 
              onClick={handleRedirigirRecolector}
            >
              <div className="card-body d-flex flex-column justify-content-center align-items-center">
                <h5 className="card-title">Soy Recolector</h5>
                <p className="card-text">Aquí puedes registrar tu actividad como recolector y gestionar tus recolecciones.</p>
              </div>
            </div>
          </div>

          {/* Cuadro Deposito Comunal */}
          <div className="col-12 col-md-4 mb-4">
            <div 
              className="card text-white bg-success h-100" 
              style={{ cursor: 'pointer' }} 
              onClick={handleRedirigirDeposito}
            >
              <div className="card-body d-flex flex-column justify-content-center align-items-center">
                <h5 className="card-title">Deposito Comunal</h5>
                <p className="card-text">Accede al deposito comunal para administrar los recursos recolectados.</p>
              </div>
            </div>
          </div>

          {/* Cuadro Deposito Principal */}
          <div className="col-12 col-md-4 mb-4">
            <div 
              className="card text-white bg-warning h-100" 
              style={{ cursor: 'pointer' }} 
              onClick={handleRedirigirDeposito}
            >
              <div className="card-body d-flex flex-column justify-content-center align-items-center">
                <h5 className="card-title">Deposito Principal</h5>
                <p className="card-text">Accede al deposito principal para gestionar los recursos.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer con datos de contacto */}
      <footer className="bg-dark text-white py-3 mt-5">
        <div className="container text-center">
          <p>Pagina para recolectores y depositos | contacto: +1234567</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
