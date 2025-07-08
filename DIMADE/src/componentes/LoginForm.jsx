import React, { useState } from "react";
import {
  Box,
  TextField,
  Typography,
  Button,
  Paper,
  InputAdornment,
  IconButton,
  Link,
  Snackbar,
  Alert,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import BASE_URL from "../config/apiConfig";

const LoginForm = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      setErrorMessage("Por favor completa todos los campos");
      setOpenSnackbar(true);
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: form.email,
          password: form.password,
        }),
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

      // Redirige directamente sin importar el rol
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

        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            name="email"
            label="Correo electrónico"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
            margin="normal"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon />
                </InputAdornment>
              ),
            }}
          />

          <TextField
            fullWidth
            name="password"
            label="Contraseña"
            type={showPassword ? "text" : "password"}
            value={form.password}
            onChange={handleChange}
            required
            margin="normal"
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

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              mt: 1,
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
            <Alert severity="error" sx={{ width: "100%" }}>
              {errorMessage}
            </Alert>
          </Snackbar>
        </Box>
      </Paper>
    </Box>
  );
};

export default LoginForm;
