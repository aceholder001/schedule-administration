import React, { useEffect, useContext } from "react";
import HeaderGeneral from "../HeaderGeneral";
import Footer from "../Footer";
import Calendario from "./BodyCalendario";
import "./containerCalendario.css";
import { SelectionContext } from "../../context/SelectionContext";

function SeleccionarFecha() {
  const {  eliminarFecha,eliminarHorario } = useContext(SelectionContext)
  useEffect(() => {
    eliminarFecha();
    eliminarHorario();
  }, [eliminarFecha,eliminarHorario]);

  return (
    <div className="container">
      <HeaderGeneral />
      <Calendario />
      <Footer />
    </div>
  );
}
export default SeleccionarFecha;
