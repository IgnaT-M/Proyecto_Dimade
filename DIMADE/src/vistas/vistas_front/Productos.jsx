import React from "react";
import Navbar from "../../componentes/NavBar.jsx";
import Footer from "../../componentes/Footer.jsx";
import Banner from "../../componentes/Banner.jsx";
import ProveedorSlider from "../../componentes/Slider.jsx";
import CategoriasSection from "../../componentes/CategoriasSection.jsx";
import Header from "../../componentes/Header.jsx";
import img1 from "../../assets/imagenes/img1.jpg";

const Productos = () => {
  return (
    <>
      <Navbar />
      <Header titulo="Productos" subtitulo="Hola1" imagenFondo={img1} />
      card categorias
      <CategoriasSection />
      <br />
      slider proveedores
      <ProveedorSlider />
      <Footer />
    </>
  );
};

export default Productos;
