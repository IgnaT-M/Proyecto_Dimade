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
  useMediaQuery,
  useTheme,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";

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

  const theme = useTheme();
  // Media query para cambiar a vista de tarjetas en tablets y móviles
  const isMobileLayout = useMediaQuery(theme.breakpoints.down("md"));
  // Media query para hacer el Dialog a pantalla completa solo en móviles
  const isFullScreenDialog = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    fetchRegistros();
  }, []);

  const fetchRegistros = async () => {
    try {
      const token = localStorage.getItem("jwtToken");
      const res = await fetch(
        "http://localhost:8080/api/registros-financieros",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (!res.ok) {
        console.error("Error en la respuesta de la API:", res.status);
        setRegistros([]);
        return;
      }
      const data = await res.json();
      setRegistros(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error cargando registros:", err);
      setRegistros([]);
    }
  };

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
        const fechaA = new Date(a.fecha).getTime();
        const fechaB = new Date(b.fecha).getTime();
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
      const res = await fetch(
        `http://localhost:8080/api/registros-financieros/${id}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
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
      const method = modalMode === "new" ? "POST" : "PUT";
      const url =
        modalMode === "new"
          ? "http://localhost:8080/api/registros-financieros"
          : `http://localhost:8080/api/registros-financieros/${modalRegistro.datos.id}`;
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

  const handleCloseModal = () => setModalRegistro({ open: false, datos: null });

  const handleModalChange = (e) => {
    const { name, value } = e.target;
    setModalRegistro((prev) => ({
      ...prev,
      datos: { ...prev.datos, [name]: value },
    }));
  };

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString("es-CL", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });

  const formatCurrency = (amount) =>
    new Intl.NumberFormat("es-CL", {
      style: "currency",
      currency: "CLP",
    }).format(amount);

  const renderActions = (registro) => (
    <Box>
      <Tooltip title="Ver">
        <IconButton onClick={() => handleOpenModal(registro, "view")}>
          <VisibilityIcon sx={{ color: "#1976d2" }} />
        </IconButton>
      </Tooltip>
      <Tooltip title="Editar">
        <IconButton onClick={() => handleOpenModal(registro, "edit")}>
          <EditIcon sx={{ color: "#f57c00" }} />
        </IconButton>
      </Tooltip>
      <Tooltip title="Eliminar">
        <IconButton onClick={() => handleDelete(registro.id)}>
          <DeleteIcon sx={{ color: "#d32f2f" }} />
        </IconButton>
      </Tooltip>
    </Box>
  );

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 2,
          mb: 2,
          alignItems: "center",
        }}
      >
        <Typography variant="h5" fontWeight="bold">
          Registros Financieros
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
          <FormControl size="small" sx={{ minWidth: 160 }}>
            <InputLabel>Tipo</InputLabel>
            <Select
              value={tipoFiltro}
              label="Tipo"
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
      </Box>

      {isMobileLayout ? (
        <Box>
          {paginatedRegistros.map((r) => (
            <Paper key={r.id} sx={{ p: 2, mb: 2 }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  mb: 1,
                }}
              >
                <Typography
                  variant="subtitle1"
                  fontWeight="bold"
                  sx={{ mr: 1, flexGrow: 1 }}
                >
                  {r.concepto}
                </Typography>
                <Typography
                  variant="h6"
                  color={r.tipo === "ingreso" ? "success.main" : "error.main"}
                >
                  {formatCurrency(r.monto)}
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">
                {r.observaciones}
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mt: 2,
                }}
              >
                <Chip
                  label={r.tipo}
                  color={r.tipo === "ingreso" ? "success" : "error"}
                  size="small"
                />
                {renderActions(r)}
              </Box>
            </Paper>
          ))}
        </Box>
      ) : (
        <Paper>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Fecha</TableCell>
                <TableCell>Tipo</TableCell>
                <TableCell>Concepto</TableCell>
                <TableCell>Observaciones</TableCell>
                <TableCell align="right">Monto</TableCell>
                <TableCell align="right">Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedRegistros.map((r) => (
                <TableRow key={r.id}>
                  <TableCell>{r.id}</TableCell>
                  <TableCell>{formatDate(r.fecha)}</TableCell>
                  <TableCell>
                    <Chip
                      label={r.tipo}
                      color={r.tipo === "ingreso" ? "success" : "error"}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>{r.concepto}</TableCell>
                  <TableCell>{r.observaciones}</TableCell>
                  <TableCell align="right">{formatCurrency(r.monto)}</TableCell>
                  <TableCell align="right">{renderActions(r)}</TableCell>
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
        </Paper>
      )}

      <TablePagination
        component="div"
        count={filteredRegistros.length}
        page={page}
        onPageChange={(_, newPage) => setPage(newPage)}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={(e) =>
          setRowsPerPage(parseInt(e.target.value, 10))
        }
      />

      <Dialog
        open={modalRegistro.open}
        onClose={handleCloseModal}
        maxWidth="sm"
        fullWidth
        fullScreen={isFullScreenDialog}
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
            name="monto"
            type="number"
            value={modalRegistro.datos?.monto || ""}
            fullWidth
            margin="normal"
            onChange={handleModalChange}
            InputProps={{ readOnly: modalMode === "view" }}
          />
          <TextField
            label="Concepto"
            name="concepto"
            value={modalRegistro.datos?.concepto || ""}
            fullWidth
            margin="normal"
            onChange={handleModalChange}
            InputProps={{ readOnly: modalMode === "view" }}
          />
          <TextField
            label="Observaciones"
            name="observaciones"
            value={modalRegistro.datos?.observaciones || ""}
            fullWidth
            multiline
            rows={2}
            margin="normal"
            onChange={handleModalChange}
            InputProps={{ readOnly: modalMode === "view" }}
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Tipo</InputLabel>
            <Select
              name="tipo"
              value={modalRegistro.datos?.tipo || "ingreso"}
              label="Tipo"
              onChange={handleModalChange}
              readOnly={modalMode === "view"}
            >
              <MenuItem value="ingreso">Ingreso</MenuItem>
              <MenuItem value="egreso">Egreso</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label="Fecha"
            name="fecha"
            type="date"
            value={modalRegistro.datos?.fecha?.substring(0, 10) || ""}
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
            onChange={handleModalChange}
            InputProps={{ readOnly: modalMode === "view" }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal}>Cancelar</Button>
          {modalMode !== "view" && (
            <Button
              variant="contained"
              color="primary"
              onClick={handleGuardarCambios}
            >
              Guardar
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
          Registro guardado correctamente
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default RegistrosList;
