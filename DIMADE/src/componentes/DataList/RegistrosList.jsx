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
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ToggleOnIcon from "@mui/icons-material/ToggleOn";
import ToggleOffIcon from "@mui/icons-material/ToggleOff";

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

  const fetchRegistros = async () => {
    try {
      const token = localStorage.getItem("jwtToken");
      const res = await fetch(
        "http://localhost:8080/api/registros-financieros",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
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
      const res = await fetch(
        `http://localhost:8080/api/registros-financieros/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
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
      const res = await fetch(
        `http://localhost:8080/api/registros-financieros/${modalRegistro.datos.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(modalRegistro.datos),
        }
      );

      if (res.ok) {
        fetchRegistros();
        setModalRegistro({ open: false, datos: null });
        setOpenSnackbar(true);
      }
    } catch (err) {
      console.error("Error al actualizar registro:", err);
    }
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
      </Box>

      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              {Object.keys(paginatedRegistros[0] || {}).map((key) => (
                <TableCell key={key}>{key}</TableCell>
              ))}
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedRegistros.map((r) => (
              <TableRow key={r.id}>
                {Object.entries(r).map(([k, v]) => (
                  <TableCell key={k}>{String(v)}</TableCell>
                ))}
                <TableCell>
                  <Tooltip title="Ver / Editar">
                    <IconButton
                      onClick={() =>
                        setModalRegistro({ open: true, datos: { ...r } })
                      }
                    >
                      <VisibilityIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Editar">
                    <IconButton
                      onClick={() =>
                        setModalRegistro({ open: true, datos: { ...r } })
                      }
                    >
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Eliminar">
                    <IconButton onClick={() => handleDelete(r.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title={r.activo ? "Desactivar" : "Activar"}>
                    <IconButton>
                      {r.activo ? <ToggleOnIcon /> : <ToggleOffIcon />}
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
            {paginatedRegistros.length === 0 && (
              <TableRow>
                <TableCell colSpan={100} align="center">
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

      {/* Modal Ver/Editar */}
      <Dialog
        open={modalRegistro.open}
        onClose={() => setModalRegistro({ open: false, datos: null })}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Detalle del Registro</DialogTitle>
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
          />
          <TextField
            label="Detalle"
            value={modalRegistro.datos?.detalle || ""}
            fullWidth
            multiline
            rows={2}
            margin="normal"
            onChange={(e) =>
              setModalRegistro((prev) => ({
                ...prev,
                datos: { ...prev.datos, detalle: e.target.value },
              }))
            }
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
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setModalRegistro({ open: false, datos: null })}
          >
            Cancelar
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleGuardarCambios}
          >
            Guardar Cambios
          </Button>
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
