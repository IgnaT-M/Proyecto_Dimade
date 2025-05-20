import React from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  IconButton,
  Stack,
} from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import logoDimade from "../assets/imagenes/logo_dimade.png";
import { Link as RouterLink } from "react-router-dom";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        width: "100%",
        backgroundColor: "#f6f4f2",
        color: "#2d222d",
        pt: 6,
        pb: 3,
        mt: "auto",
        textAlign: "start",
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
                // Margen derecho
                display: { xs: "none", sm: "block" },
              }}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              DIMADE
            </Typography>
            <Stack
              direction="row"
              justifyContent="center"
              alignItems="center"
              spacing={1}
            >
              <Typography variant="body2">Distribucion Integral</Typography>
            </Stack>
            <Stack
              direction="row"
              justifyContent="start"
              alignItems="start"
              spacing={1}
              mt={1}
            >
              <Typography variant="body2">Lorem ipsum</Typography>
            </Stack>
          </Grid>
          {/* Contacto */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              Contacto
            </Typography>
            <Stack
              direction="row"
              justifyContent="start"
              alignItems="start"
              spacing={1}
            >
              <PhoneIcon fontSize="small" />
              <Typography variant="body2">+56 9 1234 5678</Typography>
            </Stack>
            <Stack
              direction="row"
              justifyContent="start"
              alignItems="start"
              spacing={1}
              mt={1}
            >
              <EmailIcon fontSize="small" />
              <Typography variant="body2">contacto@dimade.cl</Typography>
            </Stack>
          </Grid>

          {/* Enlaces */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              Enlaces
            </Typography>
            <Stack spacing={1} alignItems="start">
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
          <Typography variant="body2" align="center" color="gray">
            © {new Date().getFullYear()} dimade.cl – Todos los derechos
            reservados.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
