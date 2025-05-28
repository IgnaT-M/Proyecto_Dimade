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
  InputAdornment,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import PersonIcon from "@mui/icons-material/Person";
import MessageIcon from "@mui/icons-material/Message";
import HomeIcon from "@mui/icons-material/Home";
import PhoneIcon from "@mui/icons-material/Phone";
import BadgeIcon from "@mui/icons-material/Badge";
import SubjectIcon from "@mui/icons-material/Subject";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    direccion: "",
    telefono: "",
    rut: "",
    asunto: "",
    mensaje: "",
  });

  const [open, setOpen] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    setOpen(true);
    setFormData({
      nombre: "",
      email: "",
      direccion: "",
      telefono: "",
      rut: "",
      asunto: "",
      mensaje: "",
    });
  };

  const asuntos = [
    "Cotización",
    "Consulta General",
    "Problemas con Pedido",
    "Sugerencia",
    "Otro",
  ];

  return (
    <Paper
      sx={{
        p: 4,
        maxWidth: "600vw",
        mx: "auto",
        boxShadow: "none",
      }}
    >
      <Typography variant="h3" gutterBottom textAlign="start">
        CONTACTANOS
      </Typography>
      <Box component="form" onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6} lg={6}>
            <TextField
              fullWidth
              required
              label="Nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid Grid item xs={12} md={6} lg={6}>
            <TextField
              fullWidth
              required
              label="Correo electrónico"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid Grid item xs={12} md={6} lg={6}>
            <TextField
              fullWidth
              required
              label="Dirección"
              name="direccion"
              value={formData.direccion}
              onChange={handleChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <HomeIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid Grid item xs={12} md={6} lg={6}>
            <TextField
              fullWidth
              required
              label="Teléfono"
              name="telefono"
              value={formData.telefono}
              onChange={handleChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PhoneIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid Grid item xs={12} md={6} lg={6}>
            <TextField
              fullWidth
              required
              label="RUT"
              name="rut"
              value={formData.rut}
              onChange={handleChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <BadgeIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid Grid item xs={12} md={6} lg={6}>
            <TextField
              select
              fullWidth
              required
              label="Asunto"
              name="asunto"
              value={formData.asunto}
              onChange={handleChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SubjectIcon />
                  </InputAdornment>
                ),
              }}
              SelectProps={{
                displayEmpty: true,
                renderValue: (value) =>
                  value ? (
                    value
                  ) : (
                    <span style={{ opacity: 0.5 }}>
                      Selecciona una opcion ...
                    </span>
                  ),
              }}
            >
              {asuntos.map((option, index) => (
                <MenuItem key={index} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid Grid item xs={12} md={12} lg={12} sx={{ width: "100%" }}>
            <TextField
              fullWidth
              required
              multiline
              rows={4}
              label="Mensaje"
              name="mensaje"
              value={formData.mensaje}
              onChange={handleChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <MessageIcon sx={{ mt: 1 }} />
                  </InputAdornment>
                ),
              }}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 3, fontWeight: "bold", borderRadius: 1 }}
            >
              Enviar mensaje
            </Button>
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
          ¡Mensaje enviado con éxito!
        </Alert>
      </Snackbar>
    </Paper>
  );
};

export default ContactForm;
