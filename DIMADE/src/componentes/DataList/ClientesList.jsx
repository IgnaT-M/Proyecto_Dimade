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
  Chip,
  useMediaQuery,
  useTheme,
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
  const [modalMode, setModalMode] = useState("view");
  const [openModal, setOpenModal] = useState(false); // La variable está aquí
  const [estadoFiltro, setEstadoFiltro] = useState("todos");

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    fetchClientes();
  }, []);

  const fetchClientes = async () => {
    try {
      const token = localStorage.getItem("jwtToken");
      const res = await fetch(`${BASE_URL}/api/clientes`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      // SOLUCIÓN PARCIAL AL ERROR JSON: Manejar respuestas no exitosas
      if (!res.ok) {
        // Si la respuesta no es 2xx, no intentes parsear JSON.
        console.error(
          "Respuesta no exitosa de la API:",
          res.status,
          res.statusText
        );
        setClientes([]); // Poner un array vacío para que la UI no se rompa
        return;
      }
      const data = await res.json();
      setClientes(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error cargando clientes:", err);
      setClientes([]); // En caso de error de red o parseo, limpiar los datos.
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
    // CORRECCIÓN PARA EL WARNING: Asegurar que todos los campos tienen un valor inicial
    const initialData = {
      id: null,
      rut: "",
      nombre: "",
      direccion: "",
      correo: "",
      empresa: "",
      rutEmpresa: "",
      telefono: "",
      activo: true,
    };
    setSelectedCliente(mode === "new" ? initialData : cliente);
    setModalMode(mode);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setSelectedCliente(null);
    setOpenModal(false);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    // CORRECCIÓN PARA EL WARNING: Manejar explícitamente el booleano
    const isBoolean = name === "activo";
    setSelectedCliente((prev) => ({
      ...prev,
      [name]: isBoolean ? value === "true" : value,
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

  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: { xs: "90%", md: 500 },
    bgcolor: "background.paper",
    p: 4,
    borderRadius: 2,
    boxShadow: 24,
    maxHeight: "90vh",
    overflowY: "auto",
  };

  const renderActions = (cliente) => (
    <Box sx={{ display: "flex", justifyContent: "flex-end", flexWrap: "wrap" }}>
      <Tooltip title="Ver">
        <IconButton onClick={() => handleOpenModal(cliente, "view")}>
          <VisibilityIcon sx={{ color: "#1976d2" }} />
        </IconButton>
      </Tooltip>
      <Tooltip title="Editar">
        <IconButton onClick={() => handleOpenModal(cliente, "edit")}>
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
    </Box>
  );

  return (
    <Box>
      {/* El resto del JSX es idéntico al que te pasé antes, la lógica de presentación responsiva está correcta. */}
      {/* ... (Cabecera, Lógica de Tabla vs Tarjetas, Paginación, etc.) ... */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          mb: 2,
          flexDirection: { xs: "column", md: "row" },
          gap: 2,
        }}
      >
        <Typography variant="h5" fontWeight="bold">
          Lista de Clientes
        </Typography>
        <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
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
            sx={{ minWidth: 120 }}
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

      {isMobile ? (
        <Box>
          {paginatedClientes.map((cliente, index) => (
            <Paper
              key={cliente.id}
              sx={{
                p: 2,
                mb: 2,
                backgroundColor:
                  index % 2 !== 0 ? theme.palette.action.hover : "inherit",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  mb: 1,
                }}
              >
                <Box>
                  <Typography variant="subtitle1" fontWeight="bold">
                    {cliente.nombre}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {cliente.rut}
                  </Typography>
                </Box>
                <Chip
                  label={cliente.activo ? "Activo" : "Inactivo"}
                  color={cliente.activo ? "success" : "default"}
                  size="small"
                />
              </Box>
              <Typography variant="body2">{cliente.empresa}</Typography>
              <Typography variant="caption" color="text.secondary">
                {cliente.correo}
              </Typography>
              <Box sx={{ mt: 1, display: "flex", justifyContent: "flex-end" }}>
                {renderActions(cliente)}
              </Box>
            </Paper>
          ))}
        </Box>
      ) : (
        <Paper>
          <Table>
            <TableHead>
              <TableRow>
                {clientes[0] &&
                  Object.keys(clientes[0]).map((key) => (
                    <TableCell key={key} sx={{ textTransform: "capitalize" }}>
                      {key}
                    </TableCell>
                  ))}
                <TableCell align="right">Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedClientes.map((cliente) => (
                <TableRow
                  key={cliente.id}
                  sx={{
                    "&:nth-of-type(even)": {
                      backgroundColor: theme.palette.action.hover,
                    },
                  }}
                >
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
                  <TableCell align="right">{renderActions(cliente)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      )}

      <TablePagination
        component="div"
        count={filteredClientes.length}
        page={page}
        onPageChange={(_, newPage) => setPage(newPage)}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={(e) =>
          setRowsPerPage(parseInt(e.target.value, 10))
        }
      />

      <Modal open={openModal} onClose={handleCloseModal}>
        <Box sx={modalStyle}>
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
            onChange={handleEditChange}
            InputProps={{ readOnly: modalMode === "view" }}
          />
          <TextField
            label="Nombre"
            name="nombre"
            fullWidth
            margin="dense"
            value={selectedCliente?.nombre || ""}
            onChange={handleEditChange}
            InputProps={{ readOnly: modalMode === "view" }}
          />
          <TextField
            label="Dirección"
            name="direccion"
            fullWidth
            margin="dense"
            value={selectedCliente?.direccion || ""}
            onChange={handleEditChange}
            InputProps={{ readOnly: modalMode === "view" }}
          />
          <TextField
            label="Teléfono"
            name="telefono"
            fullWidth
            margin="dense"
            value={selectedCliente?.telefono || ""}
            onChange={handleEditChange}
            InputProps={{ readOnly: modalMode === "view" }}
          />
          <TextField
            label="Correo"
            name="correo"
            fullWidth
            margin="dense"
            value={selectedCliente?.correo || ""}
            onChange={handleEditChange}
            InputProps={{ readOnly: modalMode === "view" }}
          />
          <TextField
            label="Empresa"
            name="empresa"
            fullWidth
            margin="dense"
            value={selectedCliente?.empresa || ""}
            onChange={handleEditChange}
            InputProps={{ readOnly: modalMode === "view" }}
          />
          <TextField
            label="RUT Empresa"
            name="rutEmpresa"
            fullWidth
            margin="dense"
            value={selectedCliente?.rutEmpresa || ""}
            onChange={handleEditChange}
            InputProps={{ readOnly: modalMode === "view" }}
          />
          <TextField
            select
            label="Estado"
            name="activo"
            fullWidth
            margin="dense"
            value={selectedCliente?.activo ?? true}
            onChange={handleEditChange}
            InputProps={{ readOnly: modalMode === "view" }}
          >
            <MenuItem value={true}>Activo</MenuItem>
            <MenuItem value={false}>Inactivo</MenuItem>
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
