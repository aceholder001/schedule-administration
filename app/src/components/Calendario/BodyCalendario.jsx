import React, { useState, useContext, useEffect } from "react";
import { DayPicker } from "react-day-picker";
import { es } from "date-fns/locale";
import { isSameDay, isBefore, startOfToday, getDay, format } from "date-fns";
import "react-day-picker/dist/style.css";
import { SelectionContext } from "../../context/SelectionContext";
import { Link } from "react-router-dom";
import axios from "axios";

import "./calendario.css";

function Calendario() {
  const { agregarFecha, fechaSeleccionada, agregarHorario } =
    useContext(SelectionContext);

  const [selectedDay, setSelectedDay] = useState(fechaSeleccionada);
  const [horariosDisponibles, setHorariosDisponibles] = useState([]);
  const [horarioSeleccionad, setHorarioSeleccionado] = useState(null);

  useEffect(() => {
    console.log(horariosDisponibles, "horarios disponibles");
  }, [horariosDisponibles]);

  const handleDateChange = async (date) => {
    agregarFecha(date);
    const dateString = format(date, "yyyy-MM-dd");

    const response = await axios.get(
      `http://localhost:4000/api/citas/horariosDisponibles/${dateString}`
    );
    setHorariosDisponibles(response.data);
  };

  const disabledDays = {
    before: startOfToday(),
  };

  const confirmarHabilitado = fechaSeleccionada !== null;
  const handleSeleccionarHoraClick = () => {
    if (!confirmarHabilitado) {
    } else {
      // Lógica para manejar el evento de Seleccionar Hora
    }
  };

  const isDaySelected = (day) => {
    return fechaSeleccionada && isSameDay(day, fechaSeleccionada);
  };
  const handleCasillaClick = (horario) => {
    if (horario.disponible) {
      setHorarioSeleccionado(horario.hora);
      agregarHorario([horario]); // este estado tengo que moverlo al contexto
    } else {
      console.log("Este horario no está disponible");
    }
  };

  return (
    <div className="container-body-fecha">
      <h1 className="select-date">Seleccione una Fecha</h1>
      <div className="calendario-container">
        <div className="custom-calendar">
          <DayPicker
            required
            locale={es}
            mode="single"
            //onDayClick={handleDateChange}
            //selected={fechaSeleccionada}
            selected={selectedDay}
            onSelect={setSelectedDay}
            onDayClick={handleDateChange}
            modifiers={{
              disabled: (date) =>
                isBefore(date, startOfToday()) || getDay(date) === 0,
            }}
            disabledDays={disabledDays}
            modifiersClassNames={{
              selected: "my-selected",
              today: "my-today-style",
            }}
            modifiersStyles={{
              disabled: { fontSize: "75%" },
            }}
          />
        </div>
        <div className="horarios-container">
          {horariosDisponibles.map((horario, index) => (
            <div
              className={`casilla-horarios ${
                index >=
                horariosDisponibles.length - (horariosDisponibles.length % 3)
                  ? "ultima-fila"
                  : ""
              } ${!horario.disponible ? "horario-no-disponible" : ""}${
                horario.hora === horarioSeleccionad
                  ? "horario-seleccionado"
                  : ""
              }`}
              key={index}
              onClick={() => handleCasillaClick(horario)}
            >
              {horario.hora}
            </div>
          ))}
        </div>

        <div className="selected-info">
          <div className="selected-day">
            {fechaSeleccionada && (
              <>
                Día seleccionado: {fechaSeleccionada.dia}/
                {fechaSeleccionada.mes}/{fechaSeleccionada.año}
              </>
            )}
          </div>
          <div className="selected-day">
            {horarioSeleccionad && (
              <>Horario seleccionado: {horarioSeleccionad}</>
            )}
          </div>
        </div>
      </div>

      <Link to="/Datos">
        <button
          className="boton-fecha"
          disabled={!confirmarHabilitado || !horarioSeleccionad}
          onClick={handleSeleccionarHoraClick}
        >
          Confirmar
        </button>
      </Link>
    </div>
  );
}

export default Calendario;
