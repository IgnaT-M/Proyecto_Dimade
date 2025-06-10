import React from "react";
import Navbar from "../../componentes/NavBar.jsx";
import Footer from "../../componentes/Footer.jsx";
import Banner from "../../componentes/Banner.jsx";
import ProveedorSlider from "../../componentes/Slider.jsx";
import CategoriasSection from "../../componentes/CategoriasSection.jsx";
import Header from "../../componentes/Header.jsx";
import banner_productos from "/public/banner_productos.jpg";

const Productos = () => {
  return (
    <>
      <Navbar />
      <Header  imagenFondo={banner_productos} />
     
      <CategoriasSection />
      <br />
      
      <ProveedorSlider />
      <Footer />
    </>
  );
};

export default Productos;
