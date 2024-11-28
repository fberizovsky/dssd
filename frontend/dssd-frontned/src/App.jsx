import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/authContext"; // Asegúrate de importar correctamente
import Colectas from "./pages/Colectas";
import ColectaForm from "./pages/ColectaForm";
import PedidoForm from "./pages/PedidoForm";
import OrdenesPendientes from "./pages/OrdenesPendientes";
import Login from "./pages/login"; // Importa el componente Login
import ProtectedRoute from "./components/protectedRoute"; // Importa ProtectedRoute
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import OrdenesReservadas from "./pages/OrdenesReservadas";
import ListadoColectas from "./pages/ListadoColectas";
import Home from "./pages/home";
import Base from "./pages/Base";
import OrdenesDepositoPrincipal from "./pages/OrdenesDepositoPrincipal";

function App() {
  return (
    // Envuelve tu aplicación con AuthProvider
    <AuthProvider>
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
            <Route
              path="/misOrdenes"
              element={
                <>
                  <OrdenesDepositoPrincipal />
                </>
              }
            />
            <Route
              path="/ordenesPendientes"
              element={
                <ProtectedRoute>
                  <OrdenesPendientes />
                </ProtectedRoute>
              }
            />

            <Route
              path="/listadoColectas"
              element={
                <ProtectedRoute>
                  <ListadoColectas />
                </ProtectedRoute>
              }
            />
            <Route
              path="/ordenesReservadas"
              element={
                <ProtectedRoute>
                  <OrdenesReservadas />
                </ProtectedRoute>
              }
            />
            {/* Rutas protegidas */}
            <Route
              path="/formularioPedido"
              element={
                <ProtectedRoute>
                  <PedidoForm />
                </ProtectedRoute>
              }
            />
            <Route
              path="/home"
              element={
                <ProtectedRoute>
                  <Base />
                </ProtectedRoute>
              }
            />
            {/* Página principal */}
            <Route path="/" element={<Home />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
