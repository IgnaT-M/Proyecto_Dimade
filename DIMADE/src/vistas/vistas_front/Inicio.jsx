import React from "react";
import Navbar from "../../componentes/NavBar.jsx";
import Footer from "../../componentes/Footer.jsx";
import Banner from "../../componentes/Banner.jsx";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ProveedorSlider from "../../componentes/Slider.jsx";
import MiniBanner from "../../componentes/MiniBanner.jsx";
import CategoryCard from "../../componentes/CustomCard.jsx";
import { Grid, Box, Typography } from "@mui/material";
// import img1 from "../../../public/imagenes/img1.jpg"; // Asegúrate de que la ruta sea correcta
import Carousel from "../../componentes/carusel.jsx";

// const categorias = [
//   { titulo: "Construccion", imagen: img1 },
//   { titulo: "Ferretería", imagen: img1 },
//   { titulo: "Herramientas", imagen: img1 },
//   { titulo: "Electricidad", imagen: img1 },
// ];

const Home = () => {
  return (
    <>
      <Navbar />
      <Banner />
      <Carousel />
      <ProveedorSlider />
      <Footer />
    </>
  );
};

export default Home;
