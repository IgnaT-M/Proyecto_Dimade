import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Snackbar,
  Alert,
  MenuItem,
} from "@mui/material";
import BASE_URL from "../config/apiConfig";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    correo: "",

    telefono: "",
    rut: "",
    asunto: "",
    mensaje: "",
  });

  const [open, setOpen] = useState(false);
  const [error, setError] = useState(false);

  const [touched, setTouched] = useState({});
  const [submitAttempted, setSubmitAttempted] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleBlur = (e) => {
    setTouched((prev) => ({ ...prev, [e.target.name]: true }));
  };

  const isEmpty = (field) =>
    (touched[field] || submitAttempted) && !formData[field];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitAttempted(true);

    const camposVacios = Object.keys(formData).filter(
      (campo) => !formData[campo]
    );
    if (camposVacios.length > 0) return;

    const payload = {
      nombre: formData.nombre,
      correo: formData.correo,
      telefono: formData.telefono,
      rut: formData.rut,
      asunto: formData.asunto,
      mensaje: formData.mensaje,
    };

    try {
      const response = await fetch(`${BASE_URL}/api/solicitudes-contacto`, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error("Error en el envío");

      setOpen(true);
      setFormData({
        nombre: "",
        correo: "",
        telefono: "",
        rut: "",
        asunto: "",
        mensaje: "",
      });
      setTouched({});
      setSubmitAttempted(false);
    } catch (err) {
      console.error(err);
      setError(true);
    }
  };

  const asuntos = [
    "Cotización",
    "Consulta General",
    "Problemas con Pedido",
    "Sugerencia",
    "Otro",
  ];

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", py: 2 }}>
      <Typography variant="h4" gutterBottom>
        Déjanos tu mensaje
      </Typography>
      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          fullWidth
          margin="normal"
          label="Nombre completo"
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
          onBlur={handleBlur}
          error={isEmpty("nombre")}
          helperText={isEmpty("nombre") ? "El Nombre es obligatorio" : ""}
        />
        <TextField
          fullWidth
          margin="normal"
          label="RUT"
          name="rut"
          value={formData.rut}
          onChange={handleChange}
          onBlur={handleBlur}
          error={isEmpty("rut")}
          helperText={isEmpty("rut") ? "El RUT es obligatorio" : ""}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Correo electrónico"
          name="correo"
          type="email"
          value={formData.correo}
          onChange={handleChange}
          onBlur={handleBlur}
          error={isEmpty("correo")}
          helperText={
            isEmpty("correo") ? "Debes ingresar un correo válido" : ""
          }
        />
        <TextField
          fullWidth
          margin="normal"
          label="Teléfono"
          name="telefono"
          value={formData.telefono}
          onChange={handleChange}
          onBlur={handleBlur}
          error={isEmpty("telefono")}
          helperText={isEmpty("telefono") ? "Debes ingresar un teléfono" : ""}
        />
        <TextField
          fullWidth
          select
          margin="normal"
          label="Asunto"
          name="asunto"
          value={formData.asunto}
          onChange={handleChange}
          onBlur={handleBlur}
          error={isEmpty("asunto")}
          helperText={isEmpty("asunto") ? "Selecciona una de las opciones" : ""}
        >
          {asuntos.map((option, index) => (
            <MenuItem key={index} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          fullWidth
          multiline
          rows={4}
          margin="normal"
          label="Descripción del requerimiento"
          name="mensaje"
          value={formData.mensaje}
          onChange={handleChange}
          onBlur={handleBlur}
          error={isEmpty("mensaje")}
          helperText={
            isEmpty("mensaje")
              ? "Déjanos tus consultas, sugerencias o reclamos"
              : ""
          }
          placeholder="Ej: Necesito 50 bolsas de cemento y 10 mallas ACMA 15-15-6..."
        />
        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{
            mt: 2,
            fontWeight: "bold",
            borderRadius: 1,
            bgcolor: "#10567E",
            color: "#fff",
            "&:hover": { bgcolor: "#D95830" },
          }}
        >
          Enviar
        </Button>
      </Box>

      <Snackbar
        open={open}
        autoHideDuration={4000}
        onClose={() => setOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setOpen(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          ¡Mensaje enviado con éxito!
        </Alert>
      </Snackbar>

      <Snackbar
        open={error}
        autoHideDuration={4000}
        onClose={() => setError(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setError(false)}
          severity="error"
          sx={{ width: "100%" }}
        >
          Error al enviar el mensaje.
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ContactForm;
