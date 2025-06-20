import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SideMenu from "../../componentes/Sidemenu";
import ClientesList from "../../componentes/DataList/ClientesList";
import UsuariosList from "../../componentes/DataList/UsuariosList";
import ProveedoresList from "../../componentes/DataList/ProveedoresList";
import CotizacionesList from "../../componentes/DataList/CotizacionesList";
import ContactoList from "../../componentes/DataList/ContactoList";
import RegistrosList from "../../componentes/DataList/RegistrosList";
import { Box } from "@mui/material";
import Topbar from "../../componentes/Topbar";
import { jwtDecode } from "jwt-decode";

const sectionTitles = {
  clientes: "Clientes",
  usuarios: "Usuarios",
  proveedores: "Proveedores",
  OrdenesCompra: "Órdenes de Compra",
  SolicitudesCotizacion: "Solicitudes de Cotización",
  SolicitudesContacto: "Solicitudes de Contacto",
  registrosFinancieros: "Registros Financieros",
};

const Backoffice = () => {
  const [selectedSection, setSelectedSection] = useState("clientes");
  const [usuarioLogeado, setUsuarioLogeado] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    if (!token) return navigate("/");
    try {
      const decoded = jwtDecode(token);
      const rol = decoded.rol;
      if (rol !== "ADMIN" && rol !== "OPERADOR") return navigate("/");
      setUsuarioLogeado({ nombre: decoded.sub, email: decoded.sub, rol });
    } catch (e) {
      console.error("Token inválido", e);
      navigate("/");
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("jwtToken");
    navigate("/");
  };

  const renderSection = () => {
    switch (selectedSection) {
      case "clientes":
        return <ClientesList />;
      case "usuarios":
        return <UsuariosList />;
      case "proveedores":
        return <ProveedoresList />;
      case "SolicitudesCotizacion":
        return <CotizacionesList />;
      case "SolicitudesContacto":
        return <ContactoList />;
      case "registrosFinancieros":
        return <RegistrosList />;
      default:
        return <Box>No hay datos disponibles.</Box>;
    }
  };

  return (
    <>
      {usuarioLogeado && (
        <>
          <Topbar usuario={usuarioLogeado} onLogout={handleLogout} />
          <Box sx={{ display: "flex", pt: 8 }}>
            <SideMenu
              onSelect={setSelectedSection}
              selected={selectedSection}
            />
            <Box sx={{ flexGrow: 1, p: 4 }}>{renderSection()}</Box>
          </Box>
        </>
      )}
    </>
  );
};

export default Backoffice;
