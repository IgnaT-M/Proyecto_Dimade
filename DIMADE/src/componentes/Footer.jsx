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
} from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";

import LogoutIcon from "@mui/icons-material/Logout";

import logoDimade from "../../public/imagenes/logo_dimade.png"; // Asegúrate de que la ruta sea correcta
import { Link as RouterLink } from "react-router-dom";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        width: "100%",
        background: "linear-gradient(0deg, #10567E 10%, #30749C 60%)",
        color: "#ffffff",
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
                  borderColor: "#000000",
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
              <Typography variant="body2">+56 9 6721 6646</Typography>
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
                      color="inherit"
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

        <Box mt={4} borderTop={1} borderColor="#333" pt={2}>
          <Typography variant="body2" align="center" color="white">
            © {new Date().getFullYear()} dimade.cl – Todos los derechos
            reservados.
          </Typography>

          {/* Botón salir abajo a la derecha */}
          <Box
            sx={{
              position: "absolute",
              bottom: 0,
              right: 16,
            }}
          >
            <Button
              variant="contained"
              color="background"
              startIcon={<LogoutIcon />}
              component={RouterLink}
              to="/login"
              sx={{ mt: 2 }}
            ></Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
