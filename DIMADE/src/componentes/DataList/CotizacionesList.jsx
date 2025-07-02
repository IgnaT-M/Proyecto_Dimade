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
import {
  Search as SearchIcon,
  Visibility as VisibilityIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  Add as AddIcon,
} from "@mui/icons-material";

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

  useEffect(() => {
    fetchSolicitudes();
  }, []);

  const fetchSolicitudes = async () => {
    try {
      const token = localStorage.getItem("jwtToken");
      const res = await fetch(
        "http://localhost:8080/api/solicitudes-cotizacion",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = await res.json();
      setSolicitudes(data);
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
      setSolicitudes((prev) => prev.filter((s) => s.id !== id));
    } catch (err) {
      console.error("Error al eliminar:", err);
    }
  };

  const handleOpenModal = (item, mode) => {
    if (mode === "new") {
      setSelected({
        nombreSolicitante: "",
        rutSolicitante: "",
        correo: "",
        telefono: "",
        direccion: "",
        detalle: "",
        estado: "Pendiente",
      });
    } else {
      setSelected(item);
    }
    setModalMode(mode);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setSelected(null);
    setOpenModal(false);
  };

  const handleChange = (e) => {
    setSelected((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("jwtToken");
      const url =
        modalMode === "new"
          ? "http://localhost:8080/api/solicitudes-cotizacion"
          : `http://localhost:8080/api/solicitudes-cotizacion/${selected.id}`;
      const method = modalMode === "new" ? "POST" : "PUT";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...selected,
          fechaSolicitud: selected.fechaSolicitud || new Date(),
        }),
      });

      if (res.ok) {
        await fetchSolicitudes();
        handleCloseModal();
      }
    } catch (err) {
      console.error("Error al guardar:", err);
    }
  };

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          mb: 2,
          flexWrap: "wrap",
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

      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              {paginated[0] &&
                Object.keys(paginated[0])
                  .filter((key) => key !== "detalle")
                  .map((key) => <TableCell key={key}>{key}</TableCell>)}
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginated.map((s) => (
              <TableRow key={s.id}>
                {Object.entries(s)
                  .filter(([k]) => k !== "detalle")
                  .map(([k, v]) => (
                    <TableCell key={k}>
                      {k === "fechaSolicitud"
                        ? new Date(v).toLocaleString()
                        : String(v)}
                    </TableCell>
                  ))}
                <TableCell>
                  <Tooltip title="Ver">
                    <IconButton onClick={() => handleOpenModal(s, "view")}>
                      <VisibilityIcon sx={{ color: "#1976d2" }} />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Editar">
                    <IconButton onClick={() => handleOpenModal(s, "edit")}>
                      <EditIcon sx={{ color: "#f57c00" }} />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Eliminar">
                    <IconButton onClick={() => handleDelete(s.id)}>
                      <DeleteIcon sx={{ color: "#d32f2f" }} />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <TablePagination
          component="div"
          count={filtered.length}
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
              ? "Ver Solicitud"
              : modalMode === "edit"
              ? "Editar Solicitud"
              : "Nueva Solicitud"}
          </Typography>

          {selected &&
            Object.entries(selected).map(([key, value]) => (
              <TextField
                key={key}
                label={key}
                name={key}
                fullWidth
                margin="dense"
                value={value}
                onChange={modalMode === "view" ? undefined : handleChange}
                multiline={key === "detalle"}
                minRows={key === "detalle" ? 3 : undefined}
                InputProps={{
                  readOnly: modalMode === "view" || key === "id",
                }}
              />
            ))}

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

export default CotizacionesList;
