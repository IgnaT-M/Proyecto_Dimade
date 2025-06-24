import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

const BtnInicio = () => {
  const [showButton, setShowButton] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 50) {
      setShowButton(true);
    } else {
      setShowButton(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Scroll suave
    });
  };
  if (!showButton) {
    return null;
  }

  return (
    <Button
      variant="contained"
      color={"secondary"}
      onClick={handleClick}
      sx={(theme) => ({
        position: "fixed", // Esto lo hace flotar
        bottom: 80,
        right: 20,
        borderRadius: "50%",
        width: 56,
        height: 56,
        minWidth: 0,
        boxShadow: 3,
        zIndex: 1000, // Asegura que esté por encima de otros elementos
        display: "flex", // Para centrar el ícono
        justifyContent: "center",
        alignItems: "center",
        opacity: showButton ? 1 : 0, // Controla la opacidad para animación de aparición
        transition: "opacity 0.3s ease-in-out", // Transición de opacidad
        backgroundColor: "#D95830", // Color de fondo
        "&:hover": {
          backgroundColor: theme.palette.primary.dark, // Efecto hover usando el dark de primary
          backdropFilter: "blur(5px)", // Efecto de desenfoque
          WebkitBackdropFilter: "blur(5px)", // Compatibilidad con Safari
          color: "#fff", // Cambia el color del ícono al blanco al hacer hover
        },
      })}
    >
      {/* Icono de flecha hacia arriba (más común para este tipo de botón) */}
      <KeyboardArrowUpIcon sx={{ fontSize: 32 }} />
    </Button>
  );
};

export default BtnInicio;
