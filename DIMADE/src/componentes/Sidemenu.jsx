import React from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  Typography,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PeopleIcon from "@mui/icons-material/People";
import GroupIcon from "@mui/icons-material/Group";
import BusinessIcon from "@mui/icons-material/Business";

const menuItems = [
  { key: "inicio", label: "Inicio", icon: <DashboardIcon /> },
  {
    key: "ordenes1",
    label: "Órdenes de compra(Clientes)",
    icon: <ShoppingCartIcon />,
  },
  {
    key: "ordenes2",
    label: "Órdenes de compra(Proveedores)",
    icon: <ShoppingCartIcon />,
  },
  { key: "clientes", label: "Clientes", icon: <PeopleIcon /> },
  { key: "usuarios", label: "Usuarios", icon: <GroupIcon /> },
  { key: "proveedores", label: "Proveedores", icon: <BusinessIcon /> },
];

const drawerWidth = 240;

const SideMenu = ({ onSelect, selected }) => {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: "border-box",
          background: "linear-gradient(to bottom, #1976d2, #1565c0)",
          color: "#fff",
        },
      }}
    >
      <Box sx={{ px: 2, py: 3 }}>
        <Typography variant="h6" fontWeight="bold">
          Panel Admin
        </Typography>
      </Box>
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.key} disablePadding>
            <ListItemButton
              onClick={() => onSelect(item.key)}
              selected={selected === item.key}
              sx={{
                color: "#fff",
                "&.Mui-selected": {
                  backgroundColor: "#0d47a1",
                },
                "&.Mui-selected:hover": {
                  backgroundColor: "#1565c0",
                },
                "&:hover": {
                  backgroundColor: "#1e88e5",
                },
              }}
            >
              <ListItemIcon sx={{ color: "#fff" }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default SideMenu;
