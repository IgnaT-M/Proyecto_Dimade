import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Avatar,
  Box,
  IconButton,
  Tooltip,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  CssBaseline,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { alpha } from "@mui/material/styles";

import MenuIcon from "@mui/icons-material/Menu";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { useColorMode } from "./BtnClarOscuro";

import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PeopleIcon from "@mui/icons-material/People";
import GroupIcon from "@mui/icons-material/Group";
import BusinessIcon from "@mui/icons-material/Business";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import RequestQuoteIcon from "@mui/icons-material/RequestQuote";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import LogoutIcon from "@mui/icons-material/Logout";

//este es el panel de navegacion del backoffice, en esta parte se selecciona el datalist que se renderiza
const menuItems = [
  { key: "inicio", label: "Inicio", icon: <DashboardIcon /> },
  {
    key: "ordenesCompra",
    label: "Órdenes de Compra",
    icon: <ShoppingCartIcon />,
  },
  {
    key: "solicitudesCotizacion",
    label: "Solicitudes de Cotización",
    icon: <RequestQuoteIcon />,
  },
  {
    key: "solicitudesContacto",
    label: "Solicitudes de Contacto",
    icon: <SupportAgentIcon />,
  },
  { key: "clientes", label: "Clientes", icon: <PeopleIcon /> },
  { key: "usuarios", label: "Usuarios", icon: <GroupIcon /> },
  { key: "proveedores", label: "Proveedores", icon: <BusinessIcon /> },
  {
    key: "registrosFinancieros",
    label: "Registros Financieros",
    icon: <ReceiptLongIcon />,
  },
];
const drawerWidth = 240;

const PanelAdministracion = ({
  usuario,
  onLogout,
  selected,
  onSelect,
  children,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [mobileOpen, setMobileOpen] = useState(false);
  const colorMode = useColorMode();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  let displayName = "";
  if (usuario && usuario.nombre) {
    const namePart = usuario.nombre.split("@")[0];
    displayName = namePart.charAt(0).toUpperCase() + namePart.slice(1);
  }

  const drawerContent = (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <Toolbar />
      <Box sx={{ px: 2, py: 3, textAlign: "center" }}>
        <Typography variant="h5" component="div">
          DIMADE
        </Typography>
      </Box>

      <List sx={{ flexGrow: 1 }}>
        {menuItems.map((item) => (
          <ListItem key={item.key} disablePadding>
            <ListItemButton
              onClick={() => {
                onSelect(item.key);
                if (isMobile) {
                  handleDrawerToggle();
                }
              }}
              selected={selected === item.key}
              sx={(theme) => ({
                color: "categoryMenuText",
                "&:hover": {
                  backgroundColor: alpha(theme.palette.primary.main, 0.3),
                },
                "&.Mui-selected": {
                  backgroundColor: alpha(theme.palette.primary.main, 0.45),
                  "&:hover": {
                    backgroundColor: alpha(theme.palette.primary.main, 0.55),
                  },
                },
              })}
            >
              <ListItemIcon sx={{ color: "categoryMenuText" }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      {isMobile && (
        <Box sx={{ p: 2, display: "flex", justifyContent: "flex-end" }}>
          <Tooltip
            title={theme.palette.mode === "dark" ? "Modo claro" : "Modo oscuro"}
          >
            <IconButton
              onClick={colorMode.toggleColorMode}
              sx={{ color: "categoryMenuText" }}
            >
              {theme.palette.mode === "dark" ? (
                <Brightness7Icon />
              ) : (
                <Brightness4Icon />
              )}
            </IconButton>
          </Tooltip>
        </Box>
      )}
    </Box>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        color="secondary"
        enableColorOnDark
        sx={{
          width: { md: `calc(100% - ${drawerWidth}px)` },
          ml: { md: `${drawerWidth}px` },
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { md: "none" } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" fontWeight="bold" noWrap component="div">
              Panel de Administración
            </Typography>
          </Box>

          <Box display="flex" alignItems="center" gap={{ xs: 1, sm: 2 }}>
            <Box
              textAlign="right"
              sx={{ display: { xs: "none", sm: "block" } }}
            >
              <Typography variant="body1" fontWeight="bold">
                {displayName}
              </Typography>
              <Typography variant="body2">{usuario.email}</Typography>
            </Box>
            <Avatar sx={{ bgcolor: "primary.main" }}>
              {usuario.nombre.charAt(0).toUpperCase()}
            </Avatar>
            <Tooltip
              title={
                theme.palette.mode === "dark" ? "Modo claro" : "Modo oscuro"
              }
            >
              <IconButton
                onClick={colorMode.toggleColorMode}
                color="inherit"
                sx={{ display: { xs: "none", md: "inline-flex" } }}
              >
                {theme.palette.mode === "dark" ? (
                  <Brightness7Icon />
                ) : (
                  <Brightness4Icon />
                )}
              </IconButton>
            </Tooltip>
            <Tooltip title="Cerrar sesión">
              <IconButton onClick={onLogout} color="inherit">
                <LogoutIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
      </AppBar>

      <Box
        component="nav"
        sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          variant={isMobile ? "temporary" : "permanent"}
          open={isMobile ? mobileOpen : true}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              bgcolor: "categoryMenuBg",
              color: "categoryMenuText",
              borderRight: "none",
            },
          }}
        >
          {drawerContent}
        </Drawer>
      </Box>

      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, bgcolor: "background.default" }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
};

export default PanelAdministracion;
