import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Colectas from './Colectas';
import ColectaForm from './ColectaForm';
import "primereact/resources/themes/lara-light-indigo/theme.css";  //theme
import "primereact/resources/primereact.min.css";                  //core css
import 'bootstrap/dist/css/bootstrap.min.css';                     //bootstrap

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/formularioColecta" element={
            <>
              <ColectaForm />
              <Colectas />
            </>
          } />
          <Route path="/formularioEntrega" element={
            <h1>Fomulario Entrega</h1>
          } />
          <Route path="/" element={<h1>Bienvenido a la página principal</h1>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
