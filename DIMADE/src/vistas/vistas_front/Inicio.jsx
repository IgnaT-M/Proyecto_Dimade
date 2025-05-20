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
import img1 from "../../assets/imagenes/img1.jpg";

const categorias = [
  { titulo: "Construccion", imagen: img1 },
  { titulo: "Ferretería", imagen: img1 },
  { titulo: "Herramientas", imagen: img1 },
  { titulo: "Electricidad", imagen: img1 },
];

const Home = () => {
  return (
    <>
      <Navbar />
      <Banner />

      {/* Grid de Categorías */}
      <Box sx={{ px: 4, py: 6 }}>
        <Typography
          variant="h4"
          fontWeight="bold"
          gutterBottom
          textAlign="center"
        >
          Categorías de Productos
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {categorias.map((cat, index) => (
            <Grid
              item
              xs={12} // 1 columna en pantallas chicas
              sm={6} // 2 columnas en pantallas medianas (≥600px)
              md={6} // 2 columnas en pantallas grandes (≥900px)
              lg={6}
              xl={6}
              key={index}
              display="flex"
              justifyContent="center"
            >
              <CategoryCard
                titulo={cat.titulo}
                imagen={cat.imagen}
                onClick={() => console.log(`Redirigiendo a ${cat.titulo}`)}
              />
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* MiniBanner con botón */}
      <MiniBanner
        titulo="¡Conoce nuestros proveedores!"
        subtitulo="Calidad y variedad para tu negocio"
        imagenFondo={img1}
        botonTexto="Ver más"
        onBotonClick={() => console.log("Hiciste clic en Ver más")}
      />

      {/* Slider de proveedores */}
      <ProveedorSlider />

      <Footer />
    </>
  );
};

export default Home;
