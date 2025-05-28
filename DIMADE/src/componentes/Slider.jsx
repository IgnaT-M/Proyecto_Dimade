import React from "react";
import Slider from "react-slick";
import { Box, Typography, Card, CardMedia, CardContent } from "@mui/material";
import cerecita from "../../public/imagenes/marcas/cerecita.png";
import kolor from "../../public/imagenes/marcas/kolor.png";
import sherwin from "../../public/imagenes/marcas/sherwin.jpg";
import sipa from "../../public/imagenes/marcas/sipa.png";

// Datos de proveedores
const proveedores = [
  {
    nombre: "Cerecita",
    descripcion: "Cerecita",
    imagen: cerecita,
  },
  {
    nombre: "Kölor",
    descripcion: "Kölor",
    imagen: kolor,
  },
  {
    nombre: "Sherwin-Williams",
    descripcion: "Sherwin-Williams",
    imagen: sherwin,
  },
  {
    nombre: "Sipa",
    descripcion: "Sipa",
    imagen: sipa,
  },
];

const settings = {
  dots: true,
  infinite: true,
  speed: 600,
  slidesToShow: 4,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 4000,
  responsive: [
    {
      breakpoint: 960,
      settings: { slidesToShow: 2 },
    },
    {
      breakpoint: 600,
      settings: { slidesToShow: 1 },
    },
  ],
};

const ProveedorSlider = () => {
  return (
    <Box sx={{ maxWidth: 1200, mx: "auto", my: 6, px: 2 }}>
      <Typography
        variant="h4"
        fontWeight="bold"
        textAlign="center"
        gutterBottom
      >
        Algunas de nuestras marcas
      </Typography>
      <Slider {...settings}>
        {proveedores.map((prov, index) => (
          <Box key={index} px={2} display="flex" justifyContent="center">
            <Card
              sx={{
                width: 200,
                height: 200,
                borderRadius: "50%",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                boxShadow: 3,
              }}
            >
              <CardMedia
                component="img"
<<<<<<< HEAD
                height="180vw"
=======
>>>>>>> 7d551ecd7740484ee72b2cfadc1edab227172751
                image={prov.imagen}
                alt={prov.nombre}
                sx={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                }}
              />
            </Card>
          </Box>
        ))}
      </Slider>
    </Box>
  );
};

export default ProveedorSlider;
