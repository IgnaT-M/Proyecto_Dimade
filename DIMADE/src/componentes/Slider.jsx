import React from "react";
import { Box, Typography, Container } from "@mui/material";

// --- Datos de los logos ---
// Agrega o quita los logos de tus clientes aquí
// Para usar imágenes locales, primero impórtalas: import logoCodelco from './logos/codelco.png';
// y luego úsalas en el array: { src: logoCodelco, alt: 'Codelco' }

const logos = [
  {
    src: "https://cdn.worldvectorlogo.com/logos/codelco-1.svg",
    alt: "Codelco",
  },
  { src: "https://cdn.worldvectorlogo.com/logos/copec-3.svg", alt: "Copec" },
  {
    src: "https://www.emin.cl/wp-content/uploads/2021/08/logo-emin.svg",
    alt: "Emin",
  },
  {
    src: "https://seeklogo.com/images/E/enaex-logo-246B52834E-seeklogo.com.png",
    alt: "Enaex",
  },
  {
    src: "https://www.esachs.cl/wp-content/uploads/2023/06/esachs-color.svg",
    alt: "Esachs",
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/4/4b/Logo_ACHS.svg",
    alt: "ACHS",
  },
  {
    src: "https://www.esmax.cl/wp-content/uploads/2023/04/logo-esmax.svg",
    alt: "Esmax",
  },
];

const scrollAnimation = {
  "@keyframes scroll": {
    "0%": { transform: "translateX(0)" },
    "100%": { transform: `translateX(calc(-200px * ${logos.length}))` },
  },
};

const CarruselClientes = () => {
  return (
    <Container sx={{ py: 6, textAlign: "center" }}>
      <Typography variant="h4" component="h2" gutterBottom>
        Algunos de nuestros clientes
      </Typography>

      {/* Contenedor principal que oculta el desbordamiento */}
      <Box
        sx={{
          ...scrollAnimation,
          overflow: "hidden",
          position: "relative",
          width: "100%",
          "&:hover .animate-scroll": {
            animationPlayState: "paused",
          },

          "&::before, &::after": {
            content: '""',
            position: "absolute",
            top: 0,
            bottom: 0,
            width: "100px",
            zIndex: 2,
          },
          "&::before": {
            left: 0,
            background: "linear-gradient(to right,  transparent)",
          },
          "&::after": {
            right: 0,
            background: "linear-gradient(to left,  transparent)",
          },
        }}
      >
        {/* Contenedor que se anima. Duplicamos los logos para el efecto infinito. */}
        <Box
          className="animate-scroll"
          sx={{
            display: "flex",
            width: `calc(200px * ${logos.length * 2})`, // Ancho total del doble de logos
            animation: "scroll 30s linear infinite", // Aplica la animación
          }}
        >
          {/* Renderiza la lista de logos dos veces */}
          {[...logos, ...logos].map((logo, index) => (
            <Box
              key={index}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "200px", // Ancho fijo para cada logo
                height: "100px", // Altura fija
                mx: 2, // Margen horizontal entre logos
              }}
            >
              <img
                src={logo.src}
                alt={logo.alt}
                style={{
                  maxWidth: "150px",
                  maxHeight: "60px",
                  objectFit: "contain",
                  filter: "grayscale(100%)", // Opcional: logos en blanco y negro
                  opacity: 0.8,
                  transition: "filter 0.3s ease, opacity 0.3s ease",
                  "&:hover": {
                    filter: "grayscale(0%)",
                    opacity: 1,
                  },
                }}
              />
            </Box>
          ))}
        </Box>
      </Box>
    </Container>
  );
};

export default CarruselClientes;
