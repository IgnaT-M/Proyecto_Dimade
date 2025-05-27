import { createTheme } from "@mui/material";

const theme = createTheme({
  typography: {
    fontFamily: '"Montserrat", Arial, sans-serif',
  },
  palette: {
    primary: {
      main: "#10567E",
    },
    secondary: {
      main: "#D95830",
    },
    terciary: {
      main: "#30749C",
    },
    background: {
      main: "#DBDFE6",
    },
    darkText: {
      main: "#2d222d",
    },
    lightText: {
      main: "#ffffff",
    },
  },
});

export default theme;
