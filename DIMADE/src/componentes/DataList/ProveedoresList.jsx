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
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ToggleOnIcon from "@mui/icons-material/ToggleOn";
import ToggleOffIcon from "@mui/icons-material/ToggleOff";
import AddIcon from "@mui/icons-material/Add";

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

  useEffect(() => {
    fetchProveedores();
  }, []);

  const fetchProveedores = async () => {
    try {
      const token = localStorage.getItem("jwtToken");
      const res = await fetch("http://localhost:8080/api/proveedores", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setProveedores(data);
    } catch (err) {
      console.error("Error cargando proveedores:", err);
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
      const res = await fetch(`http://localhost:8080/api/proveedores/${id}`, {
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
          ? "http://localhost:8080/api/proveedores"
          : `http://localhost:8080/api/proveedores/${selectedProveedor.id}`;
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
      }
    } catch (err) {
      console.error("Error al guardar proveedor:", err);
    }
  };

  const handleToggleActivo = async (proveedor) => {
    try {
      const token = localStorage.getItem("jwtToken");
      const updated = { ...proveedor, activo: !proveedor.activo };
      const res = await fetch(
        `http://localhost:8080/api/proveedores/${proveedor.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updated),
        }
      );
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

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setSelectedProveedor((prev) => ({
      ...prev,
      [name]: name === "activo" ? value === "true" : value,
    }));
  };

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
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
              {Object.keys(paginatedProveedores[0] || {})
                .filter((key) => key !== "direccion")
                .map((key) => (
                  <TableCell key={key}>{key}</TableCell>
                ))}
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedProveedores.map((proveedor) => (
              <TableRow key={proveedor.id}>
                {Object.entries(proveedor).map(([k, v]) => {
                  if (k === "direccion") return null;
                  return (
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
                  );
                })}
                <TableCell>
                  <Tooltip title="Ver">
                    <IconButton
                      onClick={() => handleOpenModal(proveedor, "view")}
                    >
                      <VisibilityIcon sx={{ color: "#1976d2" }} />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Editar">
                    <IconButton
                      onClick={() => handleOpenModal(proveedor, "edit")}
                    >
                      <EditIcon sx={{ color: "#f57c00" }} />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Eliminar">
                    <IconButton onClick={() => handleDelete(proveedor.id)}>
                      <DeleteIcon sx={{ color: "#d32f2f" }} />
                    </IconButton>
                  </Tooltip>
                  {"activo" in proveedor && (
                    <Tooltip
                      title={proveedor.activo ? "Desactivar" : "Activar"}
                    >
                      <IconButton onClick={() => handleToggleActivo(proveedor)}>
                        {proveedor.activo ? (
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
          count={filteredProveedores.length}
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

      <Modal open={openModal} onClose={() => setOpenModal(false)}>
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
                onChange={modalMode === "view" ? undefined : handleEditChange}
                InputProps={{ readOnly: modalMode === "view" }}
              />
              <TextField
                label="RUT"
                name="rut"
                fullWidth
                margin="dense"
                value={selectedProveedor.rut}
                onChange={modalMode === "view" ? undefined : handleEditChange}
                InputProps={{ readOnly: modalMode === "view" }}
              />
              <TextField
                label="Correo electrónico"
                name="correo"
                type="email"
                fullWidth
                margin="dense"
                value={selectedProveedor.correo}
                onChange={modalMode === "view" ? undefined : handleEditChange}
                InputProps={{ readOnly: modalMode === "view" }}
              />
              <TextField
                label="Teléfono"
                name="telefono"
                fullWidth
                margin="dense"
                value={selectedProveedor.telefono}
                onChange={modalMode === "view" ? undefined : handleEditChange}
                InputProps={{ readOnly: modalMode === "view" }}
              />
              <TextField
                label="Giro"
                name="giro"
                fullWidth
                margin="dense"
                value={selectedProveedor.giro}
                onChange={modalMode === "view" ? undefined : handleEditChange}
                InputProps={{ readOnly: modalMode === "view" }}
              />
              <TextField
                label="Dirección"
                name="direccion"
                fullWidth
                margin="dense"
                value={selectedProveedor.direccion}
                onChange={modalMode === "view" ? undefined : handleEditChange}
                InputProps={{ readOnly: modalMode === "view" }}
              />
              <TextField
                select
                label="Estado"
                name="activo"
                fullWidth
                margin="dense"
                value={selectedProveedor.activo.toString()}
                onChange={modalMode === "view" ? undefined : handleEditChange}
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
