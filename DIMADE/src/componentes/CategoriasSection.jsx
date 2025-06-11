import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Pagination,
  Fade,
} from "@mui/material";
import img1 from "DIMADE/public/imagenes/img1.jpg"; // Ajusta la ruta si es necesario

const categorias = [
  {
    titulo: "Construcción",
    descripcion: "Todo lo necesario para construir con solidez y eficiencia.",
    imagen: "/construccion.jpg",
  },
  {
    titulo: "Pinturas, Adhesivos y Aditivos",
    descripcion: "Colores, fijación y protección para cada superficie.",
    imagen: "/pinturas.jpg",
  },
  {
    titulo: "Herramientas y Maquinaria",
    descripcion: "Maquinaria y herramientas listas para cualquier desafío.",
    imagen: "/herramientas.jpg",
  },
  {
    titulo: "Ferretería",
    descripcion: "Todo en fijaciones, herrajes y accesorios para tu proyecto.",
    imagen: "/ferreteria.jpg",
  },
  {
    titulo: "Maderas y Tableros",
    descripcion: "Variedad en maderas para estructuras y terminaciones.",
    imagen: "/madera.jpg",
  },
  {
    titulo: "Pisos y Revestimientos",
    descripcion: "Revestimientos que transforman tus espacios.",
    imagen: "/pisos.jpg",
  },
  {
    titulo: "Electricidad e Iluminación",
    descripcion: "Soluciones eléctricas seguras y modernas.",
    imagen: "/electricidad.jpg",
  },
  {
    titulo: "Puertas y Ventanas",
    descripcion: "Accesos y terminaciones que combinan seguridad y diseño.",
    imagen: "/puertasyventanas.jpg",
  },
  {
    titulo: "Electrohogar",
    descripcion: "Tecnología eficiente para facilitar tu vida en el hogar.",
    imagen: "/electrohogar.jpg",
  },
  {
    titulo: "Aseo",
    descripcion: "Productos que garantizan limpieza, frescura y bienestar en cada rincón.",
    imagen: "/aseo.jpg",
  },
  {
    titulo: "Baño y Cocina",
    descripcion: "Funcionalidad y estilo para los espacios más usados de tu hogar.",
    imagen: "/bañoycocina.jpg",
  },
  {
    titulo: "Gasfitería",
    descripcion: "Soluciones seguras y duraderas para tu red de agua y gas.",
    imagen: "/gasfiteria.jpg",
  },  {
    titulo: "Muebles y Organización",
    descripcion: "Diseño inteligente para ordenar, decorar y optimizar cada espacio.",
    imagen: "/muebles.jpg",
  },
  {
    titulo: "Decoración y Menaje",
    descripcion: "Detalles que transforman tu casa en un hogar acogedor y con estilo.",
    imagen: "/decoracion.jpg",
  },
  {
    titulo: "Climatización",
    descripcion: "Confort en cualquier estación con sistemas eficientes de temperatura.",
    imagen: "/climatizacion.jpg",
  },
  {
    titulo: "Aire Libre",
    descripcion: "Disfruta del exterior con productos ideales para patios, terrazas y jardines.",
    imagen:"/airelibre.jpg",
  }
];


const CategoriasSection = () => {
  const itemsPorPagina = 4;
  const [paginaActual, setPaginaActual] = useState(1);
  const [animar, setAnimar] = useState(true);

  const totalPaginas = Math.ceil(categorias.length / itemsPorPagina);

  const handleCambioPagina = (event, nuevaPagina) => {
    setAnimar(false);
    setTimeout(() => {
      setPaginaActual(nuevaPagina);
      setAnimar(true);
    }, 250); // Tiempo de fade out
  };

  const categoriasMostradas = categorias.slice(
    (paginaActual - 1) * itemsPorPagina,
    paginaActual * itemsPorPagina
  );

  return (
    <Box sx={{ px: 4, py: 6, backgroundColor: "#f9f9f9" }}>
  

      {/* Contenedor animado */}
      <Fade in={animar} timeout={300}>
        <Grid container spacing={4} justifyContent="center">
          {categoriasMostradas.map((cat, index) => (
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
      </Fade>

      {/* Paginación */}
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