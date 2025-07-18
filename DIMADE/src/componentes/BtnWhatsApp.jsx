import React from "react";
import { Fab } from "@mui/material";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";

// Componente que muestra un botón flotante para enviar mensajes por WhatsApp
function WhatsAppButton() {
  const phoneNumber = "56920400454";

  const message = "Hola, quisiera hacer una consulta.";

  const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
    message
  )}`;

  return (
    <Fab
      color="success"
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp"
      sx={{
        position: "fixed",
        bottom: 130,
        right: 20,
        zIndex: 1000,
        backgroundColor: "#25D366",
        "&:hover": {
          backgroundColor: "#1DA851",
        },
        color: "#fff",
        marginBottom: 2,
      }}
    >
      <WhatsAppIcon sx={{ fontSize: 30 }} />
    </Fab>
  );
}

export default WhatsAppButton;
