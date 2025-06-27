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

import BadgeIcon from "@mui/icons-material/Badge";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import ListAltIcon from "@mui/icons-material/ListAlt";

import ModalCubitaje from "./ModalCubicador";

const CotizaForm = () => {
  // Estado para manejar los datos del formulario
  const [formData, setFormData] = useState({
    rut: "",
    nombre: "",
    email: "",
    telefono: "",
    tipoProducto: "",
    mensaje: "",
  });

  // Manejo de los cambios en los campos del formulario
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(null);
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
    setSubmitAttempted(true); //valida si el campo esta vacio

    const camposVacios = Object.keys(formData).filter(
      (campo) => !formData[campo]
    );
    if (camposVacios.length > 0) {
      return;
    }

    const payload = {
      rutSolicitante: formData.rut,
      nombreSolicitante: formData.nombre,
      correo: formData.email,
      telefono: formData.telefono,
      fechaSolicitud: new Date(),
      productosSolicitados: [formData.tipoProducto],
      estado: "Pendiente",
      detalle: formData.mensaje,
    };

    try {
      const response = await fetch(
        "http://localhost:8080/api/solicitudes-cotizacion",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) throw new Error("Error al enviar la solicitud");

      setOpen(true);
      setFormData({
        rut: "",
        nombre: "",
        email: "",
        telefono: "",
        tipoProducto: "",
        mensaje: "",
      });
    } catch (error) {
      console.error("Error al enviar solicitud:", error);
      setError(true);
    }
  };

  const productos = [
    "Artículos de oficina",
    "Material de embalaje",
    "Productos de limpieza",
    "Tecnología",
    "Otro",
  ];

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", py: 2 }}>
      <Typography variant="h4" gutterBottom>
        Solicita tu cotización
      </Typography>
      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          fullWidth
          //required
          margin="normal"
          name="nombre"
          label="Nombre"
          value={formData.nombre}
          onChange={handleChange}
          onBlur={handleBlur}
          error={isEmpty("nombre")}
          helperText={isEmpty("nombre") ? "El Nombre es Obligatorio." : ""}
        />
        <TextField
          fullWidth
          //required
          margin="normal"
          name="rut"
          label="RUT"
          value={formData.rut}
          onChange={handleChange}
          onBlur={handleBlur}
          error={isEmpty("rut")}
          helperText={isEmpty("rut") ? "El RUT es obligatorio" : ""}
        />
        <TextField
          fullWidth
          //required
          margin="normal"
          name="email"
          label="Correo electrónico"
          type="email"
          value={formData.email}
          onChange={handleChange}
          onBlur={handleBlur}
          error={isEmpty("email")}
          helperText={
            isEmpty("email") ? "Debes Ingresar un Email, por favor" : ""
          }
        />
        <TextField
          fullWidth
          //required
          margin="normal"
          name="telefono"
          label="Teléfono"
          type="tel"
          value={formData.telefono}
          onChange={handleChange}
          onBlur={handleBlur}
          error={isEmpty("telefono")}
          helperText={isEmpty("telefono") ? "Debes Ingresar un Telefono" : ""}
        />
        <TextField
          fullWidth
          //required
          select
          margin="normal"
          name="tipoProducto"
          label="Producto requerido"
          value={formData.tipoProducto}
          onChange={handleChange}
          onBlur={handleBlur}
          error={isEmpty("tipoProducto")}
          helperText={
            isEmpty("tipoProducto")
              ? "Por favor, Selecciona una de las Opciones"
              : ""
          }
        >
          {productos.map((prod) => (
            <MenuItem key={prod} value={prod}>
              {prod}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          fullWidth
          multiline
          rows={4}
          margin="normal"
          name="mensaje"
          label="Detalles adicionales"
          value={formData.mensaje}
          onChange={handleChange}
          onBlur={handleBlur}
          error={isEmpty("mensaje")}
          helperText={
            isEmpty("mensaje") ? "Describe tus Productos, Por favor" : ""
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
          Enviar solicitud
        </Button>
        <ModalCubitaje />
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
          ¡Solicitud de cotización enviada con éxito!
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

export default CotizaForm;
