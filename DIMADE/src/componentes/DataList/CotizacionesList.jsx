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
import {
  Search as SearchIcon,
  Visibility as VisibilityIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  Add as AddIcon,
  ShoppingCartCheckout as ShoppingCartCheckoutIcon,
} from "@mui/icons-material";

const formatFecha = (dateString) => {
  if (!dateString) return "N/A";
  return new Date(dateString).toLocaleString("es-CL", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

const CotizacionesList = () => {
  const [solicitudes, setSolicitudes] = useState([]);
  const [search, setSearch] = useState("");
  const [estadoFiltro, setEstadoFiltro] = useState("todos");
  const [ordenFecha, setOrdenFecha] = useState("recientes");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selected, setSelected] = useState(null);
  const [modalMode, setModalMode] = useState("view");
  const [openModal, setOpenModal] = useState(false);
  const [openOrdenModal, setOpenOrdenModal] = useState(false);
  const [ordenData, setOrdenData] = useState(null);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    fetchSolicitudes();
  }, []);

  const fetchSolicitudes = async () => {
    try {
      const token = localStorage.getItem("jwtToken");
      const res = await fetch(
        "http://localhost:8080/api/solicitudes-cotizacion",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const data = await res.json();
      setSolicitudes(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error al cargar cotizaciones:", err);
    }
  };

  const filtered = useMemo(() => {
    return solicitudes
      .filter((s) => {
        const texto = search.toLowerCase();
        const matchesSearch = Object.values(s).some((val) =>
          String(val).toLowerCase().includes(texto)
        );
        const matchesEstado =
          estadoFiltro === "todos" || s.estado === estadoFiltro;
        return matchesSearch && matchesEstado;
      })
      .sort((a, b) => {
        const dateA = new Date(a.fechaSolicitud).getTime();
        const dateB = new Date(b.fechaSolicitud).getTime();
        return ordenFecha === "recientes" ? dateB - dateA : dateA - dateB;
      });
  }, [solicitudes, search, estadoFiltro, ordenFecha]);

  const paginated = useMemo(() => {
    const start = page * rowsPerPage;
    return filtered.slice(start, start + rowsPerPage);
  }, [filtered, page, rowsPerPage]);

  const handleDelete = async (id) => {
    if (!window.confirm("¿Eliminar solicitud?")) return;
    try {
      const token = localStorage.getItem("jwtToken");
      await fetch(`http://localhost:8080/api/solicitudes-cotizacion/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchSolicitudes();
    } catch (err) {
      console.error("Error al eliminar:", err);
    }
  };

  const handleOpenModal = (item, mode) => {
    const initialData = {
      nombreSolicitante: "",
      rutSolicitante: "",
      correo: "",
      telefono: "",
      direccion: "",
      detalle: "",
      estado: "Pendiente",
    };
    setSelected(mode === "new" ? initialData : item);
    setModalMode(mode);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelected(null);
  };

  const handleChange = (e) => {
    setSelected((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleOrdenChange = (e) => {
    setOrdenData((prev) => ({
      ...prev,
      [e.target.name]:
        e.target.name === "total" ? parseFloat(e.target.value) : e.target.value,
    }));
  };

  const handleCrearOrden = (item) => {
    if (!item) return;
    setOrdenData({
      rutProveedor: "",
      rutCliente: item.rutSolicitante || "",
      telefono: item.telefono || "",
      mail: item.correo || "",
      fechaOrden: new Date().toISOString().slice(0, 16),
      productos: "",
      total: 0,
      estado: "Pendiente",
      tipo: "Cliente",
      detalle: item.detalle || "",
    });
    setOpenOrdenModal(true);
    if (openModal) handleCloseModal();
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("jwtToken");
      const url =
        modalMode === "new"
          ? "http://localhost:8080/api/solicitudes-cotizacion"
          : `http://localhost:8080/api/solicitudes-cotizacion/${selected.id}`;
      const method = modalMode === "new" ? "POST" : "PUT";
      await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...selected,
          fechaSolicitud: selected.fechaSolicitud || new Date().toISOString(),
        }),
      });
      await fetchSolicitudes();
      handleCloseModal();
    } catch (err) {
      console.error("Error al guardar:", err);
    }
  };

  const handleSaveOrden = async () => {
    if (!ordenData) return;
    try {
      const token = localStorage.getItem("jwtToken");
      const res = await fetch("http://localhost:8080/api/ordenes-compra", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(ordenData),
      });
      if (res.ok) {
        setOpenOrdenModal(false);
        setOrdenData(null);
        alert("Orden creada con éxito");
      } else {
        alert("Error al crear la orden. Revise la consola.");
        console.error("Error al crear orden");
      }
    } catch (err) {
      console.error("Error al guardar orden:", err);
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

  const getEstadoColor = (estado) => {
    switch (estado) {
      case "Aprobada":
        return "success";
      case "Pendiente":
        return "warning";
      case "Rechazada":
        return "error";
      default:
        return "default";
    }
  };

  const renderActions = (item) => (
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-end",
        flexWrap: "wrap",
        alignItems: "center",
      }}
    >
      <Tooltip title="Ver">
        <IconButton onClick={() => handleOpenModal(item, "view")}>
          <VisibilityIcon sx={{ color: "#1976d2" }} />
        </IconButton>
      </Tooltip>
      <Tooltip title="Editar">
        <IconButton onClick={() => handleOpenModal(item, "edit")}>
          <EditIcon sx={{ color: "#f57c00" }} />
        </IconButton>
      </Tooltip>
      <Tooltip title="Eliminar">
        <IconButton onClick={() => handleDelete(item.id)}>
          <DeleteIcon sx={{ color: "#d32f2f" }} />
        </IconButton>
      </Tooltip>
      {item.estado === "Aprobada" && (
        <Tooltip title="Crear Orden de Compra">
          <IconButton onClick={() => handleCrearOrden(item)}>
            <ShoppingCartCheckoutIcon color="success" />
          </IconButton>
        </Tooltip>
      )}
    </Box>
  );

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
          Solicitudes de Cotización
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
            size="small"
            select
            value={estadoFiltro}
            onChange={(e) => setEstadoFiltro(e.target.value)}
            label="Estado"
            sx={{ minWidth: 120 }}
          >
            <MenuItem value="todos">Todos</MenuItem>
            <MenuItem value="Pendiente">Pendiente</MenuItem>
            <MenuItem value="Aprobada">Aprobada</MenuItem>
            <MenuItem value="Rechazada">Rechazada</MenuItem>
          </TextField>
          <TextField
            size="small"
            select
            value={ordenFecha}
            onChange={(e) => setOrdenFecha(e.target.value)}
            label="Orden"
            sx={{ minWidth: 140 }}
          >
            <MenuItem value="recientes">Más recientes</MenuItem>
            <MenuItem value="antiguos">Más antiguos</MenuItem>
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
          {paginated.map((s) => (
            <Paper key={s.id} sx={{ p: 2, mb: 2 }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  mb: 1,
                }}
              >
                <Typography variant="subtitle1" fontWeight="bold">
                  Solicitud #{s.id}
                </Typography>
                <Chip
                  label={s.estado}
                  color={getEstadoColor(s.estado)}
                  size="small"
                />
              </Box>
              <Typography variant="body2">
                <strong>{s.nombreSolicitante}</strong> ({s.rutSolicitante})
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Fecha: {formatFecha(s.fechaSolicitud)}
              </Typography>
              <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}>
                {renderActions(s)}
              </Box>
            </Paper>
          ))}
        </Box>
      ) : (
        <Paper>
          <Table>
            <TableHead>
              <TableRow>
                {paginated[0] &&
                  Object.keys(paginated[0])
                    .filter((key) => key !== "detalle")
                    .map((key) => (
                      <TableCell sx={{ textTransform: "capitalize" }} key={key}>
                        {key}
                      </TableCell>
                    ))}
                <TableCell align="right">Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginated.map((s) => (
                <TableRow key={s.id}>
                  {Object.entries(s)
                    .filter(([k]) => k !== "detalle")
                    .map(([k, v]) => (
                      <TableCell key={k}>
                        {k === "fechaSolicitud" ? formatFecha(v) : String(v)}
                      </TableCell>
                    ))}
                  <TableCell align="right">{renderActions(s)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      )}

      <TablePagination
        component="div"
        count={filtered.length}
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
              ? "Ver Solicitud"
              : modalMode === "edit"
              ? "Editar Solicitud"
              : "Nueva Solicitud"}
          </Typography>
          {selected &&
            Object.keys(selected).map((key) => {
              if (key === "id" || key === "fechaSolicitud") return null;
              const isReadOnly = modalMode === "view";
              const label = key
                .replace(/([A-Z])/g, " $1")
                .replace(/^./, (str) => str.toUpperCase());

              if (key === "estado") {
                return (
                  <TextField
                    key={key}
                    label="Estado"
                    name="estado"
                    select
                    fullWidth
                    margin="dense"
                    value={selected.estado}
                    onChange={isReadOnly ? undefined : handleChange}
                    InputProps={{ readOnly: isReadOnly }}
                  >
                    <MenuItem value="Pendiente">Pendiente</MenuItem>
                    <MenuItem value="Aprobada">Aprobada</MenuItem>
                    <MenuItem value="Rechazada">Rechazada</MenuItem>
                  </TextField>
                );
              }
              return (
                <TextField
                  key={key}
                  label={label}
                  name={key}
                  fullWidth
                  margin="dense"
                  value={selected[key]}
                  onChange={isReadOnly ? undefined : handleChange}
                  multiline={key === "detalle"}
                  rows={key === "detalle" ? 3 : 1}
                  InputProps={{ readOnly: isReadOnly }}
                />
              );
            })}
          {modalMode === "view" && (
            <Box mt={2}>
              <Button variant="contained" onClick={handleCloseModal}>
                Cerrar
              </Button>
            </Box>
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

      <Modal open={openOrdenModal} onClose={() => setOpenOrdenModal(false)}>
        <Box sx={modalStyle}>
          <Typography variant="h6" mb={2}>
            Nueva Orden de Compra
          </Typography>
          {ordenData &&
            Object.keys(ordenData).map((key) => {
              const label = key
                .replace(/([A-Z])/g, " $1")
                .replace(/^./, (str) => str.toUpperCase());
              if (key === "estado" || key === "tipo") {
                const options =
                  key === "estado"
                    ? ["Pendiente", "Aprobada", "Rechazada"]
                    : ["Cliente", "Proveedor", "Otros"];
                return (
                  <TextField
                    key={key}
                    label={label}
                    name={key}
                    select
                    fullWidth
                    margin="dense"
                    value={ordenData[key]}
                    onChange={handleOrdenChange}
                  >
                    {options.map((opt) => (
                      <MenuItem key={opt} value={opt}>
                        {opt}
                      </MenuItem>
                    ))}
                  </TextField>
                );
              }
              return (
                <TextField
                  key={key}
                  label={label}
                  name={key}
                  fullWidth
                  margin="dense"
                  value={
                    key === "fechaOrden" ? ordenData[key] : ordenData[key] || ""
                  }
                  onChange={handleOrdenChange}
                  type={
                    key === "fechaOrden"
                      ? "datetime-local"
                      : key === "total"
                      ? "number"
                      : "text"
                  }
                  multiline={key === "detalle" || key === "productos"}
                  rows={key === "detalle" || key === "productos" ? 3 : 1}
                />
              );
            })}
          <Box sx={{ mt: 2, textAlign: "right" }}>
            <Button variant="contained" onClick={handleSaveOrden}>
              Confirmar Orden
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default CotizacionesList;
