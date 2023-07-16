import Header from "./Header";
import Footer from "../Footer";
import Body from "./Body";
import "./container-main.css";
import { SelectionContext } from '../../context/SelectionContext';
import { useContext, useEffect } from 'react';


function MainPage() {
  const { limpiarServicios, eliminarFecha, eliminarHorario,eliminarDatos } = useContext(SelectionContext);

  useEffect(() => {
    limpiarServicios();
    eliminarFecha();
    eliminarHorario();
    eliminarDatos();
  }, [limpiarServicios, eliminarFecha, eliminarHorario,eliminarDatos ]);

  return (
    <div className="container">
      <Header />
      <Body />
      <Footer />
    </div>
  );
}

export default MainPage;
