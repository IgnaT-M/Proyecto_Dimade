import React from "react";
import { Box, Typography, Container } from "@mui/material";
import img1 from "../assets/imagenes/img1.jpg";

const Banner = () => {
  return (
    <Box
      sx={{
        height: "60vh",
        backgroundImage: `url(${img1})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "start",
        color: "darkText",
      }}
    >
      <Container>
        <Typography
          variant="h1"
          sx={{
            textShadow: "2px 2px 8px rgba(0,0,0,0.6)",
          }}
        >
          BIENVENIDO A DIMADE
        </Typography>
        <Typography
          variant="h5"
          sx={{
            mt: 2,
            textShadow: "1px 1px 6px rgba(0,0,0,0.5)",
          }}
        >
          Distribución integral de productos para el negocio
        </Typography>
      </Container>
    </Box>
  );
};

export default Banner;
