import React from "react";
import { Box, Typography } from "@mui/material";
import img1 from "../../public/imagenes/img1.jpg"; // Ajusta la ruta si es necesario

const Banner = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        py: 3,
        px: { xs: 2, md: 10 },
        width: "100%",
        marginLeft: "calc(-50vw + 50%)",
      }}
    >
      {/* Columna del texto */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          p: { xs: 2, md: 6 },
          paddingRight: { xs: 2, md: 10 },
          textAlign: "left",
        }}
      >
        <Typography
          variant="h3"
          sx={{
            textShadow: "2px 2px 8px rgba(0,0,0,0.6)",
            fontWeight: "bold",
            mb: 4,
          }}
        >
          Compras para tu negocio, sin complicaciones
        </Typography>
        <Typography
          variant="body1"
          sx={{
            textShadow: "1px 1px 2px rgba(0,0,0,0.5)",
          }}
        >
          En DIMADE gestionamos tus compras empresariales con productos de
          calidad y atención personalizada. Ahorra tiempo y energía mientras
          nosotros nos encargamos de tus pedidos. Surtir tu negocio nunca fue
          tan fácil.
        </Typography>
      </Box>

      {/* Columna de la imagen*/}
      <Box
        component="img"
        src={img1}
        alt="Imagen referencial Dimade"
        sx={{
          flex: 1,
          display: { xs: "none", md: "block" },
          width: "50%",
          height: { xs: "30vh", md: "auto" },
          objectFit: "cover",
          mb: { xs: 2, md: 2 },
          mt: { xs: 2, md: 2 },
          mr: { xs: 0, md: 2 },
        }}
      />
    </Box>
  );
};

export default Banner;
