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
  Link,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const LoginForm = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  // --- 1. NUEVO ESTADO PARA ERRORES ---
  const [errors, setErrors] = useState({ email: false, password: false });
  const navigate = useNavigate();

  // --- 2. MANEJO DE CAMBIOS ACTUALIZADO ---
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    // Limpia el error del campo en cuanto el usuario empieza a escribir
    if (value) {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: false }));
    }
  };

  // --- 3. MANEJO DE SUBMIT ACTUALIZADO ---
  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {
      email: !form.email,
      password: !form.password,
    };

    setErrors(newErrors);

    if (newErrors.email || newErrors.password) {
      setErrorMessage("Por favor completa todos los campos");
      setOpenSnackbar(true);
      return;
    }

    // El resto de la lógica de submit permanece igual
    try {
      const response = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: form.email, password: form.password }),
      });

      if (!response.ok) {
        if (response.status === 401) {
          setErrorMessage("Credenciales incorrectas");
        } else {
          setErrorMessage("Error al conectar con el servidor");
        }
        setOpenSnackbar(true);
        return;
      }

      const data = await response.json();
      const token = data.token;
      localStorage.setItem("jwtToken", token);
      navigate("/backoffice");
    } catch (err) {
      console.error("Error en login:", err);
      setErrorMessage("No se pudo conectar al servidor");
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
          Panel Administrativo
        </Typography>

        <Box component="form" onSubmit={handleSubmit} noValidate>
          {/* --- 4. TEXTFIELD DE EMAIL MODIFICADO --- */}
          <TextField
            fullWidth
            name="email"
            label="Correo electrónico"
            type="email"
            value={form.email}
            onChange={handleChange}
            margin="normal"
            // Props para la validación visual
            error={errors.email}
            helperText={errors.email ? "Este campo es requerido" : ""}
            color={errors.email ? "warning" : "primary"}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon />
                </InputAdornment>
              ),
            }}
          />

          {/* --- 5. TEXTFIELD DE CONTRASEÑA MODIFICADO --- */}
          <TextField
            fullWidth
            name="password"
            label="Contraseña"
            type={showPassword ? "text" : "password"}
            value={form.password}
            onChange={handleChange}
            margin="normal"
            // Props para la validación visual
            error={errors.password}
            helperText={errors.password ? "Este campo es requerido" : ""}
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
                    aria-label="toggle password visibility"
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                    sx={{ color: "action.active" }}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Box textAlign="right" sx={{ my: 1 }}>
            <Link
              component="button"
              variant="body2"
              onClick={() => navigate("/RecuperarContrasena")}
              sx={{ cursor: "pointer" }}
            >
              ¿Olvidaste tu contraseña?
            </Link>
          </Box>

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              fontWeight: "bold",
              borderRadius: 2,
              py: 1.5,
              background:
                "linear-gradient(to right, #10567E,rgb(43, 108, 143),rgb(53, 127, 171))",
              color: "white",
              "&:hover": {
                background:
                  "linear-gradient(to right, #D95830, #E97B54, #F5A17A)",
              },
            }}
          >
            Entrar
          </Button>

          {/* El resto del componente permanece igual... */}
          <Box textAlign="center">
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              mt={2}
            >
              <img
                src="/imagenes/logo_dimade.png"
                alt="Logo Dimade"
                style={{ maxWidth: 120, marginBottom: 5 }}
              />
              <Typography variant="body2" color="textSecondary">
                Solo personal autorizado
              </Typography>
            </Box>
          </Box>

          <Snackbar
            open={openSnackbar}
            autoHideDuration={3000}
            onClose={() => setOpenSnackbar(false)}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          >
            <Alert
              onClose={() => setOpenSnackbar(false)}
              severity="error"
              sx={{ width: "100%" }}
            >
              {errorMessage}
            </Alert>
          </Snackbar>
        </Box>
      </Paper>
    </Box>
  );
};

export default LoginForm;
