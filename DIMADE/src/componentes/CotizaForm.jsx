import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Grid,
  Paper,
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
  const [formData, setFormData] = useState({
    rut: "",
    nombre: "",
    email: "",
    telefono: "",
    tipoProducto: "",
    mensaje: "",
  });

  const [open, setOpen] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

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
          headers: {
            "Content-Type": "application/json",
          },
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
    <Paper
      elevation={0}
      sx={{
        maxWidth: 900,
        mx: "auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "left",
      }}
    >
      <Typography
        variant="h4"
        textAlign="left"
        gutterBottom
        sx={{ mt: 0, mb: 2 }}
      >
        Solicita tu cotización
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ width: "100%" }}>
        <Grid container spacing={2}>
          <Grid item xs={12} lg={6}>
            <TextField
              fullWidth
              required
              name="rut"
              label="RUT"
              value={formData.rut}
              onChange={handleChange}
              InputProps={{
                startAdornment: <BadgeIcon sx={{ mr: 1 }} />,
              }}
            />
          </Grid>
          <Grid item xs={12} lg={6}>
            <TextField
              fullWidth
              required
              name="nombre"
              label="Nombre"
              value={formData.nombre}
              onChange={handleChange}
              InputProps={{
                startAdornment: <PersonIcon sx={{ mr: 1 }} />,
              }}
            />
          </Grid>
          <Grid item xs={12} lg={6}>
            <TextField
              fullWidth
              required
              name="email"
              label="Correo electrónico"
              type="email"
              value={formData.email}
              onChange={handleChange}
              InputProps={{
                startAdornment: <EmailIcon sx={{ mr: 1 }} />,
              }}
            />
          </Grid>
          <Grid item xs={12} lg={6}>
            <TextField
              fullWidth
              required
              name="telefono"
              label="Teléfono"
              type="tel"
              value={formData.telefono}
              onChange={handleChange}
              InputProps={{
                startAdornment: <PhoneIcon sx={{ mr: 1 }} />,
              }}
            />
          </Grid>
          <Grid item xs={12} lg={6}>
            <TextField
              select
              fullWidth
              required
              name="tipoProducto"
              value={formData.tipoProducto}
              onChange={handleChange}
              InputProps={{
                startAdornment: <ListAltIcon sx={{ mr: 1 }} />,
              }}
              SelectProps={{
                displayEmpty: true,
                renderValue: (value) =>
                  value ? (
                    value
                  ) : (
                    <span style={{ opacity: 0.5 }}>Selecciona tu producto</span>
                  ),
              }}
            >
              {productos.map((prod) => (
                <MenuItem key={prod} value={prod}>
                  {prod}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              rows={4}
              name="mensaje"
              label="Detalles adicionales"
              value={formData.mensaje}
              onChange={handleChange}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{
                bgcolor: "#10567E",
                color: "#fff",
                "&:hover": {
                  bgcolor: "#D95830",
                },
                mt: 3,
                fontWeight: "bold",
                borderRadius: 1,
              }}
            >
              Enviar solicitud
            </Button>
            <ModalCubitaje />
          </Grid>
        </Grid>
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
    </Paper>
  );
};

export default CotizaForm;
