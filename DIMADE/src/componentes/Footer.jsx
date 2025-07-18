import React from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  Stack,
  useTheme,
  Button,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LoginIcon from "@mui/icons-material/Login";

import { Link as RouterLink } from "react-router-dom";
import logoDimade from "/imagenes/logo_dimade_nav2.png";

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
        position: "relative",
      }}
    >
      <Container maxWidth="lg">
        <Grid
          container
          spacing={{ xs: 2, md: 6 }}
          alignItems="center"
          justifyContent={{ xs: "center", md: "center" }}
        >
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

        <Box mt={4} borderTop={1} borderColor="rgba(255, 255, 255, 0.2)" pt={2}>
          <Typography variant="body2" align="center" color="inherit">
            © {new Date().getFullYear()} dimade.cl – Todos los derechos
            reservados.
          </Typography>
        </Box>

        <Box
          sx={{
            position: "absolute",
            bottom: 16,
            right: 22,
          }}
        >
          <Button
            variant="contained"
            color="primary"
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
