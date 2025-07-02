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
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import {
  Search as SearchIcon,
  Visibility as VisibilityIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  Add as AddIcon,
} from "@mui/icons-material";

const ContactoList = () => {
  const [solicitudes, setSolicitudes] = useState([]);
  const [search, setSearch] = useState("");
  const [asuntoFiltro, setAsuntoFiltro] = useState("");
  const [estadoFiltro, setEstadoFiltro] = useState("");
  const [orden, setOrden] = useState("recientes");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selected, setSelected] = useState(null);
  const [modalMode, setModalMode] = useState("view");
  const [openModal, setOpenModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    fetchSolicitudes();
  }, []);

  const fetchSolicitudes = async () => {
    try {
      const token = localStorage.getItem("jwtToken");
      const res = await fetch(
        "http://localhost:8080/api/solicitudes-contacto",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = await res.json();
      setSolicitudes(Array.isArray(data) ? data : [data]);
    } catch (err) {
      console.error("Error al cargar solicitudes:", err);
    }
  };

  const filtered = useMemo(() => {
    return solicitudes
      .filter((s) => {
        const matchesSearch = Object.values(s).some((val) =>
          String(val).toLowerCase().includes(search.toLowerCase())
        );
        const matchesAsunto = asuntoFiltro ? s.asunto === asuntoFiltro : true;
        const matchesEstado = estadoFiltro ? s.estado === estadoFiltro : true;
        return matchesSearch && matchesAsunto && matchesEstado;
      })
      .sort((a, b) => {
        const fechaA = new Date(a.fechaEnvio);
        const fechaB = new Date(b.fechaEnvio);
        return orden === "recientes" ? fechaB - fechaA : fechaA - fechaB;
      });
  }, [solicitudes, search, asuntoFiltro, estadoFiltro, orden]);

  const paginated = useMemo(() => {
    const start = page * rowsPerPage;
    return filtered.slice(start, start + rowsPerPage);
  }, [filtered, page, rowsPerPage]);

  const handleOpenModal = (item, mode) => {
    if (mode === "new") {
      setSelected({
        nombre: "",
        correo: "",
        telefono: "",
        mensaje: "",
        asunto: "Consulta",
        estado: "Pendiente",
        fechaEnvio: new Date().toISOString(),
      });
    } else {
      setSelected({ ...item });
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
          ? "http://localhost:8080/api/solicitudes-contacto"
          : `http://localhost:8080/api/solicitudes-contacto/${selected.id}`;
      const method = modalMode === "new" ? "POST" : "PUT";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...selected,
          fechaEnvio: selected.fechaEnvio
            ? new Date(selected.fechaEnvio)
            : new Date(),
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

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("jwtToken");
      const res = await fetch(
        `http://localhost:8080/api/solicitudes-contacto/${deleteId}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (res.ok) {
        await fetchSolicitudes();
        setDeleteId(null);
      }
    } catch (err) {
      console.error("Error al eliminar:", err);
    }
  };

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          mb: 2,
          gap: 2,
          flexWrap: "wrap",
        }}
      >
        <Typography variant="h5" fontWeight="bold">
          Solicitudes de Contacto
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
          <FormControl size="small">
            <InputLabel>Asunto</InputLabel>
            <Select
              value={asuntoFiltro}
              label="Asunto"
              onChange={(e) => setAsuntoFiltro(e.target.value)}
              sx={{ minWidth: 120 }}
            >
              <MenuItem value="">Todos</MenuItem>
              <MenuItem value="Consulta">Consulta</MenuItem>
              <MenuItem value="Reclamo">Reclamo</MenuItem>
              <MenuItem value="Sugerencia">Sugerencia</MenuItem>
              <MenuItem value="Otro">Otro</MenuItem>
            </Select>
          </FormControl>
          <FormControl size="small">
            <InputLabel>Estado</InputLabel>
            <Select
              value={estadoFiltro}
              label="Estado"
              onChange={(e) => setEstadoFiltro(e.target.value)}
              sx={{ minWidth: 120 }}
            >
              <MenuItem value="">Todos</MenuItem>
              <MenuItem value="Pendiente">Pendiente</MenuItem>
              <MenuItem value="Revisado">Revisado</MenuItem>
              <MenuItem value="Rechazado">Rechazado</MenuItem>
              <MenuItem value="Otro">Otro</MenuItem>
            </Select>
          </FormControl>
          <FormControl size="small">
            <InputLabel>Orden</InputLabel>
            <Select
              value={orden}
              label="Orden"
              onChange={(e) => setOrden(e.target.value)}
              sx={{ minWidth: 120 }}
            >
              <MenuItem value="recientes">Más recientes</MenuItem>
              <MenuItem value="antiguos">Más antiguos</MenuItem>
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

      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell>Correo</TableCell>
              <TableCell>Teléfono</TableCell>
              <TableCell>Mensaje</TableCell>
              <TableCell>Asunto</TableCell>
              <TableCell>Estado</TableCell>
              <TableCell>Fecha de Envío</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginated.map((s) => (
              <TableRow key={s.id}>
                <TableCell>{s.id}</TableCell>
                <TableCell>{s.nombre}</TableCell>
                <TableCell>{s.correo}</TableCell>
                <TableCell>{s.telefono}</TableCell>
                <TableCell>{s.mensaje}</TableCell>
                <TableCell>{s.asunto}</TableCell>
                <TableCell>{s.estado}</TableCell>
                <TableCell>
                  {new Date(s.fechaEnvio).toLocaleString([], {
                    dateStyle: "short",
                    timeStyle: "short",
                  })}
                </TableCell>
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
                    <IconButton onClick={() => setDeleteId(s.id)}>
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

      {/* Modal de Detalle y Edición */}
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
            Object.entries(selected).map(([key, value]) => {
              if (key === "asunto" || key === "estado") {
                return (
                  <FormControl key={key} fullWidth margin="dense">
                    <InputLabel>
                      {key.charAt(0).toUpperCase() + key.slice(1)}
                    </InputLabel>
                    <Select
                      name={key}
                      value={value || ""}
                      onChange={handleChange}
                      disabled={modalMode === "view"}
                      label={key}
                    >
                      {key === "asunto" ? (
                        <>
                          <MenuItem value="Consulta">Consulta</MenuItem>
                          <MenuItem value="Reclamo">Reclamo</MenuItem>
                          <MenuItem value="Sugerencia">Sugerencia</MenuItem>
                          <MenuItem value="Otro">Otro</MenuItem>
                        </>
                      ) : (
                        <>
                          <MenuItem value="Pendiente">Pendiente</MenuItem>
                          <MenuItem value="Revisado">Revisado</MenuItem>
                          <MenuItem value="Rechazado">Rechazado</MenuItem>
                          <MenuItem value="Otro">Otro</MenuItem>
                        </>
                      )}
                    </Select>
                  </FormControl>
                );
              }

              return (
                <TextField
                  key={key}
                  label={key}
                  name={key}
                  fullWidth
                  margin="dense"
                  type={key === "fechaEnvio" ? "datetime-local" : "text"}
                  value={
                    key === "fechaEnvio"
                      ? new Date(value).toISOString().slice(0, 16)
                      : value
                  }
                  onChange={modalMode === "view" ? undefined : handleChange}
                  InputProps={{
                    readOnly:
                      modalMode === "view" ||
                      (key === "id" && modalMode !== "new"),
                  }}
                />
              );
            })}
          {modalMode !== "view" && (
            <Box sx={{ mt: 2, textAlign: "right" }}>
              <Button variant="contained" onClick={handleSave}>
                Guardar
              </Button>
            </Box>
          )}
        </Box>
      </Modal>

      {/* Modal de Eliminación */}
      <Modal open={!!deleteId} onClose={() => setDeleteId(null)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 300,
            bgcolor: "background.paper",
            p: 3,
            borderRadius: 2,
            boxShadow: 24,
            textAlign: "center",
          }}
        >
          <Typography mb={2}>
            ¿Estás seguro de que deseas eliminar esta solicitud?
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "center", gap: 1 }}>
            <Button onClick={() => setDeleteId(null)}>Cancelar</Button>
            <Button variant="contained" color="error" onClick={handleDelete}>
              Eliminar
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default ContactoList;
