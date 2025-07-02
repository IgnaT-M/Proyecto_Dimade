import React from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  Stack,
  useTheme,
  Button, // CAMBIO: Import para el botón
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LoginIcon from "@mui/icons-material/Login"; // CAMBIO: Import para el ícono del botón

import { Link as RouterLink } from "react-router-dom";
import logoDimade from "/imagenes/logo_dimade_nav2.png"; // Asegúrate que esta ruta es correcta

const Footer = () => {
  const theme = useTheme();

  return (
    <Box
      component="footer"
      sx={{
        width: "100%",
        background: `linear-gradient(180deg, ${theme.palette.navFooterBgGradientStart} 10%, ${theme.palette.navFooterBgGradientEnd} 120%)`,
        color: theme.palette.navFooterText,
        pt: { xs: 4, md: 6 },
        pb: { xs: 4, md: 3 },
        mt: "auto",
        position: "relative", // Esencial para posicionar el botón de forma absoluta
      }}
    >
      <Container maxWidth="lg">
        <Grid
          container
          spacing={{ xs: 2, md: 6 }}
          alignItems="center"
          justifyContent={{ xs: "center", md: "center" }}
        >
          {/* --- COLUMNA 1: LOGO --- */}
          <Grid
            item
            xs={12}
            md="auto"
            sx={{
              display: { xs: "none", md: "flex" },
              justifyContent: "center",
            }}
          >
            <Box
              component="img"
              src={logoDimade}
              alt="Logo de dimade"
              sx={{
                height: 80,
                borderRadius: 2,
              }}
            />
          </Grid>

          {/* --- COLUMNA 2: ENLACES LEGALES (TÉRMINOS Y POLÍTICA) --- */}
          <Grid
            item
            xs={12}
            md="auto"
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              order: { xs: 2, md: 1 },
            }}
          >
            <Box>
              <Link href="#" color="inherit" underline="hover" display="block">
                Términos y condiciones
              </Link>
              <Link
                href="#"
                color="inherit"
                underline="hover"
                display="block"
                mt={0.5}
              >
                Política de privacidad
              </Link>
            </Box>
          </Grid>

          {/* --- COLUMNA 3: CONTACTO (TELÉFONO Y CORREO) --- */}
          <Grid
            item
            xs={12}
            md="auto"
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: { xs: "center", md: "center" },
              textAlign: "center",
              order: { xs: 1, md: 2 },
            }}
          >
            <Stack
              direction="row"
              spacing={1}
              alignItems="center"
              sx={{ width: "100%", justifyContent: "flex-start" }}
            >
              <PhoneIcon fontSize="small" />
              <Typography variant="body2">+56 9 2040 0454</Typography>
            </Stack>
            <Stack
              direction="row"
              spacing={1}
              mt={1}
              alignItems="center"
              sx={{ width: "100%", justifyContent: "flex-start" }}
            >
              <EmailIcon fontSize="small" />
              <Typography variant="body2">dimadecontacto@gmail.com</Typography>
            </Stack>
          </Grid>
        </Grid>

        {/* --- Línea divisoria y derechos --- */}
        <Box mt={4} borderTop={1} borderColor="rgba(255, 255, 255, 0.2)" pt={2}>
          <Typography variant="body2" align="center" color="inherit">
            © {new Date().getFullYear()} dimade.cl – Todos los derechos
            reservados.
          </Typography>
        </Box>

        {/* CAMBIO: Botón de Backoffice recuperado y añadido aquí */}
        <Box
          sx={{
            position: "absolute",
            bottom: 16,
            right: 22,
          }}
        >
          <Button
            variant="contained"
            color="primary" // Asumo que es el color naranja de tu tema
            component={RouterLink}
            to="/login"
            sx={{
              borderRadius: "50%",
              width: 56,
              height: 56,
              minWidth: 0,
              boxShadow: 3,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              "&:hover": {
                backgroundColor: theme.palette.primary.dark,
              },
            }}
          >
            <LoginIcon />
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
