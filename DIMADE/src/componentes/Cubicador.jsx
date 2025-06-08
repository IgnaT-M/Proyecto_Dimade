import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  MenuItem,
  Paper,
  Snackbar,
  Alert,
  Grid,
} from "@mui/material";

const materiales = [
  { tipo: "Hormigón", factor: 2400 },
  { tipo: "Arena", factor: 1600 },
  { tipo: "Grava", factor: 1500 },
  { tipo: "Ladrillos", factor: 500 },
  { tipo: "Yeso", factor: 875 },
];

const Cubicador = () => {
  const [datos, setDatos] = useState({
    largo: "",
    ancho: "",
    alto: "",
    material: "",
  });
  const [errors, setErrors] = useState({});
  const [resultado, setResultado] = useState(null);
  const [open, setOpen] = useState(false);

  const handleChange = (e) => {
    setDatos((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors((prev) => ({ ...prev, [e.target.name]: false }));
  };

  const calcular = (e) => {
    e.preventDefault();
    const { largo, ancho, alto, material } = datos;
    const newErrors = {
      largo: !largo,
      ancho: !ancho,
      alto: !alto,
      material: !material,
    };

    if (Object.values(newErrors).some(Boolean)) {
      setErrors(newErrors);
      return;
    }

    const vol = parseFloat(largo) * parseFloat(ancho) * parseFloat(alto);
    const mat = materiales.find((m) => m.tipo === material);
    const total = vol * mat.factor;

    setResultado({
      volumen: vol.toFixed(2),
      total: total.toFixed(2),
      unidad: material === "Ladrillos" ? "unidades" : "kg",
    });
    setOpen(true);
  };

  return (
    <Paper
      elevation={0}
      sx={{
        p: 4,
        width: { xs: "80vw", md: "60vw" },
        height: { xs: "120vh", md: "80vh" , lg:"50vh" },

        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Cubicador de Materiales
      </Typography>
      <Box
        component="form"
        onSubmit={calcular}
        sx={{ width: "100%", mt: 2, display: "flex", flexDirection: "column" }}
      >
        <Grid container spacing={2} sx={{ maxWidth: 600, margin: "0 auto" }}>
          {["largo", "ancho", "alto"].map((field) => (
            <Grid item xs={12} sm={4} key={field}>
              <TextField
                color="primary"
                fullWidth
                required
                type="number"
                label={field.charAt(0).toUpperCase() + field.slice(1) + " (m)"}
                name={field}
                value={datos[field]}
                onChange={handleChange}
                error={errors[field]}
                helperText={errors[field] ? "Este campo es obligatorio" : ""}
              />
            </Grid>
          ))}
          <Grid item xs={12} sm={6}>
            <TextField
              color="primary"
              select
              required
              name="material"
              value={datos.material}
              onChange={handleChange}
              error={errors.material}
              helperText={errors.material ? "Selecciona un material" : ""}
              SelectProps={{
                displayEmpty: true,
                renderValue: (value) =>
                  value || (
                    <span style={{ opacity: 0.5 }}>Selecciona tu material</span>
                  ),
              }}
            >
              <MenuItem value="" disabled>
                Selecciona tu material
              </MenuItem>
              {materiales.map((m) => (
                <MenuItem key={m.tipo} value={m.tipo}>
                  {m.tipo}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        </Grid>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          width="50%"
          sx={{
            bgcolor: "#10567E",
            color: "#fff",
            "&:hover": {
              bgcolor: "#D95830",
            },
            mt: 3,
            fontWeight: "bold",
            borderRadius: 1,
            boxShadow: 3,
            width: "100%",
          }}
        >
          Calcular
        </Button>
      </Box>

      {resultado && (
        <Box mt={4}>
          <Typography variant="h6" fontWeight="bold">
            Resultado:
          </Typography>
          <Typography>
            Volumen: <strong>{resultado.volumen} m³</strong>
          </Typography>
          <Typography>
            Cantidad necesaria de <strong>{datos.material}</strong>:{" "}
            <strong>
              {resultado.total} {resultado.unidad}
            </strong>
          </Typography>
        </Box>
      )}

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
          ¡Cálculo realizado correctamente!
        </Alert>
      </Snackbar>
    </Paper>
  );
};

export default Cubicador;