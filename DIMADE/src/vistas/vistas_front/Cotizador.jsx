import React from "react";
import Navbar from "../../componentes/NavBar.jsx";
import Footer from "../../componentes/Footer.jsx";
import Banner from "../../componentes/Banner.jsx";
import CotizaForm from "../../componentes/CotizaForm.jsx";
import Cubicador from "../../componentes/Cubicador.jsx";
import Header from "../../componentes/Header.jsx";
import img1 from "../../assets/imagenes/img1.jpg";

const Cotizar = () => {
  return (
    <>
      <Navbar />
      <Header titulo="Cotizador" subtitulo="Hola" imagenFondo={img1} />
      <CotizaForm />
      formulario cotizar
      <br />
      <Cubicador />
      cubicador
      <Footer />
    </>
  );
};

export default Cotizar;
