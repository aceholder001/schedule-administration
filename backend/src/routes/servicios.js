const { Router } = require("express");
const router = Router();

const {
  crearServicios,
  obtenerServicio,
  obtenerServicios,
  modificarServicio,
  eliminarServicio,
} = require("../controllers/Servicios-controller");

// Para todos los servicios : for all services
router
  .route("/")
  .post(crearServicios)// Para crear un nuevo servicio : To create a new service
  .get(obtenerServicios);// Para obtener todos los servicios : To get all the services

// Para servicios individuales por id : For individual services by id
router
  .route("/:id")
  .get(obtenerServicio) // Para obtener los detalles de un servicio : To get the details of a service
  .put(modificarServicio) // Para modificar un servicio existente : To modify an existing service
  .delete(eliminarServicio); // Para eliminar un servicio : To remove a service

module.exports = router;
