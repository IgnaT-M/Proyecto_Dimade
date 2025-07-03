import {
  AppBar,
  Toolbar,
  Button,
  Stack,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import ThemeToggleButton from "./ToggleButtonDiaNoche.jsx";

const Navbar = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const handleScrollTo = (sectionId) => {
    const sectionElement = document.getElementById(sectionId);
    if (sectionElement) {
      if (sectionId === "productos") {
        const offset = 80;
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = sectionElement.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      } else {
        // Lógica de centrado para el resto de las secciones
        sectionElement.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    }
  };

  const [mobileOpen, setMobileOpen] = useState(false);
  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  const navItems = [
    { name: "Inicio", to: "/", isRouterLink: true },
    { name: "Productos", to: "productos" },
    { name: "Contacto", to: "contacto" },
    { name: "Cotizar", to: "cotizar", isSpecial: true },
  ];

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Box sx={{ my: 2 }}>
        <img
          src="/imagenes/logo_nav_bar.png"
          alt="Logo_Dimade"
          style={{ height: "50px", maxWidth: "100%", objectFit: "contain" }}
        />
      </Box>
      <List>
        {navItems.map((item) => (
          <ListItem key={item.name} disablePadding>
            <ListItemButton
              onClick={() =>
                item.isRouterLink ? navigate(item.to) : handleScrollTo(item.to)
              }
              sx={{
                textAlign: "center",
                color: item.isSpecial ? "#fff" : theme.palette.navFooterText,
                ...(item.isSpecial && {
                  // El botón especial en el Drawer usará el color primary (naranja)
                  backgroundColor: theme.palette.primary.main,
                  "&:hover": {
                    backgroundColor: theme.palette.primary.dark,
                  },
                }),
              }}
            >
              <ListItemText primary={item.name} />
            </ListItemButton>
          </ListItem>
        ))}
        <ListItem disablePadding>
          <ListItemButton sx={{ justifyContent: "center" }}>
            <ThemeToggleButton />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <AppBar
      position="static"
      sx={{
        // Aplica el gradiente para Navbar definido en el tema
        background: `linear-gradient(180deg, ${theme.palette.navFooterBgGradientStart} 20%, ${theme.palette.navFooterBgGradientEnd} 90%)`,
        boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
        paddingX: { xs: 2, sm: 4 },
      }}
    >
      <Toolbar
        sx={{
          justifyContent: "space-between",
          height: { xs: "8vh", md: "5vw" },
          minHeight: { xs: "64px", md: "70px" },
        }}
      >
        <Box
          component={RouterLink}
          to="/"
          sx={{
            height: { xs: "6vh", md: "4vw" },
            minHeight: { xs: "40px", md: "50px" },
            display: "flex",
            alignItems: "center",
          }}
          paddingLeft={{ xs: 0, sm: 4 }}
        >
          <img
            src="/imagenes/logo_nav_bar.png"
            alt="Logo_Dimade"
            style={{ height: "100%", maxWidth: "100%", objectFit: "contain" }}
          />
        </Box>

        <IconButton
          color="inherit" // Hereda el color definido en MuiIconButton en el tema (que es navFooterText)
          aria-label="open drawer"
          edge="end"
          onClick={handleDrawerToggle}
          sx={{
            display: { xs: "block", md: "none" },
            marginRight: { xs: 0, sm: 2 },
          }}
        >
          <MenuIcon />
        </IconButton>

        <Stack
          direction="row"
          alignItems="center"
          spacing={{ xs: 1, sm: 2 }}
          sx={{ display: { xs: "none", md: "flex" } }}
        >
          {navItems.map((item) => (
            <Button
              key={item.name}
              onClick={() =>
                item.isRouterLink ? navigate(item.to) : handleScrollTo(item.to)
              }
              sx={{
                color: item.isSpecial ? "#fff" : theme.palette.navFooterText,
                borderRadius: "9px",
                // ¡Aquí el botón "Cotizar" usa primary.main (naranja) como tú quieres!
                backgroundColor: item.isSpecial
                  ? theme.palette.primary.main
                  : "transparent",
                "&:hover": {
                  ...(item.isSpecial
                    ? {
                        backgroundColor: theme.palette.primary.dark, // Hover del botón "Cotizar" usa primary.dark
                      }
                    : {
                        backgroundColor: theme.palette.navButtonHoverBg,
                        boxShadow: "0 4px 6px -4px rgba(3, 3, 3, 0.5)",
                        color: theme.palette.navButtonHoverText,
                        transition: "box-shadow 0.3s ease-in-out",
                      }),
                },
                fontSize: { xs: "0.75rem", sm: "0.875rem" },
                padding: { xs: "6px 8px", sm: "8px 12px" },
              }}
            >
              {item.name}
            </Button>
          ))}
          <ThemeToggleButton />
        </Stack>
      </Toolbar>

      <Drawer
        variant="temporary"
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: 240,
            background: `linear-gradient(180deg, ${theme.palette.navFooterBgGradientStart} 20%, ${theme.palette.navFooterBgGradientEnd} 90%)`,
          },
        }}
      >
        {drawer}
      </Drawer>
    </AppBar>
  );
};

export default Navbar;
