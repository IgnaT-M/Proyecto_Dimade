import React from "react";
import { Box, Typography, useTheme } from "@mui/material";

//aca se cambia el contenido de la seccion de marcas
const logos = [
  { src: "/imagenes/marcas/cerecita.png", alt: "Cerecita" },
  { src: "/imagenes/marcas/kolor.png", alt: "Kolor" },
  { src: "/imagenes/marcas/sherwin.webp", alt: "Sherwin" },
  { src: "/imagenes/marcas/sipa.png", alt: "Sipa" },
  { src: "/imagenes/marcas/bauker.png", alt: "Bauker" },
  { src: "/imagenes/marcas/halux.png", alt: "Halux" },
  { src: "/imagenes/marcas/makita.webp", alt: "Makita" },
  { src: "/imagenes/marcas/polpaico.png", alt: "Polpaico" },
];

const scrollAnimation = {
  "@keyframes scroll": {
    "0%": { transform: "translateX(0)" },
    "100%": { transform: `translateX(calc(-200px * ${logos.length}))` },
  },
};

//este es el slider con todas las marcas
const SliderMarcas = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        py: 6,
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary,
      }}
    >
      <Box
        sx={{
          px: 2,
          width: "100%",
          maxWidth: "1400px",
          margin: "0 auto",
          textAlign: "center",
        }}
      >
        <Typography
          variant="h4"
          component="h2"
          gutterBottom
          color={theme.palette.text.primary}
        >
          Distribuimos productos de marcas reconocidas
        </Typography>

        <Box
          sx={{
            ...scrollAnimation,
            overflow: "hidden",
            position: "relative",
            width: "100%",
            "&:hover .animate-scroll": {
              animationPlayState: "paused",
            },
          }}
        >
          <Box
            className="animate-scroll"
            sx={{
              display: "flex",
              width: `calc(200px * ${logos.length * 2})`,
              animation: "scroll 30s linear infinite",
            }}
          >
            {[...logos, ...logos].map((logo, index) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "200px",
                  height: "120px",
                  mx: 2,
                  "& img": {
                    maxWidth: "150px",
                    maxHeight: "100px",
                    objectFit: "contain",
                    opacity: 0.8,
                    filter: "grayscale(30%)",
                    transition: "opacity 0.3s ease, filter 0.3s ease",
                  },
                  "& img:hover": {
                    filter: "grayscale(0%)",
                    opacity: 1,
                  },
                }}
              >
                <img src={logo.src} alt={logo.alt} />
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default SliderMarcas;
