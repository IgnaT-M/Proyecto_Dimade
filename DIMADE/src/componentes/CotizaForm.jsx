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
  Modal,
  Fade,
  Backdrop,
} from "@mui/material";
import BusinessIcon from "@mui/icons-material/Business";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import ListAltIcon from "@mui/icons-material/ListAlt";
import AddBoxIcon from "@mui/icons-material/AddBox";
import ModalCubitaje from "./ModalCubicador";

const CotizaForm = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    empresa: "",
    email: "",
    telefono: "",
    tipoProducto: "",
    cantidad: "",
    mensaje: "",
  });

  const [open, setOpen] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    

    console.log("Datos enviados:", formData);
    setOpen(true);
    setFormData({
      nombre: "",
      empresa: "",
      email: "",
      telefono: "",
      tipoProducto: "",
      cantidad: "",
      mensaje: "",
    });
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
              name="empresa"
              label="Empresa"
              value={formData.empresa}
              onChange={handleChange}
              InputProps={{
                startAdornment: <BusinessIcon sx={{ mr: 1 }} />,
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
              fullWidth
              required
              name="cantidad"
              label="Cantidad estimada"
              type="number"
              value={formData.cantidad}
              onChange={handleChange}
              InputProps={{
                startAdornment: <AddBoxIcon sx={{ mr: 1 }} />,
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
              {/* <MenuItem value="" disabled sx={{ display: "none" }}>
                Selecciona tu producto
              </MenuItem> */}
              {productos.map((prod) => (
                <MenuItem key={prod} value={prod}>
                  {prod}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} sx={{ width: "100%" }}>
            <TextField
              fullWidth
              multiline
              rows={4}
              name="mensaje"
              label="Detalles adicionales"
              value={formData.mensaje}
              onChange={handleChange}
              sx={{ width: "100%" }}
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

export default CotizaForm;