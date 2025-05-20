import { createTheme } from "@mui/material";

const theme = createTheme({
  typography: {
    fontFamily: '"Montserrat", Arial, sans-serif',
  },
  palette: {
    primary: {
      main: "#00789A",
    },
    secondary: {
      main: "#43B4D2",
    },
    accent: {
      main: "#E6402C",
    },
    darkText: {
      main: "#2d222d",
    },
    lightText: {
      main: "#ffffff",
    },
    background: {
      default: "#f6f4f2",
    },
    color1: {
      main: "#00fc17",
    },
  },
});

export default theme;
