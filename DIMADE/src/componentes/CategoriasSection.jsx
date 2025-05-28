import React from "react";
import {
  Box,
  Grid,
  Typography,
  Card,
  CardMedia,
  CardContent,
} from "@mui/material";
import img1 from "DIMADE/public/imagenes/img1.jpg";

const categorias = [
  {
    titulo: "Construcción",
    descripcion:
      "Materiales y soluciones estructurales para obras pequeñas y grandes proyectos.",
    imagen: img1,
  },
  {
    titulo: "Ferretería",
    descripcion:
      "Pernos, tuercas, clavos, bisagras y todo lo necesario para tus trabajos del día a día.",
    imagen: img1,
  },
  {
    titulo: "Herramientas",
    descripcion:
      "Desde martillos hasta taladros eléctricos, tenemos la herramienta ideal para cada tarea.",
    imagen: img1,
  },
  {
    titulo: "Electricidad",
    descripcion:
      "Cables, enchufes, focos y componentes eléctricos seguros y certificados.",
    imagen: img1,
  },
];

const CategoriasSection = () => {
  return (
    <Box sx={{ px: 4, py: 6, backgroundColor: "#f9f9f9" }}>
      <Typography
        variant="h4"
        fontWeight="bold"
        textAlign="center"
        gutterBottom
      >
        Nuestras Categorías
      </Typography>
      <Typography variant="subtitle1" textAlign="center" mb={4}>
        Explora nuestros productos organizados por rubro
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        {categorias.map((cat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card
              elevation={0}
              sx={{
                width: "40vw",
                transition: "transform 0.3s ease",
                "&:hover": {
                  transform: "scale(1.05)",
                },
              }}
            >
              <CardMedia
                component="img"
                height="180"
                image={cat.imagen}
                alt={cat.titulo}
              />
              <CardContent>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  {cat.titulo}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {cat.descripcion}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default CategoriasSection;
