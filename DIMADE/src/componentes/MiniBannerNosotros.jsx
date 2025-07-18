import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

//aca van el contenido y las imagenes del mini banner de la seccion nosotros
const sections = [
  {
    key: "nosotros",
    title: "Conócenos",
    background: "/nosotros.jpg",
    description:
      "En DIMADE, conectamos proveedores y clientes del rubro de la construcción con eficiencia, confianza y tecnología.",
  },
  {
    key: "mision",
    title: "Nuestra Misión",
    background: "/nosotros1.jpg",
    description:
      "Brindar una plataforma eficiente que facilite la conexión directa entre proveedores y clientes del área de la construcción.",
  },
  {
    key: "vision",
    title: "Nuestra Visión",
    background: "/nosotros2.jpg",
    description:
      "Ser líderes en soluciones digitales para el abastecimiento y gestión de proyectos constructivos en Latinoamérica.",
  },
];

// Componente que muestra un mini banner con secciones de "Nosotros", "Misión" y "Visión"
const MiniBannerNosotros = () => {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(null);

  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        height: 200,
        overflow: "hidden",
      }}
    >
      {sections.map((section) => {
        const isHovered = hovered === section.key;
        const flexGrow = hovered ? (isHovered ? 2 : 1) : 1;

        return (
          <Box
            key={section.key}
            onMouseEnter={() => setHovered(section.key)}
            onMouseLeave={() => setHovered(null)}
            onClick={() => navigate(section.route)}
            sx={{
              flexGrow,
              flexBasis: 0,
              position: "relative",
              overflow: "hidden",
              backgroundImage: `url(${section.background})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              transition: "all 0.6s ease-in-out",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
          >
            <Box
              sx={{
                position: "absolute",
                inset: 0,
                backgroundColor: "rgba(0, 0, 0, 0.5)",
              }}
            />

            <Typography
              variant="h5"
              fontWeight="bold"
              sx={{
                position: "relative",
                zIndex: 1,
                color: "#fff",
                textAlign: "center",
                opacity: isHovered ? 0 : 1,
                transition: "opacity 0.3s ease-in-out",
              }}
            >
              {section.title}
            </Typography>

            <Box
              sx={{
                position: "absolute",
                inset: 0,
                zIndex: 2,
                color: "#fff",
                textAlign: "center",
                px: 3,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                opacity: isHovered ? 1 : 0,
                transform: isHovered ? "translateY(0)" : "translateY(20px)",
                transition: "all 0.4s ease-in-out",
              }}
            >
              <Typography variant="body1" mb={2}>
                {section.description}
              </Typography>
            </Box>
          </Box>
        );
      })}
    </Box>
  );
};

export default MiniBannerNosotros;
