// src/components/WhatsAppButton.jsx
import React from "react";
import { Fab } from "@mui/material"; // ¡Importamos Fab en lugar de Button!
import WhatsAppIcon from "@mui/icons-material/WhatsApp";

function WhatsAppButton() {
  // Número de teléfono de ejemplo (reemplaza con tu número de Chile, ej: 56912345678)
  const phoneNumber = "56920400454";
  // Mensaje predefinido (opcional)
  const message = "Hola, quisiera hacer una consulta.";

  const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
    message
  )}`;

  return (
    <Fab
      color="success"
      href={whatsappLink}
      target="_blank" // Abre el enlace en una nueva pestaña
      rel="noopener noreferrer" // Mejora la seguridad al abrir en nueva pestaña
      aria-label="WhatsApp" // Importante para accesibilidad, describe el botón
      sx={{
        position: "fixed", // Esto lo hace flotar
        bottom: 130, // Ajusta este valor para que quede sobre el botón de subir (ej. 80px)
        right: 20, // Ajusta este valor para que quede a la derecha
        zIndex: 1000,
        backgroundColor: "#25D366",
        "&:hover": {
          backgroundColor: "#1DA851",
        },
        color: "#fff",
        marginBottom: 2, // Espacio alrededor del botón
      }}
    >
      <WhatsAppIcon sx={{ fontSize: 30 }} />
    </Fab>
  );
}

export default WhatsAppButton;
