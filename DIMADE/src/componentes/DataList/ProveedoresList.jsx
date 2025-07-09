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
import BASE_URL from "../../config/apiConfig";

// Se mantiene la función helper para validación
const isValidEmail = (correo) => /\S+@\S+\.\S+/.test(correo);

const ProveedoresList = () => {
  const [proveedores, setProveedores] = useState([]);
  const [search, setSearch] = useState("");
  const [estadoFiltro, setEstadoFiltro] = useState("todos");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedProveedor, setSelectedProveedor] = useState(null);
  const [modalMode, setModalMode] = useState("view");
  const [openModal, setOpenModal] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    fetchProveedores();
  }, []);

  const fetchProveedores = async () => {
    try {
      const token = localStorage.getItem("jwtToken");

      const res = await fetch(`${BASE_URL}/api/proveedores`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },

      });
      if (!res.ok) {
        console.error(
          "Respuesta no exitosa de la API:",
          res.status,
          res.statusText
        );
        setProveedores([]);
        return;
      }
      const data = await res.json();
      setProveedores(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error cargando proveedores:", err);
      setProveedores([]);
    }
  };

  const filteredProveedores = useMemo(() => {
    return proveedores.filter((p) => {
      const matchSearch = Object.values(p).some((val) =>
        String(val).toLowerCase().includes(search.toLowerCase())
      );
      const matchEstado =
        estadoFiltro === "todos" ||
        (estadoFiltro === "activo" && p.activo) ||
        (estadoFiltro === "inactivo" && !p.activo);
      return matchSearch && matchEstado;
    });
  }, [proveedores, search, estadoFiltro]);

  const paginatedProveedores = useMemo(() => {
    const start = page * rowsPerPage;
    return filteredProveedores.slice(start, start + rowsPerPage);
  }, [filteredProveedores, page, rowsPerPage]);

  const handleDelete = async (id) => {
    if (!window.confirm("¿Eliminar proveedor?")) return;
    try {
      const token = localStorage.getItem("jwtToken");
      const res = await fetch(`${BASE_URL}/api/proveedores/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        setProveedores((prev) => prev.filter((p) => p.id !== id));
      }
    } catch (err) {
      console.error("Error al eliminar proveedor:", err);
    }
  };

  const handleSave = async () => {
    if (!selectedProveedor.nombre || !selectedProveedor.correo) {
      alert("Por favor completa el nombre y el correo.");
      return;
    }
    if (!isValidEmail(selectedProveedor.correo)) {
      alert("El correo ingresado no es válido.");
      return;
    }

    try {
      const token = localStorage.getItem("jwtToken");
      const url =
        modalMode === "new"
          ? `${BASE_URL}/api/proveedores`
          : `${BASE_URL}/api/proveedores/${selectedProveedor.id}`;
      const method = modalMode === "new" ? "POST" : "PUT";
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(selectedProveedor),
      });
      if (res.ok) {
        await fetchProveedores();
        setOpenModal(false);
        setSelectedProveedor(null);
      }
    } catch (err) {
      console.error("Error al guardar proveedor:", err);
    }
  };

  const handleToggleActivo = async (proveedor) => {
    try {
      const token = localStorage.getItem("jwtToken");
      const updated = { ...proveedor, activo: !proveedor.activo };
      const res = await fetch(`${BASE_URL}/api/proveedores/${proveedor.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updated),
      });
      if (res.ok) {
        setProveedores((prev) =>
          prev.map((p) => (p.id === proveedor.id ? updated : p))
        );
      }
    } catch (err) {
      console.error("Error al cambiar estado activo:", err);
    }
  };

  const handleOpenModal = (proveedor, mode) => {
    if (mode === "new") {
      setSelectedProveedor({
        nombre: "",
        rut: "",
        correo: "",
        telefono: "",
        giro: "",
        direccion: "",
        activo: true,
      });
    } else {
      setSelectedProveedor(proveedor);
    }
    setModalMode(mode);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedProveedor(null);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setSelectedProveedor((prev) => ({
      ...prev,
      [name]: name === "activo" ? value === "true" : value,
    }));
  };

  const renderActions = (proveedor) => (
    <Box sx={{ display: "flex", justifyContent: "flex-end", flexWrap: "wrap" }}>
      <Tooltip title="Ver">
        <IconButton onClick={() => handleOpenModal(proveedor, "view")}>
          <VisibilityIcon sx={{ color: "#1976d2" }} />
        </IconButton>
      </Tooltip>
      <Tooltip title="Editar">
        <IconButton onClick={() => handleOpenModal(proveedor, "edit")}>
          <EditIcon sx={{ color: "#f57c00" }} />
        </IconButton>
      </Tooltip>
      <Tooltip title="Eliminar">
        <IconButton onClick={() => handleDelete(proveedor.id)}>
          <DeleteIcon sx={{ color: "#d32f2f" }} />
        </IconButton>
      </Tooltip>
      {"activo" in proveedor && (
        <Tooltip title={proveedor.activo ? "Desactivar" : "Activar"}>
          <IconButton onClick={() => handleToggleActivo(proveedor)}>
            {proveedor.activo ? (
              <ToggleOnIcon sx={{ color: "#2e7d32" }} />
            ) : (
              <ToggleOffIcon sx={{ color: "#616161" }} />
            )}
          </IconButton>
        </Tooltip>
      )}
    </Box>
  );

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

  return (
    <Box>
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
          Lista de Proveedores
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
          {paginatedProveedores.map((p, index) => (
            <Paper
              key={p.id}
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
                    {p.nombre}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {p.rut}
                  </Typography>
                </Box>
                <Chip
                  label={p.activo ? "Activo" : "Inactivo"}
                  color={p.activo ? "success" : "default"}
                  size="small"
                />
              </Box>
              <Typography variant="body2">{p.giro}</Typography>
              <Typography variant="caption" color="text.secondary">
                {p.correo}
              </Typography>
              <Box sx={{ mt: 1, display: "flex", justifyContent: "flex-end" }}>
                {renderActions(p)}
              </Box>
            </Paper>
          ))}
        </Box>
      ) : (
        <Paper>
          <Table>
            <TableHead>
              <TableRow>
                {proveedores[0] &&
                  Object.keys(proveedores[0])
                    .filter((k) => k !== "direccion")
                    .map((key) => (
                      <TableCell key={key} sx={{ textTransform: "capitalize" }}>
                        {key}
                      </TableCell>
                    ))}
                <TableCell align="right">Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedProveedores.map((proveedor) => (
                <TableRow
                  key={proveedor.id}
                  sx={{
                    "&:nth-of-type(even)": {
                      backgroundColor: theme.palette.action.hover,
                    },
                  }}
                >
                  {Object.entries(proveedor)
                    .filter(([k]) => k !== "direccion")
                    .map(([k, v]) => (
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
                  <TableCell align="right">
                    {renderActions(proveedor)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      )}

      <TablePagination
        component="div"
        count={filteredProveedores.length}
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
              ? "Ver Proveedor"
              : modalMode === "edit"
              ? "Editar Proveedor"
              : "Nuevo Proveedor"}
          </Typography>
          {selectedProveedor && (
            <>
              <TextField
                label="Nombre"
                name="nombre"
                fullWidth
                margin="dense"
                value={selectedProveedor.nombre}
                onChange={handleEditChange}
                InputProps={{ readOnly: modalMode === "view" }}
              />
              <TextField
                label="RUT"
                name="rut"
                fullWidth
                margin="dense"
                value={selectedProveedor.rut}
                onChange={handleEditChange}
                InputProps={{ readOnly: modalMode === "view" }}
              />
              <TextField
                label="Correo electrónico"
                name="correo"
                type="email"
                fullWidth
                margin="dense"
                value={selectedProveedor.correo}
                onChange={handleEditChange}
                InputProps={{ readOnly: modalMode === "view" }}
              />
              <TextField
                label="Teléfono"
                name="telefono"
                fullWidth
                margin="dense"
                value={selectedProveedor.telefono}
                onChange={handleEditChange}
                InputProps={{ readOnly: modalMode === "view" }}
              />
              <TextField
                label="Giro"
                name="giro"
                fullWidth
                margin="dense"
                value={selectedProveedor.giro}
                onChange={handleEditChange}
                InputProps={{ readOnly: modalMode === "view" }}
              />
              <TextField
                label="Dirección"
                name="direccion"
                fullWidth
                margin="dense"
                value={selectedProveedor.direccion}
                onChange={handleEditChange}
                InputProps={{ readOnly: modalMode === "view" }}
              />
              <TextField
                select
                label="Estado"
                name="activo"
                fullWidth
                margin="dense"
                value={String(selectedProveedor.activo)}
                onChange={handleEditChange}
                InputProps={{ readOnly: modalMode === "view" }}
              >
                <MenuItem value="true">Activo</MenuItem>
                <MenuItem value="false">Inactivo</MenuItem>
              </TextField>
            </>
          )}
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

export default ProveedoresList;
