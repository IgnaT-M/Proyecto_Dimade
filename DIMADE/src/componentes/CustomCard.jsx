import React from "react";
import { Card, CardMedia, CardContent, Typography, Box } from "@mui/material";
import CoolButton from "./Boton"; // Asegúrate de importar el botón pulento correctamente

const CustomCard = ({ titulo, imagen, onClick }) => {
  return (
    <Card
      elevation={1}
      sx={{
        width: "100%",
        height: "100%", // Opcional
        transition: "transform 0.3s ease",
        "&:hover": {
          transform: "scale(1.03)",
        },
      }}
    >
      <CardMedia
        component="img"
        height="180"
        image={imagen}
        alt={titulo}
        sx={{ objectFit: "cover" }}
      />
      <CardContent>
        <Typography variant="h5" gutterBottom>
          {titulo}
        </Typography>
        <Box mt={2}>
          <CoolButton text="Ver mas" onClick={onClick} />
        </Box>
      </CardContent>
    </Card>
  );
};

export default CustomCard;
