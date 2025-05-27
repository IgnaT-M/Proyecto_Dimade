import React, { useState } from "react";
import SideMenu from "../../componentes/Sidemenu";
import DataList from "../../componentes/DataList";
import AddItemModal from "../../componentes/AddItemModal";
import { Box } from "@mui/material";
import Topbar from "../../componentes/Topbar"; // importamos Topbar desde Toolbar (puedes renombrar el archivo luego si quieres)

const Backoffice = () => {
  const [selectedSection, setSelectedSection] = useState("clientes");
  const [openModal, setOpenModal] = useState(false);

  const usuarioLogeado = {
    nombre: "Administrador",
    email: "admin@mail.com",
  };

  const handleLogout = () => {
    console.log("Cerrar sesión");
    // Aquí podrías limpiar sesión y redirigir
  };

  const [data, setData] = useState({
    clientes: [
      {
        id: 1,
        nombre: "Juan",
        empresa: "ACME S.A.",
        email: "juan@acme.com",
        activo: true,
      },
      {
        id: 2,
        nombre: "Ana",
        empresa: "Beta Ltda.",
        email: "ana@beta.com",
        activo: false,
      },
    ],
    usuarios: [
      {
        id: 1,
        nombre: "Admin",
        rol: "Administrador",
        email: "admin@mail.com",
        activo: true,
      },
      {
        id: 2,
        nombre: "Usuario",
        rol: "Vendedor",
        email: "user@mail.com",
        activo: true,
      },
    ],
    proveedores: [
      {
        id: 1,
        nombre: "Sodimac",
        contacto: "sodimac@mail.com",
        telefono: "123456",
        activo: true,
      },
    ],
    ordenes1: [
      {
        id: 101,
        cliente: "ACME S.A.",
        fecha: "2024-05-01",
        total: "$100.000",
        activo: true,
      },
    ],
    ordenes2: [
      {
        id: 101,
        cliente: "ACME S.A.",
        fecha: "2024-05-01",
        total: "$100.000",
        activo: true,
      },
    ],
  });

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
      [selectedSection]: [...prev[selectedSection], newItem],
    }));
  };

  const renderSection = () => {
    switch (selectedSection) {
      case "clientes":
      case "usuarios":
      case "proveedores":
      case "ordenes1":
      case "ordenes2":
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
              title={`Lista de ${selectedSection}`}
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
      case "inicio":
      default:
        return <Box p={4}>Bienvenido al Panel de Administración</Box>;
    }
  };

  return (
    <>
      <Topbar usuario={usuarioLogeado} onLogout={handleLogout} />
      <Box sx={{ display: "flex", pt: 8 }}>
        <SideMenu onSelect={setSelectedSection} />
        <Box sx={{ flexGrow: 1, p: 4 }}>{renderSection()}</Box>
      </Box>
    </>
  );
};

export default Backoffice;
