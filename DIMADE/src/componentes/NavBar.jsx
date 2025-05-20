import React from "react";
import { AppBar, Toolbar, Typography, Button, Stack } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

const Navbar = () => {
  return (
    <AppBar position="static">
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Typography variant="h6" component="div">
          DIMADE
        </Typography>

        <Stack direction="row" spacing={2}>
          <Button color="inherit" component={RouterLink} to="/">
            Inicio
          </Button>
          <Button color="inherit" component={RouterLink} to="/nosotros">
            Nosotros
          </Button>
          <Button color="inherit" component={RouterLink} to="/contacto">
            Contacto
          </Button>

          <Button color="inherit" component={RouterLink} to="/cotizador">
            Cotizar
          </Button>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
