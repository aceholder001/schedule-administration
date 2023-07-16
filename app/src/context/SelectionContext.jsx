import React, { createContext, useState, useEffect, useCallback } from "react";



export const SelectionContext = createContext();

export const SelectionProvider = ({ children }) => {
  //Servicios.jsx
  // Obtener la selección de servicios del almacenamiento local
  const storedSelection = () => {
    const serviciosSeleccionados = localStorage.getItem(
      "serviciosSeleccionados"
    );
    if (serviciosSeleccionados) {
      return JSON.parse(serviciosSeleccionados);
    } else {
      return [];
    }
  };

  const [serviciosSeleccionados, setServiciosSeleccionados] = useState(
    storedSelection()
  );

  const agregarServicio = (servicio) => {
    console.log("Agregando servicio de", servicio);
    setServiciosSeleccionados((prevServicios) => [...prevServicios, servicio]);
  };

  const eliminarServicio = (servicio) => {
    console.log("Eliminando servicio de", servicio);
    setServiciosSeleccionados((prevServicios) =>
      prevServicios.filter((s) => s._id !== servicio._id)
    );
  };
  
  const limpiarServicios = useCallback(() => {
    setServiciosSeleccionados([]);
  }, [])

  // Guardar la selección de servicios en el almacenamiento local cada vez que cambie
  useEffect(() => {
    localStorage.setItem(
      "serviciosSeleccionados",
      JSON.stringify(serviciosSeleccionados)
    );
  }, [serviciosSeleccionados]);
  //fin Servicios.jsx

  //Calendario.jsx

  // Obtener la selección de fecha del almacenamiento local
  const storedDate = () => {
    const fechaSeleccionada = localStorage.getItem("fechaSeleccionada");
    if (fechaSeleccionada) {
      return JSON.parse(fechaSeleccionada);
    } else {
      return null;
    }
  };

  const [fechaSeleccionada, setFechaSeleccionada] = useState(storedDate());
  const agregarFecha = (fecha) => {
    const fechaObjeto = {
      dia: fecha.getDate(),
      mes: fecha.getMonth() + 1,
      año: fecha.getFullYear(),
    };
    console.log("Agregando fecha", fechaObjeto);
    setFechaSeleccionada(fechaObjeto);
  };

  const eliminarFecha = useCallback(() => {
    console.log("Eliminando fecha");
    setFechaSeleccionada(null);
  }, []);

  // Guardar la selección de fecha en el almacenamiento local cada vez que cambie
  useEffect(() => {
    localStorage.setItem(
      "fechaSeleccionada",
      JSON.stringify(fechaSeleccionada)
    );
  }, [fechaSeleccionada]);

  //fin Calendario.jsx

  // Horarios.jsx
  // Obtener la selección de horarios del almacenamiento local
  const storedHorarios = () => {
    const horariosSeleccionados = localStorage.getItem("horariosSeleccionados");
    if (horariosSeleccionados) {
      return JSON.parse(horariosSeleccionados);
    } else {
      return [];
    }
  };
  //estado de horarios seleccionados
  const [horariosSeleccionados, setHorariosSeleccionados] = useState(
    storedHorarios()
  );

  //funcion para agregar horarios
  const agregarHorario = (horario) => {
    console.log("Agregando horario de", horario);
    setHorariosSeleccionados(horario);
  };

  const eliminarHorario = useCallback(() => {
    setHorariosSeleccionados([]);
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "horariosSeleccionados",
      JSON.stringify(horariosSeleccionados)
    );
  }, [horariosSeleccionados]);

  // fin Horarios.jsx

  // Datos.jsx

  const storedDatos = () => {
    const datos = localStorage.getItem("datos");
    if (datos) {
      return JSON.parse(datos);
    } else {
      return { nombre: "", email: "", telefono: "", rut: "" };
    }
  };
  
  const [datos, setDatos] = useState(storedDatos());
  const agregarDatos = (data) => {
    setDatos({ ...datos, ...data});
  };

  const eliminarDatos = useCallback(() => {
    setDatos({ nombre: "", email: "", telefono: "", rut: "" });
  }, [])

  useEffect(() => {
    localStorage.setItem("datos", JSON.stringify(datos));
  }, [datos]);

  // fin Datos.jsx

  return (
    <SelectionContext.Provider
      value={{
        serviciosSeleccionados,
        agregarServicio,
        eliminarServicio,
        limpiarServicios,
        fechaSeleccionada,
        agregarFecha,
        eliminarFecha,
        horariosSeleccionados,
        agregarHorario,
        eliminarHorario,
        datos,
        agregarDatos,
        eliminarDatos,
      }}
    >
      {children}
    </SelectionContext.Provider>
  );
};
