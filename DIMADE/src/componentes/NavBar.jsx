import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Stack,
  ThemeProvider,
  Box,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

const Navbar = () => {
  return (
    <AppBar
      position="static"
      sx={{
        background: "linear-gradient(180deg, #10567E 20%, #30749C 90%)",
        boxShadow: "none",
      }}
    >
      <Toolbar
        sx={{
          justifyContent: "space-between",
          height: "3vw",
        }}
      >
        <Box
          variant="img"
          component="img"
          src="public/imagenes/logo_nav_bar.png"
          alt="Logo_Dimade"
          sx={{ height: "3vw" }}
          paddingLeft={4}
        />

        <Stack direction="row" spacing={2}>
          <Button
            color="inherit"
            component={RouterLink}
            to="/"
            sx={{
              borderRadius: "9px",
              backgroundColor: "rgba(59, 106, 164, 0.07)",
              "&:hover": {
                backgroundColor: "rgba(59, 106, 164, 0.57)",
                backdropFilter: "blur(5px)",
                WebkitBackdropFilter: "blur(5px)",
                borderRadius: "10px",
              },
            }}
          >
            Inicio
          </Button>
          <Button
            color="inherit"
            component={RouterLink}
            to="/Nosotros"
            sx={{
              borderRadius: "9px",
              backgroundColor: "rgba(59, 106, 164, 0.07)",
              "&:hover": {
                backgroundColor: "rgba(59, 106, 164, 0.57)",
                backdropFilter: "blur(5px)",
                WebkitBackdropFilter: "blur(5px)",
                borderRadius: "10px",
              },
            }}
          >
            Nosotros
          </Button>
          <Button
            color="inherit"
            component={RouterLink}
            to="/Contacto"
            sx={{
              borderRadius: "9px",
              backgroundColor: "rgba(59, 106, 164, 0.07)",
              "&:hover": {
                backgroundColor: "rgba(59, 106, 164, 0.57)",
                backdropFilter: "blur(5px)",
                WebkitBackdropFilter: "blur(5px)",
                borderRadius: "10px",
              },
            }}
          >
            Contacto
          </Button>
          <Button
            color="inherit"
            component={RouterLink}
            to="/Cotizador"
            sx={{
              borderRadius: "9px",
              backgroundColor: "rgba(59, 106, 164, 0.07)",
              "&:hover": {
                backgroundColor: "rgba(59, 106, 164, 0.57)",
                backdropFilter: "blur(5px)",
                WebkitBackdropFilter: "blur(5px)",
                borderRadius: "10px",
              },
            }}
          >
            Cotizar
          </Button>

          <Button
            color="inherit"
            component={RouterLink}
            to="/Productos"
            sx={{
              borderRadius: "9px",
              backgroundColor: "rgba(59, 106, 164, 0.07)",
              "&:hover": {
                backgroundColor: "rgba(59, 106, 164, 0.57)",
                backdropFilter: "blur(5px)",
                WebkitBackdropFilter: "blur(5px)",
                borderRadius: "10px",
              },
            }}
          >
            Ver Categorias
          </Button>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
