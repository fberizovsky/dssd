import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Colectas from './pages/Colectas';
import ColectaForm from './pages/ColectaForm';
import PedidoForm from './pages/PedidoForm';
import Login from './pages/login'; // Importa el componente Login
import ProtectedRoute from './components/protectedRoute';// Importa ProtectedRoute
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Ruta pública */}
          <Route path="/login" element={<Login />} />
          <Route
            path="/formularioColecta"
            element={
                <>
                  <ColectaForm />
                </>
            }
          />
          {/* Rutas protegidas */}
          <Route
            path="/formularioEntrega"
            element={
              <ProtectedRoute>
                <PedidoForm />
              </ProtectedRoute>
            }
          />
          {/* Página principal */}
          <Route path="/" element={<h1>Bienvenido a la página principal</h1>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
