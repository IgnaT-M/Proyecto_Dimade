// BtnClarOscuro.jsx (o donde tengas tu CustomThemeProvider)

import React, { useState, useMemo, createContext, useContext } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";

const ColorModeContext = createContext({ toggleColorMode: () => {} });

export const CustomThemeProvider = ({ children }) => {
  const [mode, setMode] = useState("light");

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,

          ...(mode === "light"
            ? {
                // ============== PALETA PARA MODO CLARO ==============
                // Primary: ¡Este será siempre el NARANJA para el botón "COTIZAR"!
                primary: {
                  main: "#D95830", // NARANJA FIJO para el botón "COTIZAR"
                  dark: "#bf4524", // Un tono más oscuro de naranja para hover
                  light: "#e0785a", // Un tono más claro de naranja
                },
                // Secondary: Este será tu AZUL principal #10567E (para fondos de Navbar, Footer, menú categorías)
                secondary: {
                  main: "#10567E", // Tu color AZUL principal
                  dark: "#0a3a54", // Tono más oscuro del azul para gradientes
                  light: "#30749C", // Tono más claro del azul (rgba(48, 116, 156, 0.8))
                },
                background: {
                  default: "#f4f6f8", // Fondo general de la página en claro
                  paper: "#ffffff", // Fondo de componentes "papel" en claro
                },
                text: {
                  primary: "#000000", // Color de texto principal para el resto de la página en claro
                  secondary: "#555555",
                },
                divider: "#cccccc", // Color del divisor en claro

                // Colores para Navbar y Footer (gradientes) en MODO CLARO
                // Usarán el azul de `secondary`
                navFooterBgGradientStart: "#10567E", // Azul #10567E
                navFooterBgGradientEnd: "rgba(48, 116, 156, 0.8)", // Azul #30749C con transparencia
                navFooterText: "#ffffff", // Texto BLANCO para Navbar y Footer

                // Color para el hover del botón normal del navbar en modo claro
                navButtonHoverBg: "rgba(199, 205, 214, 0.99)",
                navButtonHoverText: "#2d222d",

                // Colores para la Sección de Categorías (menú lateral) en MODO CLARO
                categoryMenuBg: "#10567E", // Fondo del menú de categorías (azul #10567E)
                categoryMenuText: "#ffffff", // Texto del menú de categorías (blanco)
                categoryMenuSelectedBg: "#30759C", // Fondo de categoría seleccionada (azul #30749C, corregido para consistencia)
                categoryMenuHoverBg: "#30759C", // Fondo de categoría en hover (azul #30749C, corregido para consistencia)
                categoryMenuDivider: "rgba(255,255,255,0.2)",
                categoryContentBg: "#ffffff",
                modalBg: "#fff",
              }
            : {
                // ============== PALETA PARA MODO OSCURO ==============
                // Primary: ¡Este será siempre el NARANJA para el botón "COTIZAR"!
                primary: {
                  main: "#D95830", // NARANJA FIJO para el botón "COTIZAR"
                  dark: "#bf4524", // Tono más oscuro de naranja
                  light: "#e0785a", // Tono más claro de naranja
                },
                // Secondary: Este será tu AZUL principal #10567E (si lo usas para otros elementos)
                secondary: {
                  main: "#10567E", // Tu color AZUL principal
                  dark: "#0a3a54",
                  light: "#30749C",
                },
                background: {
                  default: "#121212", // Fondo general de la página en oscuro
                  paper: "#1e1e1e", // Fondo de componentes "papel" en oscuro
                },
                text: {
                  primary: "#ffffff", // Color de texto principal para el resto de la página en oscuro
                  secondary: "#bbbbbb",
                },
                divider: "#444444",

                // Colores para Navbar y Footer (gradientes) en MODO OSCURO
                // Usarán tonos de negro/gris
                navFooterBgGradientStart: "#1a1a1a",
                navFooterBgGradientEnd: "#0d0d0d",
                navFooterText: "#ffffff", // Texto BLANCO para Navbar y Footer

                // Color para el hover del botón normal del navbar en modo oscuro
                navButtonHoverBg: "rgba(30, 30, 30, 0.9)",
                navButtonHoverText: "#ffffff",

                // Colores para la Sección de Categorías (menú lateral) en MODO OSCURO
                categoryMenuBg: "#10567E", // Fondo del menú de categorías (azul #10567E)
                categoryMenuText: "#ffffff", // Texto del menú de categorías (blanco)
                categoryMenuSelectedBg: "#30759C", // Fondo de categoría seleccionada (azul #30749C)
                categoryMenuHoverBg: "#30759C", // Fondo de categoría en hover (azul #30749C)
                categoryMenuDivider: "rgba(255,255,255,0.2)",
                categoryContentBg: "#2d2d2d",
                modalBg: "#2d2d2d",
              }),
        },
        components: {
          MuiIconButton: {
            styleOverrides: {
              root: ({ theme }) => ({
                color: theme.palette.navFooterText,
              }),
            },
          },
        },
      }),
    [mode]
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export const useColorMode = () => useContext(ColorModeContext);
