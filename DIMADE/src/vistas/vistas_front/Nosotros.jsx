import React from "react";
import Navbar from "../../componentes/NavBar.jsx";
import Footer from "../../componentes/Footer.jsx";
import Banner from "../../componentes/Banner.jsx";
import { Box, Container, Grid, Typography, Stack } from "@mui/material";
import Header from "../../componentes/Header.jsx";
import img1 from "../../assets/imagenes/img1.jpg";

const Us = () => {
  return (
    <>
      <Navbar />
      <Header titulo="Nosotros" subtitulo="Hola" imagenFondo={img1} />
      imagen texto
      <br />
      texto imagenes
      <Footer />
    </>
  );
};

export default Us;
