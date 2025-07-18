import React, { useState } from "react";
import {
  Box,
  TextField,
  Typography,
  Button,
  Paper,
  Snackbar,
  Alert,
  Link,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import { useNavigate } from "react-router-dom";
import BASE_URL from "../config/apiConfig";

// Componente para recuperar la contraseña del usuario, esto le pega al endpoint de recuperación de contraseña
const RecuperarContrasena = () => {
  const [email, setEmail] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [notificacion, setNotificacion] = useState({
    mensaje: "",
    severidad: "info",
  });

  const [emailError, setEmailError] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setEmail(e.target.value);
    if (e.target.value) {
      setEmailError(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      setEmailError(true);
      setNotificacion({
        mensaje: "Por favor, ingresa tu correo electrónico.",
        severidad: "warning",
      });
      setOpenSnackbar(true);
      return;
    }

    try {
      await fetch(`${BASE_URL}/api/auth/forgot-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      setNotificacion({
        mensaje:
          "Si el correo está registrado, recibirás las instrucciones para restablecer tu contraseña.",
        severidad: "success",
      });
      setOpenSnackbar(true);
    } catch (err) {
      console.error("Error al solicitar recuperación:", err);
      setNotificacion({
        mensaje:
          "Se ha procesado tu solicitud. Si el correo está registrado, recibirás las instrucciones.",
        severidad: "info",
      });
      setOpenSnackbar(true);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background:
          "linear-gradient(to right, #10567E,rgb(43, 108, 143),rgb(53, 127, 171))",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
      }}
    >
      <Paper
        elevation={6}
        sx={{ maxWidth: 400, width: "100%", p: 4, borderRadius: 3 }}
      >
        <Typography
          variant="h5"
          fontWeight="bold"
          textAlign="center"
          gutterBottom
        >
          Recuperar Contraseña
        </Typography>
        <Typography
          variant="body2"
          color="textSecondary"
          textAlign="center"
          sx={{ mb: 2 }}
        >
          Ingresa tu correo electrónico y te enviaremos un enlace para
          restablecer tu contraseña.
        </Typography>

        <Box component="form" onSubmit={handleSubmit} noValidate>
          <TextField
            fullWidth
            name="email"
            label="Correo electrónico"
            type="email"
            value={email}
            onChange={handleChange}
            margin="normal"
            error={emailError}
            helperText={emailError ? "Este campo es requerido" : ""}
            color={emailError ? "warning" : "primary"}
            InputProps={{
              startAdornment: (
                <EmailIcon sx={{ mr: 1, color: "action.active" }} />
              ),
            }}
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: 2, py: 1.5, fontWeight: "bold" }}
          >
            Enviar Enlace de Recuperación
          </Button>

          <Box textAlign="center" sx={{ mt: 2 }}>
            <Link
              component="button"
              variant="body2"
              onClick={() => navigate("/Login")}
              sx={{ cursor: "pointer" }}
            >
              Volver a Iniciar Sesión
            </Link>
          </Box>
        </Box>
      </Paper>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity={notificacion.severidad}
          sx={{ width: "100%" }}
        >
          {notificacion.mensaje}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default RecuperarContrasena;
