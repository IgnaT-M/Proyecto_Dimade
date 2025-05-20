import React from "react";
import Slider from "react-slick";
import { Box, Typography, Card, CardMedia, CardContent } from "@mui/material";
import img1 from "../assets/imagenes/img1.jpg";

// Ejemplo de datos de proveedores
const proveedores = [
  {
    nombre: "Proveedora Norte",
    descripcion: "Materiales de alta resistencia.",
    imagen: "DIMADE/src/assets/imagenes/img1.jpg",
  },
  {
    nombre: "Construmat Sur",
    descripcion: "Especialistas en cemento y áridos.",
    imagen: { img1 },
  },
  {
    nombre: "Ferretería Central",
    descripcion: "Todo para tu proyecto.",
    imagen: { img1 },
  },
  {
    nombre: "EcoMateriales",
    descripcion: "Soluciones sostenibles.",
    imagen: { img1 },
  },
  {
    nombre: "9",
    descripcion: "32.",
    imagen: { img1 },
  },
];

const settings = {
  dots: true,
  infinite: true,
  speed: 600,
  slidesToShow: 3,
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
        Nuestros Proveedores
      </Typography>
      <Slider {...settings}>
        {proveedores.map((prov, index) => (
          <Box key={index} px={2}>
            <Card sx={{ borderRadius: 2, overflow: "hidden" }}>
              <CardMedia
                component="img"
                height="180"
                image={prov.imagen}
                alt={prov.nombre}
              />
              <CardContent>
                <Typography variant="h6" fontWeight="bold">
                  {prov.nombre}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {prov.descripcion}
                </Typography>
              </CardContent>
            </Card>
          </Box>
        ))}
      </Slider>
    </Box>
  );
};

export default ProveedorSlider;
