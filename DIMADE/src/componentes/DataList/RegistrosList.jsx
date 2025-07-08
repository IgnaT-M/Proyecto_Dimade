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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Snackbar,
  Alert,
  Chip,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ToggleOnIcon from "@mui/icons-material/ToggleOn";
import ToggleOffIcon from "@mui/icons-material/ToggleOff";
import AddIcon from "@mui/icons-material/Add";
import BASE_URL from "../../config/apiConfig";

const RegistrosList = () => {
  const [registros, setRegistros] = useState([]);
  const [search, setSearch] = useState("");
  const [tipoFiltro, setTipoFiltro] = useState("");
  const [fechaOrden, setFechaOrden] = useState("desc");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [modalRegistro, setModalRegistro] = useState({
    open: false,
    datos: null,
  });
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [modalMode, setModalMode] = useState("view");

  const fetchRegistros = async () => {
    try {
      const token = localStorage.getItem("jwtToken");
      const res = await fetch(`${BASE_URL}/api/registros-financieros`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setRegistros(data);
    } catch (err) {
      console.error("Error cargando registros:", err);
    }
  };

  useEffect(() => {
    fetchRegistros();
  }, []);

  const filteredRegistros = useMemo(() => {
    return registros
      .filter((r) =>
        Object.values(r).some((val) =>
          String(val).toLowerCase().includes(search.toLowerCase())
        )
      )
      .filter((r) =>
        tipoFiltro ? r.tipo?.toLowerCase() === tipoFiltro.toLowerCase() : true
      )
      .sort((a, b) => {
        const fechaA = new Date(a.fecha);
        const fechaB = new Date(b.fecha);
        return fechaOrden === "asc" ? fechaA - fechaB : fechaB - fechaA;
      });
  }, [registros, search, tipoFiltro, fechaOrden]);

  const paginatedRegistros = useMemo(() => {
    const start = page * rowsPerPage;
    return filteredRegistros.slice(start, start + rowsPerPage);
  }, [filteredRegistros, page, rowsPerPage]);

  const handleDelete = async (id) => {
    if (!window.confirm("¿Eliminar registro financiero?")) return;
    try {
      const token = localStorage.getItem("jwtToken");
      const res = await fetch(`${BASE_URL}/api/registros-financieros/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        setRegistros((prev) => prev.filter((r) => r.id !== id));
      }
    } catch (err) {
      console.error("Error al eliminar registro:", err);
    }
  };

  const handleGuardarCambios = async () => {
    try {
      const token = localStorage.getItem("jwtToken");
      const method = modalMode === "edit" ? "PUT" : "POST";
      const url =
        modalMode === "edit"
          ? `${BASE_URL}/api/registros-financieros/${modalRegistro.datos.id}`
          : `${BASE_URL}/api/registros-financieros`;

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(modalRegistro.datos),
      });

      if (res.ok) {
        fetchRegistros();
        setModalRegistro({ open: false, datos: null });
        setOpenSnackbar(true);
      }
    } catch (err) {
      console.error("Error al guardar registro:", err);
    }
  };

  const handleOpenModal = (registro, mode) => {
    setModalRegistro({
      open: true,
      datos: registro
        ? { ...registro }
        : {
            monto: 0,
            concepto: "",
            observaciones: "",
            tipo: "ingreso",
            fecha: new Date().toISOString().substring(0, 10),
          },
    });
    setModalMode(mode);
  };

  const formatDate = (dateString) => {
    const d = new Date(dateString);
    return d.toLocaleDateString("es-CL", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 2,
          mb: 2,
        }}
      >
        <Typography variant="h5" fontWeight="bold">
          Registros Financieros
        </Typography>

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

        <FormControl size="small" sx={{ minWidth: 160 }}>
          <InputLabel>Filtrar por tipo</InputLabel>
          <Select
            value={tipoFiltro}
            label="Filtrar por tipo"
            onChange={(e) => setTipoFiltro(e.target.value)}
          >
            <MenuItem value="">Todos</MenuItem>
            <MenuItem value="ingreso">Ingreso</MenuItem>
            <MenuItem value="egreso">Egreso</MenuItem>
          </Select>
        </FormControl>

        <FormControl size="small" sx={{ minWidth: 160 }}>
          <InputLabel>Orden por fecha</InputLabel>
          <Select
            value={fechaOrden}
            label="Orden por fecha"
            onChange={(e) => setFechaOrden(e.target.value)}
          >
            <MenuItem value="desc">Más recientes</MenuItem>
            <MenuItem value="asc">Más antiguos</MenuItem>
          </Select>
        </FormControl>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenModal(null, "new")}
        >
          Agregar
        </Button>
      </Box>

      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Fecha</TableCell>
              <TableCell>Tipo</TableCell>
              <TableCell>Concepto</TableCell>
              <TableCell>Observaciones</TableCell>
              <TableCell>Monto</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedRegistros.map((r) => (
              <TableRow key={r.id}>
                <TableCell>{r.id}</TableCell>
                <TableCell>{formatDate(r.fecha)}</TableCell>
                <TableCell>
                  <Chip
                    label={r.tipo.charAt(0).toUpperCase() + r.tipo.slice(1)}
                    color={r.tipo === "ingreso" ? "success" : "error"}
                    size="small"
                  />
                </TableCell>
                <TableCell>{r.concepto}</TableCell>
                <TableCell>{r.observaciones}</TableCell>
                <TableCell>${r.monto.toLocaleString("es-CL")}</TableCell>
                <TableCell>
                  <Tooltip title="Ver">
                    <IconButton onClick={() => handleOpenModal(r, "view")}>
                      <VisibilityIcon sx={{ color: "#1976d2" }} />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Editar">
                    <IconButton onClick={() => handleOpenModal(r, "edit")}>
                      <EditIcon sx={{ color: "#f57c00" }} />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Eliminar">
                    <IconButton onClick={() => handleDelete(r.id)}>
                      <DeleteIcon sx={{ color: "#d32f2f" }} />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
            {paginatedRegistros.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  No se encontraron registros
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        <TablePagination
          component="div"
          count={filteredRegistros.length}
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

      <Dialog
        open={modalRegistro.open}
        onClose={() => setModalRegistro({ open: false, datos: null })}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          {modalMode === "edit"
            ? "Editar Registro"
            : modalMode === "view"
            ? "Ver Registro"
            : "Nuevo Registro"}
        </DialogTitle>
        <DialogContent dividers>
          <TextField
            label="Monto"
            type="number"
            value={modalRegistro.datos?.monto || ""}
            fullWidth
            margin="normal"
            onChange={(e) =>
              setModalRegistro((prev) => ({
                ...prev,
                datos: { ...prev.datos, monto: parseFloat(e.target.value) },
              }))
            }
            InputProps={{ readOnly: modalMode === "view" }}
          />
          <TextField
            label="Concepto"
            value={modalRegistro.datos?.concepto || ""}
            fullWidth
            margin="normal"
            onChange={(e) =>
              setModalRegistro((prev) => ({
                ...prev,
                datos: { ...prev.datos, concepto: e.target.value },
              }))
            }
            InputProps={{ readOnly: modalMode === "view" }}
          />
          <TextField
            label="Observaciones"
            value={modalRegistro.datos?.observaciones || ""}
            fullWidth
            multiline
            rows={2}
            margin="normal"
            onChange={(e) =>
              setModalRegistro((prev) => ({
                ...prev,
                datos: { ...prev.datos, observaciones: e.target.value },
              }))
            }
            InputProps={{ readOnly: modalMode === "view" }}
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Tipo</InputLabel>
            <Select
              value={modalRegistro.datos?.tipo || ""}
              label="Tipo"
              onChange={(e) =>
                setModalRegistro((prev) => ({
                  ...prev,
                  datos: { ...prev.datos, tipo: e.target.value },
                }))
              }
              disabled={modalMode === "view"}
            >
              <MenuItem value="ingreso">Ingreso</MenuItem>
              <MenuItem value="egreso">Egreso</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label="Fecha"
            type="date"
            value={modalRegistro.datos?.fecha?.substring(0, 10) || ""}
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
            onChange={(e) =>
              setModalRegistro((prev) => ({
                ...prev,
                datos: { ...prev.datos, fecha: e.target.value },
              }))
            }
            InputProps={{ readOnly: modalMode === "view" }}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setModalRegistro({ open: false, datos: null })}
          >
            Cancelar
          </Button>
          {modalMode !== "view" && (
            <Button
              variant="contained"
              color="primary"
              onClick={handleGuardarCambios}
            >
              Guardar Cambios
            </Button>
          )}
        </DialogActions>
      </Dialog>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity="success"
          variant="filled"
        >
          Registro actualizado correctamente
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default RegistrosList;
