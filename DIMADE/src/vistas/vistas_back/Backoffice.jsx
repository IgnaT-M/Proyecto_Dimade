import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import { jwtDecode } from "jwt-decode";

import PanelAdministracion from "../../componentes/PanelNavegacion.jsx";
import ClientesList from "../../componentes/DataList/ClientesList";
import UsuariosList from "../../componentes/DataList/UsuariosList";
import ProveedoresList from "../../componentes/DataList/ProveedoresList";
import CotizacionesList from "../../componentes/DataList/CotizacionesList";
import ContactoList from "../../componentes/DataList/ContactoList";
import RegistrosList from "../../componentes/DataList/RegistrosList";
import OrdenCompraList from "../../componentes/DataList/OrdenCompraList.jsx";

const Backoffice = () => {
  const [selectedSection, setSelectedSection] = useState("clientes");
  const [usuarioLogeado, setUsuarioLogeado] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    if (!token) {
      navigate("/");
      return;
    }
    try {
      const decoded = jwtDecode(token);
      const rol = decoded.rol;

      if (rol !== "ROLE_ADMIN" && rol !== "ROLE_OPERADOR") {
        navigate("/");
        return;
      }
      setUsuarioLogeado({
        nombre: decoded.sub,
        email: decoded.sub,
        rol: rol,
      });
    } catch (error) {
      console.error("Token inválido:", error);
      navigate("/");
    }
  }, [navigate]);

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
      case "solicitudesCotizacion":
        return <CotizacionesList />;
      case "solicitudesContacto":
        return <ContactoList />;
      case "registrosFinancieros":
        return <RegistrosList />;
      case "ordenesCompra":
        return <OrdenCompraList />;
      default:
        return <Box>No hay datos disponibles.</Box>;
    }
  };

  return (
    <>
      {usuarioLogeado && (
        <PanelAdministracion
          usuario={usuarioLogeado}
          onLogout={handleLogout}
          selected={selectedSection}
          onSelect={setSelectedSection}
        >
          {renderSection()}
        </PanelAdministracion>
      )}
    </>
  );
};

export default Backoffice;
