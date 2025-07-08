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
import BASE_URL from "../../config/apiConfig";

const ContactoList = () => {
  const [solicitudes, setSolicitudes] = useState([]);
  const [search, setSearch] = useState("");
  const [asuntoFiltro, setAsuntoFiltro] = useState("");
  const [estadoFiltro, setEstadoFiltro] = useState("");
  const [orden, setOrden] = useState("recientes");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedSolicitud, setSelectedSolicitud] = useState(null);
  const [modalMode, setModalMode] = useState("view");
  const [openModal, setOpenModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    fetchSolicitudes();
  }, []);

  const fetchSolicitudes = async () => {
    try {
      const token = localStorage.getItem("jwtToken");
      const res = await fetch(`${BASE_URL}/api/solicitudes-contacto`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setSolicitudes(Array.isArray(data) ? data : [data]);
    } catch (err) {
      console.error("Error al cargar solicitudes:", err);
    }
  };

  const filtered = useMemo(() => {
    return solicitudes
      .filter((s) => {
        const matchSearch = Object.values(s).some((val) =>
          String(val).toLowerCase().includes(search.toLowerCase())
        );
        const matchAsunto = asuntoFiltro ? s.asunto === asuntoFiltro : true;
        const matchEstado = estadoFiltro ? s.estado === estadoFiltro : true;
        return matchSearch && matchAsunto && matchEstado;
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

  const handleOpenModal = (solicitud, mode) => {
    if (mode === "new") {
      setSelectedSolicitud({
        nombre: "",
        correo: "",
        telefono: "",
        mensaje: "",
        asunto: "Consulta",
        estado: "Pendiente",
        fechaEnvio: new Date().toISOString(),
      });
    } else {
      setSelectedSolicitud(solicitud);
    }
    setModalMode(mode);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setSelectedSolicitud(null);
    setOpenModal(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedSolicitud((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("jwtToken");
      const url =
        modalMode === "new"
          ? `${BASE_URL}/api/solicitudes-contacto`
          : `${BASE_URL}/api/solicitudes-contacto/${selectedSolicitud.id}`;
      const method = modalMode === "new" ? "POST" : "PUT";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(selectedSolicitud),
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
        `${BASE_URL}/api/solicitudes-contacto/${deleteId}`,
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
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <Typography variant="h5" fontWeight="bold">
          Solicitudes de Contacto
        </Typography>
        <Box
          sx={{
            display: "flex",
            gap: 1,
            flexWrap: "wrap",
            alignItems: "center",
          }}
        >
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
            label="Asunto"
            value={asuntoFiltro}
            onChange={(e) => setAsuntoFiltro(e.target.value)}
            sx={{ minWidth: 130 }}
          >
            <MenuItem value="">Todos</MenuItem>
            <MenuItem value="Consulta">Consulta</MenuItem>
            <MenuItem value="Reclamo">Reclamo</MenuItem>
            <MenuItem value="Sugerencia">Sugerencia</MenuItem>
            <MenuItem value="Otro">Otro</MenuItem>
          </TextField>
          <TextField
            select
            size="small"
            label="Estado"
            value={estadoFiltro}
            onChange={(e) => setEstadoFiltro(e.target.value)}
            sx={{ minWidth: 130 }}
          >
            <MenuItem value="">Todos</MenuItem>
            <MenuItem value="Pendiente">Pendiente</MenuItem>
            <MenuItem value="Revisado">Revisado</MenuItem>
            <MenuItem value="Rechazado">Rechazado</MenuItem>
            <MenuItem value="Otro">Otro</MenuItem>
          </TextField>
          <TextField
            select
            size="small"
            label="Orden"
            value={orden}
            onChange={(e) => setOrden(e.target.value)}
            sx={{ minWidth: 130 }}
          >
            <MenuItem value="recientes">Más recientes</MenuItem>
            <MenuItem value="antiguos">Más antiguos</MenuItem>
          </TextField>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => handleOpenModal(null, "new")}
            sx={{ bgcolor: "#d84315", "&:hover": { bgcolor: "#bf360c" } }}
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
                <TableCell>{s.asunto}</TableCell>
                <TableCell>{s.estado}</TableCell>
                <TableCell>{new Date(s.fechaEnvio).toLocaleString()}</TableCell>
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
          {selectedSolicitud && (
            <>
              <TextField
                label="Nombre"
                name="nombre"
                fullWidth
                margin="dense"
                value={selectedSolicitud.nombre}
                onChange={modalMode === "view" ? undefined : handleChange}
                InputProps={{ readOnly: modalMode === "view" }}
              />
              <TextField
                label="Correo"
                name="correo"
                fullWidth
                margin="dense"
                value={selectedSolicitud.correo}
                onChange={modalMode === "view" ? undefined : handleChange}
                InputProps={{ readOnly: modalMode === "view" }}
              />
              <TextField
                label="Teléfono"
                name="telefono"
                fullWidth
                margin="dense"
                value={selectedSolicitud.telefono}
                onChange={modalMode === "view" ? undefined : handleChange}
                InputProps={{ readOnly: modalMode === "view" }}
              />
              <TextField
                label="Mensaje"
                name="mensaje"
                fullWidth
                margin="dense"
                multiline
                minRows={2}
                value={selectedSolicitud.mensaje}
                onChange={modalMode === "view" ? undefined : handleChange}
                InputProps={{ readOnly: modalMode === "view" }}
              />
              <TextField
                select
                label="Asunto"
                name="asunto"
                fullWidth
                margin="dense"
                value={selectedSolicitud.asunto}
                onChange={modalMode === "view" ? undefined : handleChange}
                InputProps={{ readOnly: modalMode === "view" }}
              >
                <MenuItem value="Consulta">Consulta</MenuItem>
                <MenuItem value="Reclamo">Reclamo</MenuItem>
                <MenuItem value="Sugerencia">Sugerencia</MenuItem>
                <MenuItem value="Otro">Otro</MenuItem>
              </TextField>
              <TextField
                select
                label="Estado"
                name="estado"
                fullWidth
                margin="dense"
                value={selectedSolicitud.estado}
                onChange={modalMode === "view" ? undefined : handleChange}
                InputProps={{ readOnly: modalMode === "view" }}
              >
                <MenuItem value="Pendiente">Pendiente</MenuItem>
                <MenuItem value="Revisado">Revisado</MenuItem>
                <MenuItem value="Rechazado">Rechazado</MenuItem>
                <MenuItem value="Otro">Otro</MenuItem>
              </TextField>
              <TextField
                label="Fecha de Envío"
                name="fechaEnvio"
                fullWidth
                margin="dense"
                type="datetime-local"
                value={new Date(selectedSolicitud.fechaEnvio)
                  .toISOString()
                  .slice(0, 16)}
                onChange={modalMode === "view" ? undefined : handleChange}
                InputProps={{ readOnly: modalMode === "view" }}
              />
              {modalMode !== "view" && (
                <Box sx={{ mt: 2, textAlign: "right" }}>
                  <Button variant="contained" onClick={handleSave}>
                    Guardar
                  </Button>
                </Box>
              )}
            </>
          )}
        </Box>
      </Modal>

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
