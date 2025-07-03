// BtnClarOscuro.jsx (Código Final con Modo Oscuro Corregido)

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
                // ============== PALETA PARA MODO CLARO (SIN CAMBIOS) ==============
                primary: { main: "#D95830" /* ... */ },
                secondary: { main: "#10567E" /* ... */ },
                background: { default: "#f4f6f8", paper: "#ffffff" },
                text: { primary: "#000000", secondary: "#555555" },
                divider: "#cccccc",
                navFooterBgGradientStart: "#10567E",
                navFooterBgGradientEnd: "rgba(48, 116, 156, 0.8)",
                navFooterText: "#ffffff",
                navButtonHoverBg: "rgba(199, 205, 214, 0.99)",
                navButtonHoverText: "#2d222d",
                categoryMenuBg: "#10567E",
                categoryMenuText: "#ffffff",
                categoryMenuSelectedBg: "#30759C",
                categoryMenuHoverBg: "#30759C",
                categoryMenuDivider: "rgba(255,255,255,0.2)",
                categoryContentBg: "#ffffff",
                modalBg: "#fff",
              }
            : {
                // ============== PALETA PARA MODO OSCURO (CON CAMBIOS) ==============
                primary: { main: "#D95830" /* ... */ },

                // === CAMBIO 1: El color secundario ahora es un gris muy oscuro ===
                secondary: {
                  main: "#1a1a1a", // Antes era #10567E
                  dark: "#0a3a54",
                  light: "#30749C",
                },

                background: { default: "#121212", paper: "#1e1e1e" },
                text: { primary: "#ffffff", secondary: "#bbbbbb" },
                divider: "#444444",
                navFooterBgGradientStart: "#1a1a1a",
                navFooterBgGradientEnd: "#0d0d0d",
                navFooterText: "#ffffff",
                navButtonHoverBg: "rgba(30, 30, 30, 0.9)",
                navButtonHoverText: "#ffffff",

                // === CAMBIO 2: El fondo del menú lateral ahora también es oscuro ===
                categoryMenuBg: "#1a1a1a", // Antes era #10567E

                categoryMenuText: "#ffffff",
                categoryMenuSelectedBg: "#30759C",
                categoryMenuHoverBg: "#30759C",
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
