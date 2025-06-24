import React, { useState } from "react";
import {
  Box,
  Typography,
  List,
  ListItemButton,
  ListItemText,
  Divider,
  CardMedia,
  Paper,
  Button,
  useTheme,
  useMediaQuery,
} from "@mui/material";

import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Backdrop from "@mui/material/Backdrop";
import CotizaForm from "../componentes/CotizaForm.jsx";

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
    gambar: "/madera.jpg", // Corrección: 'gambar' a 'imagen'
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
  },
];

const CategoriasSection = () => {
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(
    categorias[0]
  );

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [openCotizar, setOpenCotizar] = useState(false);

  // Estilos del modal que ahora usarán el tema
  const styleModal = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    p: 4,
    borderRadius: 3,
    boxShadow: 24,
    bgcolor: theme.palette.modalBg, // Usa el color del modal del tema
    color: theme.palette.text.primary, // El texto del modal según el tema
    maxHeight: "90vh",
    overflowY: "auto",
  };

  const renderMenu = (categoriasMenu) => (
    <Box
      sx={{
        width: isMobile ? "100%" : "20%",
        backgroundColor: theme.palette.categoryMenuBg, // Usa el color de fondo del menú de categorías del tema
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        maxHeight: isMobile ? "auto" : 600,
      }}
    >
      <Typography
        variant="h6"
        id="productos"
        sx={{
          color: theme.palette.categoryMenuText, // Usa el color de texto del menú de categorías
          px: 2,
          py: 2,
          fontWeight: "bold",
          borderBottom: `1px solid ${theme.palette.categoryMenuDivider}`, // Usa el color del divisor
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
                  backgroundColor: selected
                    ? theme.palette.categoryMenuSelectedBg // Color de fondo de categoría seleccionada
                    : "transparent",
                  color: theme.palette.categoryMenuText, // Color del texto de las categorías (siempre blanco)
                  fontWeight: selected ? "bold" : "normal",
                  "&:hover": {
                    backgroundColor: theme.palette.categoryMenuHoverBg, // Color de fondo en hover
                  },
                }}
              >
                <ListItemText primary={cat.titulo} />
              </ListItemButton>
              <Divider
                sx={{ borderColor: theme.palette.categoryMenuDivider }}
              />{" "}
              {/* Usa el color del divisor */}
            </React.Fragment>
          );
        })}
      </List>
    </Box>
  );

  return (
    <>
      <Box
        sx={{
          px: 2,
          py: 4,
          backgroundColor: theme.palette.background.default, // Fondo exterior de la sección (el color por defecto del tema)
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
          {renderMenu(categorias)}

          <Box
            sx={{
              flexGrow: 1,
              backgroundColor: theme.palette.categoryContentBg, // Fondo del contenido principal de la categoría
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
                <Typography
                  variant="h4"
                  fontWeight="bold"
                  gutterBottom
                  color={theme.palette.text.primary}
                >
                  {categoriaSeleccionada.titulo}
                </Typography>
                <Typography
                  variant="body1"
                  mb={2}
                  color={theme.palette.text.primary}
                >
                  {categoriaSeleccionada.descripcion}
                </Typography>
                <Typography
                  variant="body2"
                  color={theme.palette.text.secondary}
                >
                  Productos destacados próximamente...
                </Typography>
              </Box>
              <Box textAlign="right" mt={4}>
                <Button
                  variant="contained"
                  size="large"
                  color="primary" // El botón "Cotizar ahora" usa el color primary del tema
                  onClick={() => setOpenCotizar(true)}
                >
                  Cotizar ahora
                </Button>
              </Box>
            </Box>
            {/* Solo se muestra la imagen si no es móvil */}
            {!isMobile && (
              <CardMedia
                component="img"
                image={categoriaSeleccionada.imagen}
                alt={categoriaSeleccionada.titulo}
                sx={{
                  width: "45%",
                  objectFit: "cover",
                  maxHeight: 600,
                  maxWidth: 400,
                }}
              />
            )}
          </Box>
        </Paper>
      </Box>

      {/* Modal Cotizar */}
      <Modal
        open={openCotizar}
        onClose={() => setOpenCotizar(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{ timeout: 400 }}
      >
        <Fade in={openCotizar}>
          <Paper sx={styleModal}>
            <CotizaForm />
          </Paper>
        </Fade>
      </Modal>
    </>
  );
};

export default CategoriasSection;
