<<<<<<< HEAD
import React, { useState, useEffect } from "react";
=======
import React, { useState } from "react";
>>>>>>> origin/main
import {
  Box,
  Typography,
  List,
  ListItemButton,
  ListItemText,
  Divider,
  CardMedia,
<<<<<<< HEAD
  CardContent,
  Pagination,
  Fade,
} from "@mui/material";
import img1 from "DIMADE/public/imagenes/img1.jpg"; // Ajusta la ruta si es necesario
=======
  Button,
  Paper,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
>>>>>>> origin/main

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
<<<<<<< HEAD
=======
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
    descripcion:
      "Productos que garantizan limpieza, frescura y bienestar en cada rincón.",
    imagen: "/aseo.jpg",
  },
  {
    titulo: "Baño y Cocina",
    descripcion:
      "Funcionalidad y estilo para los espacios más usados de tu hogar.",
    imagen: "/bañoycocina.jpg",
  },
  {
    titulo: "Gasfitería",
    descripcion: "Soluciones seguras y duraderas para tu red de agua y gas.",
    imagen: "/gasfiteria.jpg",
  },
  {
    titulo: "Muebles y Organización",
    descripcion:
      "Diseño inteligente para ordenar, decorar y optimizar cada espacio.",
    imagen: "/muebles.jpg",
  },
  {
    titulo: "Decoración y Menaje",
    descripcion:
      "Detalles que transforman tu casa en un hogar acogedor y con estilo.",
    imagen: "/decoracion.jpg",
  },
  {
    titulo: "Climatización",
    descripcion:
      "Confort en cualquier estación con sistemas eficientes de temperatura.",
    imagen: "/climatizacion.jpg",
  },
  {
    titulo: "Aire Libre",
    descripcion:
      "Disfruta del exterior con productos ideales para patios, terrazas y jardines.",
    imagen: "/airelibre.jpg",
>>>>>>> origin/main
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
<<<<<<< HEAD
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
=======
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(
    categorias[0]
  );
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const renderMenu = (categoriasMenu, align = "left") => (
    <Box
      sx={{
        width: isMobile ? "100%" : "20%",
        backgroundColor: "#10567E",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        maxHeight: isMobile ? "auto" : 600,
      }}
    >
      <Typography
        variant="h6"
        sx={{
          color: "#fff",
          px: 2,
          py: 2,
          fontWeight: "bold",
          borderBottom: "1px solid rgba(255,255,255,0.2)",
        }}
      >
        Categorías
      </Typography>
      <List
        disablePadding
        sx={{
          overflowY: categoriasMenu.length > 8 ? "auto" : "visible",
        }}
      >
        {categoriasMenu.map((cat, index) => {
          const selected = categoriaSeleccionada.titulo === cat.titulo;
          return (
            <React.Fragment key={index}>
              <ListItemButton
                onClick={() => setCategoriaSeleccionada(cat)}
                sx={{
                  py: 0,
                  backgroundColor: selected ? "#30749C" : "transparent",
                  color: selected ? "#fff" : "#fff",
                  fontWeight: selected ? "bold" : "normal",
                  "&:hover": {
                    backgroundColor: selected ? "#30749C" : "#30749C",
                  },
                }}
              >
                <ListItemText primary={cat.titulo} />
              </ListItemButton>
              <Divider sx={{ borderColor: "rgba(255,255,255,0.2)" }} />
            </React.Fragment>
          );
        })}
      </List>
    </Box>
  );

  return (
    <Box
      sx={{
        px: 2,
        py: 4,
        backgroundColor: "#fff",

        display: "flex",
        justifyContent: "center",
      }}
    >
      <Paper
        elevation={0}
        sx={{
          width: "100%",
          maxWidth: "1400px",
          display: "flex",

          flexDirection: isMobile ? "column" : "row",

          overflow: "hidden",
        }}
      >
        {renderMenu(categorias, "left")}

        <Box
          sx={{
            flexGrow: 1,
            backgroundColor: "#fff",
            p: 4,
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            gap: 4,
            justifyContent: "space-between",
          }}
        >
          <Box
            sx={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <Box>
              <Typography variant="h4" fontWeight="bold" gutterBottom>
                {categoriaSeleccionada.titulo}
              </Typography>
              <Typography variant="body1" mb={2}>
                {categoriaSeleccionada.descripcion}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Productos destacados próximamente...
              </Typography>
            </Box>
            <Box textAlign="right" mt={4}>
              <Button variant="contained" size="large" color="primary">
                Cotizar ahora
              </Button>
            </Box>
          </Box>
        </Box>
        <CardMedia
          component="img"
          image={categoriaSeleccionada.imagen}
          alt={categoriaSeleccionada.titulo}
          sx={{
            width: isMobile ? "100%" : "45%",
            objectFit: "cover",
            maxHeight: 600,
            maxWidth: 400,
          }}
        />
      </Paper>
>>>>>>> origin/main
    </Box>
  );
};

export default CategoriasSection;