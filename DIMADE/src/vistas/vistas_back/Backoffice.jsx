import React, { useState, useEffect } from "react";
import SideMenu from "../../componentes/Sidemenu";
import DataList from "../../componentes/DataList";
import AddItemModal from "../../componentes/AddItemModal";
import { Box } from "@mui/material";
import Topbar from "../../componentes/Topbar";

const sectionTitles = {
  clientes: "Clientes",
  usuarios: "Usuarios",
  proveedores: "Proveedores",
  OrdenesCompra: "Órdenes de Compra",
  SolicitudesCotizacion: "Solicitudes de Cotización",
  SolicitudesContacto: "Solicitudes de Contacto",
};

const Backoffice = () => {
  const [selectedSection, setSelectedSection] = useState("clientes");
  const [openModal, setOpenModal] = useState(false);
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  const usuarioLogeado = {
    nombre: "Administrador",
    email: "admin@mail.com",
  };

  const handleLogout = () => {
    console.log("Cerrar sesión");
    localStorage.removeItem("jwtToken");
    window.location.href = "/";
  };

  useEffect(() => {
    fetchData(selectedSection);
  }, [selectedSection]);

  const fetchData = async (section) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("jwtToken");
      let endpoint = "";

      switch (section) {
        case "clientes":
          endpoint = "/api/clientes";
          break;
        case "usuarios":
          endpoint = "/api/usuarios";
          break;
        case "proveedores":
          endpoint = "/api/proveedores";
          break;
        case "OrdenesCompra":
          endpoint = "/api/ordenes";
          break;
        case "SolicitudesCotizacion":
          endpoint = "/api/solicitudes-cotizacion";
          break;
        case "SolicitudesContacto":
          endpoint = "/api/solicitudes-contacto";
          break;
        default:
          setData((prev) => ({ ...prev, [section]: [] }));
          setLoading(false);
          return;
      }

      const response = await fetch(`http://localhost:8080${endpoint}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error("Error al cargar datos");

      const result = await response.json();
      setData((prev) => ({ ...prev, [section]: result }));
    } catch (err) {
      console.error("Error cargando sección", section, err);
      setData((prev) => ({ ...prev, [section]: [] }));
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (item) => console.log("Editar", item);
  const handleDelete = (item) => {
    setData((prev) => ({
      ...prev,
      [selectedSection]: prev[selectedSection].filter((i) => i.id !== item.id),
    }));
  };
  const handleToggle = (item) => {
    setData((prev) => ({
      ...prev,
      [selectedSection]: prev[selectedSection].map((i) =>
        i.id === item.id ? { ...i, activo: !i.activo } : i
      ),
    }));
  };
  const handleView = (item) => console.log("Detalles", item);

  const handleAdd = () => setOpenModal(true);

  const handleSaveNewItem = (newItem) => {
    setData((prev) => ({
      ...prev,
      [selectedSection]: [...(prev[selectedSection] || []), newItem],
    }));
  };

  const renderSection = () => {
    if (!data[selectedSection]) return null;

    const sectionData = data[selectedSection];
    const fields =
      sectionData.length > 0
        ? Object.keys(sectionData[0]).filter(
            (k) => k !== "id" && k !== "activo"
          )
        : [];

    return (
      <>
        <DataList
          title={`Lista de ${
            sectionTitles[selectedSection] || selectedSection
          }`}
          data={sectionData}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onToggle={handleToggle}
          onView={handleView}
          onAdd={handleAdd}
        />
        <AddItemModal
          open={openModal}
          onClose={() => setOpenModal(false)}
          onSave={handleSaveNewItem}
          fields={fields}
        />
      </>
    );
  };

  return (
    <>
      <Topbar usuario={usuarioLogeado} onLogout={handleLogout} />
      <Box sx={{ display: "flex", pt: 8 }}>
        <SideMenu onSelect={setSelectedSection} />
        <Box sx={{ flexGrow: 1, p: 4 }}>
          {loading ? "Cargando..." : renderSection()}
        </Box>
      </Box>
    </>
  );
};

export default Backoffice;
