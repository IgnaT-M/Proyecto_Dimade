import React, { useState } from "react";
import {
  Box,
  TextField,
  Typography,
  Button,
  Paper,
  InputAdornment,
  IconButton,
  Snackbar,
  Alert,
} from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import BASE_URL from "../config/apiConfig";

const ResetearContrasena = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get("token");
  const navigate = useNavigate();

  const [passwords, setPasswords] = useState({
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [errors, setErrors] = useState({
    password: "",
    confirmPassword: "",
  });

  const [notificacion, setNotificacion] = useState({
    open: false,
    mensaje: "",
    severidad: "info",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPasswords((prev) => ({ ...prev, [name]: value }));
    if (value) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let newErrors = {};
    if (!passwords.password) {
      newErrors.password = "La contraseña es requerida.";
    } else if (passwords.password.length < 6) {
      newErrors.password = "La contraseña debe tener al menos 6 caracteres.";
    }
    if (!passwords.confirmPassword) {
      newErrors.confirmPassword = "Debes confirmar la contraseña.";
    } else if (passwords.password !== passwords.confirmPassword) {
      newErrors.confirmPassword = "Las contraseñas no coinciden.";
      // --- NUEVO: Toast para error de contraseñas no coincidentes ---
      setNotificacion({
        open: true,
        mensaje: "Error: Las contraseñas no coinciden.",
        severidad: "error",
      });
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/api/auth/reset-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: token,
          nuevaPassword: passwords.password,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message ||
            "El enlace de recuperación es inválido o ha expirado."
        );
      }

      // Toast de éxito (ya estaba implementado)
      setNotificacion({
        open: true,
        mensaje: "¡Contraseña actualizada con éxito! Redirigiendo...",
        severidad: "success",
      });

      // --- MODIFICADO: Redirección después de 1 segundo ---
      setTimeout(() => {
        navigate("/Login");
      }, 1000);
    } catch (error) {
      setNotificacion({
        open: true,
        mensaje: error.message,
        severidad: "error",
      });
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
          Restablecer Contraseña
        </Typography>

        <Box component="form" onSubmit={handleSubmit} noValidate>
          <TextField
            fullWidth
            name="password"
            label="Nueva contraseña"
            type={showPassword ? "text" : "password"}
            value={passwords.password}
            onChange={handleChange}
            margin="normal"
            error={!!errors.password}
            helperText={errors.password}
            color={errors.password ? "warning" : "primary"}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <TextField
            fullWidth
            name="confirmPassword"
            label="Repite la nueva contraseña"
            type={showConfirmPassword ? "text" : "password"}
            value={passwords.confirmPassword}
            onChange={handleChange}
            margin="normal"
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword}
            color={errors.confirmPassword ? "warning" : "primary"}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    edge="end"
                  >
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: 2, py: 1.5, fontWeight: "bold" }}
          >
            Actualizar Contraseña
          </Button>
        </Box>
      </Paper>

      <Snackbar
        open={notificacion.open}
        autoHideDuration={6000}
        onClose={() => setNotificacion({ ...notificacion, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setNotificacion({ ...notificacion, open: false })}
          severity={notificacion.severidad}
          sx={{ width: "100%" }}
        >
          {notificacion.mensaje}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ResetearContrasena;
