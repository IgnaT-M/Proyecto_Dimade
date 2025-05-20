import React from "react";
import { Box, Typography, Container } from "@mui/material";
import CoolButton from "./Boton";

const MiniBanner = ({
  titulo,
  subtitulo,
  imagenFondo,
  botonTexto,
  onBotonClick,
}) => {
  return (
    <Box
      sx={{
        height: "30vh",
        backgroundImage: `url(${imagenFondo})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "start",
        textAlign: "start",
        color: "black",
        px: 4,
      }}
    >
      <Container>
        <Typography
          variant="h2"
          sx={{
            textShadow: "2px 2px 8px rgba(255, 255, 255, 0.6)",
            mb: 1,
          }}
        >
          {titulo}
        </Typography>
        {subtitulo && (
          <Typography
            variant="h5"
            sx={{
              mb: 3,
              textShadow: "1px 1px 6px rgba(0,0,0,0.5)",
            }}
          >
            {subtitulo}
          </Typography>
        )}
        {botonTexto && <CoolButton text={botonTexto} onClick={onBotonClick} />}
      </Container>
    </Box>
  );
};

export default MiniBanner;
