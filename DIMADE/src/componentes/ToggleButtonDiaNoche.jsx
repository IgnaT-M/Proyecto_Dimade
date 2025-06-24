// Ubicación: src/componentes/ToggleButtonDiaNoche.jsx

import React from "react";
import { useTheme } from "@mui/material/styles";
import { IconButton } from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { useColorMode } from "./BtnClarOscuro.jsx";

const ThemeToggleButton = () => {
  const theme = useTheme();
  const colorMode = useColorMode();

  return (
    <IconButton
      sx={{ ml: 1 }}
      onClick={colorMode.toggleColorMode}
      color="inherit"
    >
      {theme.palette.mode === "dark" ? (
        <Brightness7Icon />
      ) : (
        <Brightness4Icon />
      )}
    </IconButton>
  );
};

export default ThemeToggleButton;
