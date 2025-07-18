import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

// Componente que muestra un botón para volver al inicio de la página

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
      behavior: "smooth",
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
        position: "fixed",
        bottom: 80,
        right: 20,
        borderRadius: "50%",
        width: 56,
        height: 56,
        minWidth: 0,
        boxShadow: 3,
        zIndex: 1000,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        opacity: showButton ? 1 : 0,
        transition: "opacity 0.3s ease-in-out",
        backgroundColor: "#D95830",
        "&:hover": {
          backgroundColor: theme.palette.primary.dark,
          backdropFilter: "blur(5px)",
          WebkitBackdropFilter: "blur(5px)",
          color: "#fff",
        },
      })}
    >
      <KeyboardArrowUpIcon sx={{ fontSize: 32 }} />
    </Button>
  );
};

export default BtnInicio;
