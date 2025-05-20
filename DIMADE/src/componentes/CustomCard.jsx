import React from "react";
import { Card, CardMedia, CardContent, Typography, Box } from "@mui/material";
import CoolButton from "./Boton"; // Asegúrate de importar el botón pulento correctamente

const CustomCard = ({ titulo, imagen, onClick }) => {
  return (
    <Card
      elevation={1}
      sx={{
        width: "100%",
        maxWidth: 360,

        overflow: "hidden",
        mx: "auto",
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
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          {titulo}
        </Typography>
        <Box mt={2}>
          <CoolButton text="Ver productos" onClick={onClick} />
        </Box>
      </CardContent>
    </Card>
  );
};

export default CustomCard;
