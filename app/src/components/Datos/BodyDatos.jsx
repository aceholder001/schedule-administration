import React, { useContext,useState,useEffect } from "react";
import "./datos.css";
import { useNavigate  } from "react-router-dom";
import { SelectionContext } from "../../context/SelectionContext";
import { useForm } from "react-hook-form";
import { validateRut,formatRut } from 'rutlib'
import axios from 'axios';

function BodyDatos() {
  const { datos, agregarDatos } = useContext(SelectionContext);
  const [isValidRut, setIsValidRut] = useState(false);
  const [rutError, setRutError] = useState('');
  const [submitted, setSubmitted] = useState(false); // Estado para rastrear si el formulario se ha enviado
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  
  const onSubmit = async(data, e) => {
    if (!data.nombre || !data.email || !data.telefono || !isValidRut) {
      e.preventDefault(); // detiene el envío del formulario
      return;
    }
    
    data.rut = formatRut(data.rut);
    console.log(data);
    agregarDatos(data);
    setSubmitted(true); // Marca el formulario como enviado
  };
  useEffect(() => {
    if (submitted) {
      navigate('/Confirmacion'); // Redirige a la página de confirmación
    }
  }, [submitted])
  
  return (
    <div className="container-body-datos">
      <h1 className="titulo-datos">Ingresa Tus Datos</h1>
      <form className="formulario" onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="campo-datos">
          <input
            type="text"
            id="nombre"
            name="nombre"
            {...register("nombre", { required: true })}
            placeholder={
              errors.nombre ? "Nombre es requerido" : "Nombre Completo"
            }
            className={errors.nombre ? "error" : ""}
          />
        </div>

        <div className="campo-datos">
          <input
            type="email"
            id="email"
            name="email"
            {...register("email", { required: true })}
            placeholder={errors.email ? "Email es requerido" : "Email"}
            className={errors.email ? "error" : ""}
          />
        </div>

        <div className="campo-datos">
          <input
            type="tel"
            id="telefono"
            name="telefono"
            {...register("telefono", { required: true })}
            placeholder={errors.telefono ? "Telefono es requerido" : "Telefono"}
            className={errors.telefono ? "error" : ""}
          />
        </div>

        <div className="campo-datos">
          <input
            type="text"
            id="rut"
            name="rut"
            pattern="[0-9]{1,2}.[0-9]{3}.[0-9]{3}-[0-9Kk]{1}"
            {...register("rut", { required: true })}
            placeholder={errors.rut ? "Rut es requerido" : "Rut"}
            className={errors.rut ? "error" : ""}
            onBlur={(e) => {
                const rut = e.target.value;
                // if (!validateRut(rut)) {
                //     setRutError('RUT no válido');
                //     setIsValidRut(false);
                //   } else {
                    setRutError(''); // limpia el mensaje de error si el RUT es válido
                    setIsValidRut(true);
                  // }

            }}
          />
          {rutError && <p className="error-message">{rutError}</p>}
        </div>

        <input type="submit" className="boton-datos" value="Agendar Cita" />
      </form>
    </div>
  );
}

export default BodyDatos;
