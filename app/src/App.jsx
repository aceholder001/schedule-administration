import React from "react";
import MainPage from "./components/Mainpage/MainPage";
import ServiciosPage from "./components/Servicios/Servicios";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SeleccionarFecha from "./components/Calendario/SeleccionarFecha";
import SeleccionarHorario from "./components/Horarios/SeleccionarHorario";
import Datos from "./components/Datos/Datos";
import Confirmacion from "./components/Confirmacion/ConfirmacionPage";
import Final from "./components/Confirmacion/Final";
import Cita from "./components/Cita/Cita";
import { SelectionProvider } from "./context/SelectionContext";


function App() {
  return (
    <div>
      <SelectionProvider>
        <Router>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/Servicios" element={<ServiciosPage />} />
            <Route path="/Fecha" element={<SeleccionarFecha />} />
            <Route path="/Horarios" element={<SeleccionarHorario />} />
            <Route path="/Datos" element={<Datos />} />
            <Route path="/Confirmacion" element={<Confirmacion />} />
            <Route path="/Final" element={<Final />} />
            <Route path="/Cita" element={<Cita />} />
          </Routes>
        </Router>
      </SelectionProvider>
    </div>
  );
}

export default App;
