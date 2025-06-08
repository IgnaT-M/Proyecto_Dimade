import React from "react";
import { Box, Typography } from "@mui/material";
import banner_inicio from "../../public/banner_inicio.jpg"; // Ajusta la ruta si es necesario

const Banner = () => {
  return (
    <Box
      sx={{
        width: "100%", // 70% del ancho de la pantalla
        margin: "0 auto",
        height: "40vh", // Alto automático o según contexto
        overflow: "hidden",
        display: { xs: "none", md: "block" },
      }}
    >
      <Box
        component="img"
        src={banner_inicio}
        alt="Imagen referencial Dimade"
        sx={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />
    </Box>
  );
};

export default Banner;
