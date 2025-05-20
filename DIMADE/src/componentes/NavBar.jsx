import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Stack,
  ThemeProvider,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

const Navbar = () => {
  return (
    <AppBar position="static">
      <Toolbar
        sx={{
          justifyContent: "space-between",
          backgroundColor: "", // Cambia el color de fondo aquí
          padding: "0 20px", // Cambia el color de fondo aquí
        }}
      >
        <Typography
          variant="h6"
          // color={theme.palette.lightText.main} // Cambia el color del texto aquí
          component="div"
        >
          DIMADE
        </Typography>

        <Stack direction="row" spacing={2}>
          <Button
            sx={{
              color: "inherit",
              fontFamily: '"Montserrat", Arial',
            }}
            component={RouterLink}
            to="/"
          >
            Inicio
          </Button>
          <Button color="inherit" component={RouterLink} to="/Nosotros">
            Nosotros
          </Button>
          <Button color="inherit" component={RouterLink} to="/Contacto">
            Contacto
          </Button>
          <Button color="inherit" component={RouterLink} to="/Cotizador">
            Cotizar
          </Button>
          <Button color="inherit" component={RouterLink} to="/Productos">
            Productos
          </Button>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
