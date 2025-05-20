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
  { tipo: "Hormigón", factor: 2400 }, // kg/m3
  { tipo: "Arena", factor: 1600 },
  { tipo: "Grava", factor: 1500 },
  { tipo: "Ladrillos", factor: 500 }, // unidades por m3 (aproximado)
  { tipo: "Yeso", factor: 875 },
];

const Cubicador = () => {
  const [datos, setDatos] = useState({
    largo: "",
    ancho: "",
    alto: "",
    material: "",
  });

  const [resultado, setResultado] = useState(null);
  const [open, setOpen] = useState(false);

  const handleChange = (e) => {
    setDatos((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const calcular = (e) => {
    e.preventDefault();
    const { largo, ancho, alto, material } = datos;
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
    <Paper elevation={0} sx={{ p: 4, maxWidth: 700, mx: "auto", mt: 4 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Cubicador de Materiales
      </Typography>
      <Box component="form" onSubmit={calcular}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              required
              label="Largo (m)"
              name="largo"
              type="number"
              value={datos.largo}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              required
              label="Ancho (m)"
              name="ancho"
              type="number"
              value={datos.ancho}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              required
              label="Alto (m)"
              name="alto"
              type="number"
              value={datos.alto}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              select
              fullWidth
              required
              label="Material"
              name="material"
              value={datos.material}
              onChange={handleChange}
            >
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
          fullWidth
          sx={{ mt: 3, fontWeight: "bold", borderRadius: 0 }}
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

export default Cubicador;
