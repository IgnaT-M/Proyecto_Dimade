import React, { useEffect, useState, useMemo } from "react";
import {
  Box,
  Typography,
  IconButton,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TextField,
  InputAdornment,
  TablePagination,
  Tooltip,
  Modal,
  Button,
  MenuItem,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ToggleOnIcon from "@mui/icons-material/ToggleOn";
import ToggleOffIcon from "@mui/icons-material/ToggleOff";
import AddIcon from "@mui/icons-material/Add";
import { Chip } from "@mui/material";
import BASE_URL from "../../config/apiConfig";

const ClientesList = () => {
  const [clientes, setClientes] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedCliente, setSelectedCliente] = useState(null);
  const [modalMode, setModalMode] = useState("view"); // "view" | "edit" | "new"
  const [openModal, setOpenModal] = useState(false);
  const [estadoFiltro, setEstadoFiltro] = useState("todos");

  useEffect(() => {
    fetchClientes();
  }, []);

  const fetchClientes = async () => {
    try {
      const token = localStorage.getItem("jwtToken");
      const res = await fetch(`${BASE_URL}/api/clientes`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setClientes(data);
    } catch (err) {
      console.error("Error cargando clientes:", err);
    }
  };

  const filteredClientes = useMemo(() => {
    return clientes.filter((cliente) => {
      const matchSearch = Object.values(cliente).some((val) =>
        String(val).toLowerCase().includes(search.toLowerCase())
      );
      const matchEstado =
        estadoFiltro === "todos" ||
        (estadoFiltro === "activo" && cliente.activo) ||
        (estadoFiltro === "inactivo" && !cliente.activo);

      return matchSearch && matchEstado;
    });
  }, [clientes, search, estadoFiltro]);

  const paginatedClientes = useMemo(() => {
    const start = page * rowsPerPage;
    return filteredClientes.slice(start, start + rowsPerPage);
  }, [filteredClientes, page, rowsPerPage]);

  const handleDelete = async (id) => {
    if (!window.confirm("¿Eliminar cliente?")) return;
    try {
      const token = localStorage.getItem("jwtToken");
      const res = await fetch(`${BASE_URL}/api/clientes/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        setClientes((prev) => prev.filter((c) => c.id !== id));
      }
    } catch (err) {
      console.error("Error al eliminar cliente:", err);
    }
  };

  const handleToggleActivo = async (cliente) => {
    try {
      const token = localStorage.getItem("jwtToken");
      const updated = { ...cliente, activo: !cliente.activo };
      const res = await fetch(`${BASE_URL}/api/clientes/${cliente.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updated),
      });
      if (res.ok) {
        setClientes((prev) =>
          prev.map((c) => (c.id === cliente.id ? updated : c))
        );
      }
    } catch (err) {
      console.error("Error al cambiar estado activo:", err);
    }
  };

  const handleOpenModal = (cliente, mode) => {
    if (mode === "new") {
      setSelectedCliente({
        rut: "",
        nombre: "",
        direccion: "",
        correo: "",
        empresa: "",
        rutEmpresa: "",
        telefono: "",
        activo: true,
      });
    } else {
      setSelectedCliente(cliente);
    }
    setModalMode(mode);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setSelectedCliente(null);
    setOpenModal(false);
  };

  const handleEditChange = (e) => {
    setSelectedCliente((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("jwtToken");
      const url =
        modalMode === "new"
          ? `${BASE_URL}/api/clientes`
          : `${BASE_URL}/api/clientes/${selectedCliente.id}`;
      const method = modalMode === "new" ? "POST" : "PUT";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(selectedCliente),
      });

      if (res.ok) {
        await fetchClientes();
        handleCloseModal();
      }
    } catch (err) {
      console.error("Error al guardar cliente:", err);
    }
  };

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <Typography variant="h5" fontWeight="bold">
          Lista de Clientes
        </Typography>
        <Box sx={{ display: "flex", gap: 1 }}>
          <TextField
            size="small"
            placeholder="Buscar..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            select
            size="small"
            label="Estado"
            value={estadoFiltro}
            onChange={(e) => setEstadoFiltro(e.target.value)}
          >
            <MenuItem value="todos">Todos</MenuItem>
            <MenuItem value="activo">Activo</MenuItem>
            <MenuItem value="inactivo">Inactivo</MenuItem>
          </TextField>

          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => handleOpenModal(null, "new")}
          >
            Agregar
          </Button>
        </Box>
      </Box>

      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              {paginatedClientes[0] &&
                Object.keys(paginatedClientes[0]).map((key) => (
                  <TableCell key={key}>{key}</TableCell>
                ))}
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedClientes.map((cliente) => (
              <TableRow key={cliente.id}>
                {Object.entries(cliente).map(([k, v]) => (
                  <TableCell key={k}>
                    {k === "activo" ? (
                      <Chip
                        label={v ? "Activo" : "Inactivo"}
                        color={v ? "success" : "default"}
                        size="small"
                      />
                    ) : (
                      String(v)
                    )}
                  </TableCell>
                ))}

                <TableCell>
                  <Tooltip title="Ver">
                    <IconButton
                      onClick={() => handleOpenModal(cliente, "view")}
                    >
                      <VisibilityIcon sx={{ color: "#1976d2" }} />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Editar">
                    <IconButton
                      onClick={() => handleOpenModal(cliente, "edit")}
                    >
                      <EditIcon sx={{ color: "#f57c00" }} />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Eliminar">
                    <IconButton onClick={() => handleDelete(cliente.id)}>
                      <DeleteIcon sx={{ color: "#d32f2f" }} />
                    </IconButton>
                  </Tooltip>
                  {"activo" in cliente && (
                    <Tooltip title={cliente.activo ? "Desactivar" : "Activar"}>
                      <IconButton onClick={() => handleToggleActivo(cliente)}>
                        {cliente.activo ? (
                          <ToggleOnIcon sx={{ color: "#2e7d32" }} />
                        ) : (
                          <ToggleOffIcon sx={{ color: "#616161" }} />
                        )}
                      </IconButton>
                    </Tooltip>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <TablePagination
          component="div"
          count={filteredClientes.length}
          page={page}
          onPageChange={(_, newPage) => setPage(newPage)}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={(e) =>
            setRowsPerPage(parseInt(e.target.value, 10))
          }
          rowsPerPageOptions={[10, 20, 50]}
          labelRowsPerPage="Filas por página:"
        />
      </Paper>

      <Modal open={openModal} onClose={handleCloseModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            p: 4,
            borderRadius: 2,
            boxShadow: 24,
          }}
        >
          <Typography variant="h6" mb={2}>
            {modalMode === "view"
              ? "Ver Cliente"
              : modalMode === "edit"
              ? "Editar Cliente"
              : "Nuevo Cliente"}
          </Typography>

          <TextField
            label="RUT"
            name="rut"
            fullWidth
            margin="dense"
            value={selectedCliente?.rut || ""}
            onChange={modalMode === "view" ? undefined : handleEditChange}
            InputProps={{ readOnly: modalMode === "view" }}
          />
          <TextField
            label="Nombre"
            name="nombre"
            fullWidth
            margin="dense"
            value={selectedCliente?.nombre || ""}
            onChange={modalMode === "view" ? undefined : handleEditChange}
            InputProps={{ readOnly: modalMode === "view" }}
          />
          <TextField
            label="Dirección"
            name="direccion"
            fullWidth
            margin="dense"
            value={selectedCliente?.direccion || ""}
            onChange={modalMode === "view" ? undefined : handleEditChange}
            InputProps={{ readOnly: modalMode === "view" }}
          />
          <TextField
            label="Teléfono"
            name="telefono"
            fullWidth
            margin="dense"
            value={selectedCliente?.telefono || ""}
            onChange={modalMode === "view" ? undefined : handleEditChange}
            InputProps={{ readOnly: modalMode === "view" }}
          />
          <TextField
            label="Correo"
            name="correo"
            fullWidth
            margin="dense"
            value={selectedCliente?.correo || ""}
            onChange={modalMode === "view" ? undefined : handleEditChange}
            InputProps={{ readOnly: modalMode === "view" }}
          />
          <TextField
            label="Empresa"
            name="empresa"
            fullWidth
            margin="dense"
            value={selectedCliente?.empresa || ""}
            onChange={modalMode === "view" ? undefined : handleEditChange}
            InputProps={{ readOnly: modalMode === "view" }}
          />
          <TextField
            label="RUT Empresa"
            name="rutEmpresa"
            fullWidth
            margin="dense"
            value={selectedCliente?.rutEmpresa || ""}
            onChange={modalMode === "view" ? undefined : handleEditChange}
            InputProps={{ readOnly: modalMode === "view" }}
          />

          <TextField
            select
            label="Estado"
            name="activo"
            fullWidth
            margin="dense"
            value={
              selectedCliente?.activo !== undefined
                ? selectedCliente.activo
                : true
            }
            onChange={
              modalMode === "view"
                ? undefined
                : (e) =>
                    setSelectedCliente((prev) => ({
                      ...prev,
                      activo: e.target.value === "true",
                    }))
            }
            InputProps={{ readOnly: modalMode === "view" }}
          >
            <MenuItem value={"true"}>Activo</MenuItem>
            <MenuItem value={"false"}>Inactivo</MenuItem>
          </TextField>

          {modalMode !== "view" && (
            <Box sx={{ mt: 2, textAlign: "right" }}>
              <Button variant="contained" onClick={handleSave}>
                Guardar
              </Button>
            </Box>
          )}
        </Box>
      </Modal>
    </Box>
  );
};

export default ClientesList;
