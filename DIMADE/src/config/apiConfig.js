//archivo de configuración de la API
// Este archivo contiene la URL base de la API que se utilizará en toda la aplicación

const BASE_URL =
  import.meta.env.VITE_API_URL || "https://proyecto-dimade.onrender.com";

//import.meta.env.VITE_API_URL || "http://localhost:8080";

export default BASE_URL;
