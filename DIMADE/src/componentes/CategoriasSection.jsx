import React, { useState } from "react";
import {
  Box,
  Grid,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Pagination,
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import img1 from "DIMADE/public/imagenes/img1.jpg"; // Asegura que esta ruta se resuelve bien

const categorias = [
  {
    titulo: "Construcción",
    descripcion: "Materiales y soluciones estructurales...",
    imagen: img1,
  },
  {
    titulo: "Ferretería",
    descripcion: "Pernos, tuercas, clavos...",
    imagen: img1,
  },
  {
    titulo: "Herramientas",
    descripcion: "Martillos, taladros, sierras...",
    imagen: img1,
  },
  {
    titulo: "Electricidad",
    descripcion: "Cables, enchufes, focos...",
    imagen: img1,
  },
  {
    titulo: "Pinturas",
    descripcion: "Esmaltes, accesorios...",
    imagen: img1,
  },
  {
    titulo: "Jardinería",
    descripcion: "Palas, regaderas, fertilizantes...",
    imagen: img1,
  },
  {
    titulo: "Plomería",
    descripcion: "Tubos, llaves, conexiones...",
    imagen: img1,
  },
  {
    titulo: "Seguridad",
    descripcion: "Cascos, guantes, protección...",
    imagen: img1,
  },
];

const CategoriasSection = () => {
  const itemsPorPagina = 4;
  const [paginaActual, setPaginaActual] = useState(1);
  const totalPaginas = Math.ceil(categorias.length / itemsPorPagina);

  const handleCambioPagina = (event, nuevaPagina) => {
    setPaginaActual(nuevaPagina);
  };

  const categoriasMostradas = categorias.slice(
    (paginaActual - 1) * itemsPorPagina,
    paginaActual * itemsPorPagina
  );

  return (
    <Box sx={{ px: 4, py: 6, backgroundColor: "#f9f9f9" }}>
      <AnimatePresence mode="wait">
        <motion.div
          key={paginaActual}
          initial={{ opacity: 0, x: 100 }} // Empieza 20px a la derecha, opacidad 0.9
          animate={{ opacity: 1, x: 0 }} // Llega a posición natural y opacidad 1
          exit={{ opacity: 0, x: -100 }} // Al salir, opacidad vuelve a 0.9 y se va a la izquierda 20px
          transition={{
            duration: 0.5,
            ease: "easeInOut",
          }}
          style={{ width: "100%", display: "block" }}
        >
          <Grid container spacing={2} justifyContent="center">
            {categoriasMostradas.map((cat, index) => (
              <Grid item xs={12} sm={6} md={6} lg={6} xl={6} key={index}>
                <Card
                  elevation={0}
                  sx={{
                    height: "100%",
                    width: "40vw",
                    transition: "transform 0.3s ease",
                    "&:hover": {
                      transform: "scale(1.03)",
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
        </motion.div>
      </AnimatePresence>

      <Box mt={6} display="flex" justifyContent="center">
        <Pagination
          count={totalPaginas}
          page={paginaActual}
          onChange={handleCambioPagina}
          color="primary"
        />
      </Box>
    </Box>
  );
};

export default CategoriasSection;
