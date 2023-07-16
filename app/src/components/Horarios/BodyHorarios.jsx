import React, { useContext, useState } from "react";
import "./horarios.css";
import { SelectionContext } from "../../context/SelectionContext";
import { Link } from "react-router-dom";

function CasillaHor({ horario, seleccionado, habilitado, onClick }) {
  return (
    <button
      className={`casillaHor ${seleccionado ? "seleccionadoHor" : ""} ${
        habilitado ? "" : "deshabilitado"
      }`}
      onClick={onClick}
    >
      <span className="casilla-texto">{horario}</span>
    </button>
  );
}

function BodyHorarios() {
   const { horariosSeleccionados, agregarHorario } = useContext(SelectionContext)
  const [casillaSeleccionada, setCasillaSeleccionada] = useState(null);

  const handleCasillaClick = (horario) => {
    if (casillaSeleccionada === horario) {
      setCasillaSeleccionada(null);
      agregarHorario([]); // este estado tengo que moverlo al contexto
    } else {
      setCasillaSeleccionada(horario);
      agregarHorario([horario]); // este estado tengo que moverlo al contexto
    }
  
  };
  const confirmarHabilitado = horariosSeleccionados.length > 0;

  return (
    <div className="body-horarios">
      <h1 className="titulo-horarios">Seleccione un Horario</h1>
      <div className="contenedor-horarios">
        <div className="columna-horarios">
          <CasillaHor
            horario="11:00"
            seleccionado={horariosSeleccionados.includes("11:00")}
            onClick={() => handleCasillaClick("11:00")}
          />
          <CasillaHor
            horario="12:00"
            seleccionado={horariosSeleccionados.includes("12:00")}
            onClick={() => handleCasillaClick("12:00")}
          />
          <CasillaHor
            horario="13:00"
            seleccionado={horariosSeleccionados.includes("13:00")}
            onClick={() => handleCasillaClick("13:00")}
          />
          <CasillaHor
            horario="14:00"
            seleccionado={horariosSeleccionados.includes("14:00")}
            onClick={() => handleCasillaClick("14:00")}
          />
          <CasillaHor
            horario="15:00"
            seleccionado={horariosSeleccionados.includes("15:00")}
            onClick={() => handleCasillaClick("15:00")}
          />
        </div>
        <div className="columna-horarios">
          <CasillaHor
            horario="16:00"
            seleccionado={horariosSeleccionados.includes("16:00")}
            onClick={() => handleCasillaClick("16:00")}
          />
          <CasillaHor
            horario="17:00"
            seleccionado={horariosSeleccionados.includes("17:00")}
            onClick={() => handleCasillaClick("17:00")}
          />
          <CasillaHor
            horario="18:00"
            seleccionado={horariosSeleccionados.includes("18:00")}
            onClick={() => handleCasillaClick("18:00")}
          />
          <CasillaHor
            horario="19:00"
            seleccionado={horariosSeleccionados.includes("19:00")}
            onClick={() => handleCasillaClick("19:00")}
          />
          <CasillaHor
            horario="20:00"
            seleccionado={horariosSeleccionados.includes("20:00")}
            onClick={() => handleCasillaClick("20:00")}
          />
        </div>
      </div>
      <p className="texto-horarios">
          Horario Seleccionado: {" "}
          <span className="horario-seleccionado">
            {horariosSeleccionados ? horariosSeleccionados : ""}
          </span>
        </p>
      <Link to="/Datos">
        <button  className="boton-horario" disabled={!confirmarHabilitado}>
          Confirmar
        </button>
      </Link>
    </div>
  );
}

export default BodyHorarios;