import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Avatar,
  Box,
  IconButton,
  Tooltip,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";

const Topbar = ({ usuario, onLogout }) => {
  return (
    <AppBar
      position="fixed"
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        backgroundColor: "#10567E",
        width: "auto",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Typography variant="h6" fontWeight="bold">
          Panel de Administración
        </Typography>

        <Box display="flex" alignItems="center" gap={2}>
          <Box textAlign="right">
            <Typography variant="body1" fontWeight="bold">
              {usuario.nombre}
            </Typography>
            <Typography variant="body2">{usuario.email}</Typography>
          </Box>
          <Avatar sx={{ bgcolor: "#3f51b5" }}>
            {usuario.nombre.charAt(0).toUpperCase()}
          </Avatar>
          <Tooltip title="Cerrar sesión">
            <IconButton onClick={onLogout} color="inherit">
              <LogoutIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Topbar;
