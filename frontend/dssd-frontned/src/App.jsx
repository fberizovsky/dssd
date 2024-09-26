import { useState } from 'react'
import './App.css'
import Colectas from './Colectas'
import ColectaForm from './ColectaForm'
import "primereact/resources/themes/lara-light-indigo/theme.css";  //theme
import "primereact/resources/primereact.min.css";                  //core css
import 'bootstrap/dist/css/bootstrap.min.css';                     //bootstrap

function App() {

  return (
    <div className="App">
      <ColectaForm />
      <Colectas />
    </div>
  )
}

export default App
