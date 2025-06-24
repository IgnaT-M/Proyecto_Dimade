// Footer.jsx

import React from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  IconButton,
  Stack,
  Button,
  useTheme,
} from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";

// ¡Único cambio aquí: Importar LoginIcon y asegurar que LogoutIcon no se use!
import LoginIcon from "@mui/icons-material/Login";
// Si LogoutIcon ya no se usa en este archivo, puedes eliminar la siguiente línea para limpiar:
// import LogoutIcon from "@mui/icons-material/Logout";

import { Link as RouterLink } from "react-router-dom";

// Asegúrate de que esta ruta sea la correcta para tu logo
import logoDimade from "/imagenes/logo_dimade_nav2.png";

const Footer = () => {
  const theme = useTheme();

  return (
    <Box
      component="footer"
      sx={{
        width: "100%",
        // Usar la variable de tema correcta para el fondo del footer. Asumo que está configurada correctamente en tu tema.
        background: `linear-gradient(180deg, ${theme.palette.navFooterBgGradientStart} 10%, ${theme.palette.navFooterBgGradientEnd} 120%)`,
        // Usar la variable de tema correcta para el color del texto del footer. Asumo que está configurada correctamente en tu tema.
        color: theme.palette.navFooterText,
        pt: 6,
        pb: 3,
        mt: "auto",
        textAlign: "start",
        position: "relative",
      }}
    >
      <Container maxWidth={false} disableGutters>
        <Grid container spacing={4} justifyContent="center">
          {/* Empresa */}
          <Grid item xs={12} md={4}>
            <Box
              component="img"
              src={logoDimade}
              alt="Logo de dimade"
              sx={{
                height: 100,
                borderRadius: 4,
                ":hover": {
                  cursor: "pointer",
                  // El borde en hover debe ser el color del texto del footer (blanco)
                  borderColor: theme.palette.navFooterText,
                  borderWidth: 2,
                  transition: "0.3s",
                  transform: "scale(1.04)",
                },
                display: { xs: "none", sm: "block" },
              }}
            />
          </Grid>

          {/* Descripción */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              DIMADE
            </Typography>
            <Stack direction="row" justifyContent="center" spacing={1}>
              <Typography variant="body2">Distribucion Integral</Typography>
            </Stack>
            <Stack direction="row" justifyContent="start" spacing={1} mt={1}>
              <Typography variant="body2"></Typography>
            </Stack>
          </Grid>

          {/* Contacto */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              Contacto
            </Typography>
            <Stack direction="row" spacing={1}>
              <PhoneIcon fontSize="small" />
              <Typography variant="body2">+56 9 9999 9999</Typography>
            </Stack>
            <Stack direction="row" spacing={1} mt={1}>
              <EmailIcon fontSize="small" />
              <Typography variant="body2">dimadecontacto@gmail.com</Typography>
            </Stack>
          </Grid>

          {/* Enlaces */}
          <Grid item xs={12} md={4}>
            <Box display="flex" flexDirection="column" alignItems="flex-start">
              <Typography variant="h6" gutterBottom textAlign="center">
                Enlaces
              </Typography>

              <Grid
                container
                spacing={6}
                justifyContent="center"
                maxWidth="300px"
              >
                <Grid item xs={6} md={6}>
                  <Stack spacing={1} alignItems="flex-start">
                    <Link
                      component={RouterLink}
                      to="/"
                      color="inherit" // Hereda el color del texto del footer (blanco)
                      underline="hover"
                    >
                      Inicio
                    </Link>
                    <Link
                      component={RouterLink}
                      to="/nosotros"
                      color="inherit"
                      underline="hover"
                    >
                      Nosotros
                    </Link>
                    <Link
                      component={RouterLink}
                      to="/contacto"
                      color="inherit"
                      underline="hover"
                    >
                      Contacto
                    </Link>
                  </Stack>
                </Grid>
                <Grid item xs={6}>
                  <Stack spacing={1} alignItems="flex-start">
                    <Link
                      component={RouterLink}
                      to="/cotizador"
                      color="inherit"
                      underline="hover"
                    >
                      Cotizador
                    </Link>
                    <Link
                      component={RouterLink}
                      to="/productos"
                      color="inherit"
                      underline="hover"
                    >
                      Productos
                    </Link>
                    <Link href="#" color="inherit" underline="hover">
                      Términos y condiciones
                    </Link>
                    <Link href="#" color="inherit" underline="hover">
                      Política de privacidad
                    </Link>
                  </Stack>
                </Grid>
              </Grid>
            </Box>
          </Grid>

          {/* Redes Sociales */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom sx={{ ml: "10px" }}>
              Síguenos
            </Typography>
            <IconButton color="inherit" href="#" aria-label="Facebook">
              <FacebookIcon />
            </IconButton>
            <IconButton color="inherit" href="#" aria-label="Instagram">
              <InstagramIcon />
            </IconButton>
            <IconButton color="inherit" href="#" aria-label="Twitter">
              <TwitterIcon />
            </IconButton>
          </Grid>
        </Grid>

        {/* Línea divisoria y derechos */}
        <Box
          mt={4}
          borderTop={1}
          borderColor={theme.palette.navFooterText}
          pt={2}
        >
          {/* El borderColor de la línea divisoria también usa el color del texto del footer (blanco) */}
          <Typography variant="body2" align="center" color="inherit">
            © {new Date().getFullYear()} dimade.cl – Todos los derechos
            reservados.
          </Typography>

          {/* Botón de ENTRADA AL BACKOFFICE a la derecha abajo del footer */}
          <Box
            sx={{
              position: "absolute", // Posiciona el botón respecto al footer
              bottom: 40, // Alineado a la parte inferior del footer
              right: 20, // Alineado a la derecha del footer
              transform: "translateY(50%)", // Mueve el botón la mitad de su altura hacia abajo para que quede "a caballo" entre el footer y el espacio de abajo
              zIndex: 1, // Asegura que esté por encima del contenido del footer si es necesario
            }}
          >
            <Button
              variant="contained"
              color="primary" // Asumo que el botón usará el color 'primary' (naranja) de tu tema
              startIcon={<LoginIcon />} // ¡ICONO CAMBIADO AQUÍ a LoginIcon!
              component={RouterLink}
              to="/login"
              sx={{
                mt: 2, // Margen superior si lo necesitas, aunque translateY podría manejar el espacio
                borderRadius: "50%",
                minWidth: 0,
                width: 56, // Ancho fijo para que sea circular
                height: 56, // Alto fijo para que sea circular
                boxShadow: 3,
                display: "flex", // Para centrar el ícono
                justifyContent: "center", // Centra horizontalmente el ícono
                alignItems: "center", // Centra verticalmente el ícono
                "&:hover": {
                  backgroundColor: theme.palette.primary.dark, // Efecto hover usando el dark de primary
                },
              }}
            ></Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
