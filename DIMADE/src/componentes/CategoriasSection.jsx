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

//aca se cambia el contenido de la seccion de categorias
const categorias = [
  {
    titulo: "Construcción",
    descripcion: "Todo lo necesario para construir con solidez y eficiencia.",
    imagen: "/construccion.webp",
    productosDestacados: [
      "Tubo corrugado",
      "Herramienta manual",
      "Cemento de contacto",
      "Panel modular",
      "Material aislante",
      "Conector universal",
      "Producto resistente",
      "Válvula de presión",
      "Accesorio industrial",
      "Iluminación LED",
    ],
  },
  {
    titulo: "Pinturas, Adhesivos y Aditivos",
    descripcion: "Colores, fijación y protección para cada superficie.",
    imagen: "/pinturas.webp",
    productosDestacados: [
      "Pintura látex interior",
      "Pintura esmalte sintético",
      "Pintura antihongos",
      "Primer o sellador",
      "Barniz poliuretano",
      "Removedor de pintura",
      "Spray acrílico",
      "Adhesivo de contacto",
      "Silicona sellante",
      "Cinta adhesiva de enmascarar",
      "Enduido interior",
      "Pasta muro lista",
      "Aditivo impermeabilizante",
      "Resina epóxica",
      "Malla para juntas",
    ],
  },
  {
    titulo: "Herramientas y Maquinaria",
    descripcion: "Maquinaria y herramientas listas para cualquier desafío.",
    imagen: "/herramientas.webp",
    productosDestacados: [
      "Taladro percutor",
      "Amoladora angular",
      "Sierra circular",
      "Lijadora orbital",
      "Atornillador eléctrico",
      "Generador eléctrico",
      "Compresor de aire",
      "Martillo demoledor",
      "Soldadora inverter",
      "Carretilla de obra",
    ],
  },
  {
    titulo: "Ferretería",
    descripcion: "Todo en fijaciones, herrajes y accesorios para tu proyecto.",
    imagen: "/ferreteria.webp",
    productosDestacados: [
      "Tornillos para madera",
      "Clavos acero",
      "Bisagras reforzadas",
      "Chapas y cerraduras",
      "Tarugos plásticos",
      "Candado de seguridad",
      "Escuadras metálicas",
      "Pernos y tuercas",
      "Manillas para puertas",
      "Soportes para repisas",
    ],
  },
  {
    titulo: "Maderas y Tableros",
    descripcion: "Variedad en maderas para estructuras y terminaciones.",
    imagen: "/madera.webp",
    productosDestacados: [
      "Tablero OSB 18 mm 122×244 cm",
      "Pino cepillado 2″×4″",
      "Contrachapado fenólico 15 mm",
      "Madera terciada 18 mm",
      "Bastidor de madera para puertas",
      "Listones de pino 1″×2″",
      "Melamina blanca 16 mm",
      "Madera machihembrada pino Oregón",
      "Panel finger joint 18 mm",
      "Caña para construcción estructural",
    ],
  },
  {
    titulo: "Pisos y Revestimientos",
    descripcion: "Revestimientos que transforman tus espacios.",
    imagen: "/pisos.webp",
    productosDestacados: [
      "Porcelanato 60x60 cm",
      "Laminado AC4 8 mm",
      "Vinílico autoadhesivo",
      "Porcelanato tipo madera 15×90 cm",
      "Cerámica esmaltada 30×30 cm",
      "Rodapié MDF 12×240 cm",
      "Adhesivo para cerámica 25 kg",
      "Rejilla para juntas cerámicas",
      "Membrana líquida impermeable",
      "Junta de dilatación",
    ],
  },
  {
    titulo: "Electricidad e Iluminación",
    descripcion: "Soluciones eléctricas seguras y modernas.",
    imagen: "/electricidad.webp",
    productosDestacados: [
      "Iluminación LED",
      "Conector universal",
      "Tubo corrugado",
      "Producto resistente",
      "Accesorio industrial",
      "Panel modular",
      "Filtro de aire",
      "Elemento decorativo",
      "Material aislante",
      "Cemento de contacto",
    ],
  },
  {
    titulo: "Puertas y Ventanas",
    descripcion: "Accesos y terminaciones que combinan seguridad y diseño.",
    imagen: "/puertasyventanas.webp",
    productosDestacados: [
      "Puerta MDF",
      "Ventana aluminio",
      "Herrajes corrediza",
      "Jaladeras barra",
      "Burlete silicona",
      "Cerradura multipunto",
      "Marco metálico",
      "Bisagra hidráulica",
      "Vidrio templado",
      "Mosquitera enrollable",
    ],
  },
  {
    titulo: "Electrohogar",
    descripcion: "Tecnología eficiente para facilitar tu vida en el hogar.",
    imagen: "/electrohogar.webp",
    productosDestacados: [
      "Extractor aire",
      "Campana cocina",
      "Microondas 25 L",
      "Refrigerador 250 L",
      "Lavadora 8 kg",
      "Estufa eléctrica",
      "Plancha vapor",
      "Aspiradora ciclónica",
      "Cafetera cápsulas",
      "Ventilador torre",
    ],
  },
  {
    titulo: "Aseo",
    descripcion:
      "Productos que garantizan limpieza, frescura y bienestar en cada rincón.",
    imagen: "/aseo.webp",
    productosDestacados: [
      "Limpiador multiuso",
      "Desinfectante",
      "Jabón industrial",
      "Toallas jumbo",
      "Guantes nitrilo",
      "Escoba sintética",
      "Fregona industrial",
      "Cubeta con escurridor",
      "Ambientador",
      "Bolsa basura 100 L",
    ],
  },
  {
    titulo: "Baño y Cocina",
    descripcion:
      "Funcionalidad y estilo para los espacios más usados de tu hogar.",
    imagen: "/bañoycocina.webp",
    productosDestacados: [
      "Grifería monomando",
      "Ducha cromada",
      "Pila acero",
      "Inodoro ergonómico",
      "Vanitory 60 cm",
      "Tapa WC",
      "Extractor baño",
      "Espejo anti‑vaho",
      "Porta‑rollo acero",
      "Junta goma lavabo",
    ],
  },
  {
    titulo: "Gasfitería",
    descripcion: "Soluciones seguras y duraderas para tu red de agua y gas.",
    imagen: "/gasfiteria.webp",
    productosDestacados: [
      "Tubo cobre",
      "Válvula paso",
      "Flexo inoxidable",
      "Filtro cerámico",
      "Llave paso metálica",
      "Boquilla soplador",
      "Conexión PPR",
      "Manguera aspersión",
      "Cople PVC",
      "Asiento WC universal",
    ],
  },
  {
    titulo: "Muebles y Organización",
    descripcion:
      "Diseño inteligente para ordenar, decorar y optimizar cada espacio.",
    imagen: "/muebles.webp",
    productosDestacados: [
      "Riel clóset",
      "Perchero pie",
      "Cajonera móvil",
      "Estantería metálica",
      "Organizador plástico",
      "Zapatero 3 niveles",
      "Perchero pared",
      "Canasto tela",
      "Revistero aluminio",
      "Cubiertero cocina",
    ],
  },
  {
    titulo: "Decoración y Menaje",
    descripcion:
      "Detalles que transforman tu casa en un hogar acogedor y con estilo.",
    imagen: "/decoracion.webp",
    productosDestacados: [
      "Cuadro decorativo",
      "Espejo rústico",
      "Alfombra 120×180",
      "Lámpara cerámica",
      "Centro mesa vidrio",
      "Portavelas hierro",
      "Vajilla 16 piezas",
      "Cortina blackout",
      "Toallas baño",
      "Floreros decorativos",
    ],
  },
  {
    titulo: "Climatización",
    descripcion:
      "Confort en cualquier estación con sistemas eficientes de temperatura.",
    imagen: "/climatizacion.webp",
    productosDestacados: [
      "Aire split 12 k",
      "Ventilador techo",
      "Calefactor cerámico",
      "Humidificador",
      "Deshumidificador",
      "Termostato Wi‑Fi",
      "Filtro HEPA",
      "Mica calefactor",
      "Purificador aire",
      "Mini split inverter",
    ],
  },
  {
    titulo: "Aire Libre",
    descripcion:
      "Disfruta del exterior con productos ideales para patios, terrazas y jardines.",
    imagen: "/airelibre.webp",
    productosDestacados: [
      "Parrilla carbón",
      "Set jardín",
      "Toldo retráctil",
      "Manguera riego",
      "Macetero barro",
      "Carpa camping",
      "Repuesto manguera",
      "Sombrilla playera",
      "Columpio madera",
      "Luz solar jardín",
    ],
  },
];

//seccion de categorias que muestra las categorias y productos destacados
const CategoriasSection = () => {
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(
    categorias[0]
  );

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [openCotizar, setOpenCotizar] = useState(false);

  const styleModal = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    p: 4,
    borderRadius: 3,
    boxShadow: 24,
    bgcolor: theme.palette.modalBg,
    color: theme.palette.text.primary,
    maxHeight: "90vh",
    overflowY: "auto",
  };

  const renderMenu = (categoriasMenu) => (
    <Box
      sx={{
        width: isMobile ? "100%" : "20%",
        backgroundColor: theme.palette.categoryMenuBg,
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
          color: theme.palette.categoryMenuText,
          px: 2,
          py: 2,
          fontWeight: "bold",
          borderBottom: `1px solid ${theme.palette.categoryMenuDivider}`,
        }}
      >
        Categorías
      </Typography>
      <List disablePadding>
        {categoriasMenu.map((cat, index) => {
          const selected = categoriaSeleccionada.titulo === cat.titulo;
          return (
            <React.Fragment key={index}>
              <ListItemButton
                onClick={() => setCategoriaSeleccionada(cat)}
                sx={{
                  py: 0,
                  backgroundColor: selected
                    ? theme.palette.categoryMenuSelectedBg
                    : "transparent",
                  color: theme.palette.categoryMenuText,
                  fontWeight: selected ? "bold" : "normal",
                  "&:hover": {
                    backgroundColor: theme.palette.categoryMenuHoverBg,
                  },
                }}
              >
                <ListItemText primary={cat.titulo} />
              </ListItemButton>
              <Divider
                sx={{ borderColor: theme.palette.categoryMenuDivider }}
              />
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
          py: { xs: 0, md: 4 },
          backgroundColor: theme.palette.background.default,
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
              backgroundColor: theme.palette.categoryContentBg,
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
                  fontWeight="bold"
                  mb={2}
                  color={theme.palette.text.secondary}
                >
                  {categoriaSeleccionada.descripcion}
                </Typography>

                {categoriaSeleccionada.productosDestacados && (
                  <>
                    <Box sx={{ mt: { xs: 3, md: 6 }, mb: { xs: 3, md: 6 } }}>
                      <Typography
                        variant="subtitle2"
                        color={theme.palette.text.secondary}
                        sx={{ fontWeight: "bold", fontSize: "0.95rem" }}
                      >
                        Estos son solo algunos de los productos que puedes
                        solicitar:
                      </Typography>
                    </Box>

                    <Box
                      sx={{
                        display: "flex",
                        gap: 4,
                        flexWrap: "wrap",
                        mb: 2,
                      }}
                    >
                      {[0, 1].map((colIndex) => (
                        <Box key={colIndex} sx={{ flex: 1 }}>
                          {categoriaSeleccionada.productosDestacados
                            .slice(colIndex * 5, colIndex * 5 + 5)
                            .map((producto, idx) => (
                              <Typography
                                key={idx}
                                variant="body2"
                                color={theme.palette.text.secondary}
                                sx={{ mb: 0.5 }}
                              >
                                • {producto}
                              </Typography>
                            ))}
                        </Box>
                      ))}
                    </Box>
                  </>
                )}
                <Box sx={{ mt: { xs: 3, md: 6 }, mb: { xs: 3, md: 6 } }}>
                  <Typography
                    variant="body1"
                    color={theme.palette.text.secondary}
                    sx={{ fontWeight: "bold" }}
                  >
                    ¿Estás buscando algo específico? ¡Envíanos tu requerimiento
                    y te ayudamos a encontrarlo!
                  </Typography>
                </Box>
              </Box>
              <Box textAlign="right" mt={4}>
                <Button
                  variant="contained"
                  size="large"
                  color="primary"
                  onClick={() => setOpenCotizar(true)}
                >
                  Cotizar ahora
                </Button>
              </Box>
            </Box>

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
