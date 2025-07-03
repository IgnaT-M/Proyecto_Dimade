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

const UsuariosList = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [search, setSearch] = useState("");
  const [estadoFiltro, setEstadoFiltro] = useState("todos");
  const [rolFiltro, setRolFiltro] = useState("todos");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedUsuario, setSelectedUsuario] = useState(null);
  const [modalMode, setModalMode] = useState("view");
  const [openModal, setOpenModal] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const fetchUsuarios = async () => {
    try {
      const token = localStorage.getItem("jwtToken");
      const res = await fetch("http://localhost:8080/api/usuarios", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setUsuarios(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error cargando usuarios:", err);
    }
  };

  useEffect(() => {
    fetchUsuarios();
  }, []);

  const filteredUsuarios = useMemo(() => {
    return usuarios.filter((usuario) => {
      const matchSearch = Object.values(usuario).some((val) =>
        String(val).toLowerCase().includes(search.toLowerCase())
      );
      const matchEstado =
        estadoFiltro === "todos" ||
        (estadoFiltro === "activo" && usuario.activo) ||
        (estadoFiltro === "inactivo" && !usuario.activo);
      const matchRol =
        rolFiltro === "todos" ||
        usuario.rol?.toLowerCase() === rolFiltro.toLowerCase();

      return matchSearch && matchEstado && matchRol;
    });
  }, [usuarios, search, estadoFiltro, rolFiltro]);

  const paginatedUsuarios = useMemo(() => {
    const start = page * rowsPerPage;
    return filteredUsuarios.slice(start, start + rowsPerPage);
  }, [filteredUsuarios, page, rowsPerPage]);

  const handleDelete = async (id) => {
    if (!window.confirm("¿Eliminar usuario?")) return;
    try {
      const token = localStorage.getItem("jwtToken");
      const res = await fetch(`http://localhost:8080/api/usuarios/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.ok) {
        setUsuarios((prev) => prev.filter((u) => u.id !== id));
      }
    } catch (err) {
      console.error("Error al eliminar usuario:", err);
    }
  };

  const handleToggleActivo = async (usuario) => {
    try {
      const token = localStorage.getItem("jwtToken");
      const updated = { ...usuario, activo: !usuario.activo };
      const res = await fetch(
        `http://localhost:8080/api/usuarios/${usuario.id}`,
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
        setUsuarios((prev) =>
          prev.map((u) => (u.id === usuario.id ? updated : u))
        );
      }
    } catch (err) {
      console.error("Error al cambiar estado activo:", err);
    }
  };

  const handleOpenModal = (usuario, mode) => {
    if (mode === "new") {
      setSelectedUsuario({
        nombre: "",
        email: "",
        password: "",
        rol: "USER",
        activo: true,
      });
    } else {
      setSelectedUsuario(usuario);
    }
    setModalMode(mode);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setSelectedUsuario(null);
    setOpenModal(false);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setSelectedUsuario((prev) => ({
      ...prev,
      [name]: name === "activo" ? value === "true" : value,
    }));
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("jwtToken");
      const url =
        modalMode === "new"
          ? "http://localhost:8080/api/usuarios"
          : `http://localhost:8080/api/usuarios/${selectedUsuario.id}`;
      const method = modalMode === "new" ? "POST" : "PUT";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(selectedUsuario),
      });

      if (res.ok) {
        await fetchUsuarios();
        handleCloseModal();
      }
    } catch (err) {
      console.error("Error al guardar usuario:", err);
    }
  };

  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: { xs: "90%", md: 400 },
    bgcolor: "background.paper",
    p: 4,
    borderRadius: 2,
    boxShadow: 24,
    maxHeight: "90vh",
    overflowY: "auto",
  };

  const renderActions = (usuario) => (
    <Box sx={{ display: "flex", justifyContent: "flex-end", flexWrap: "wrap" }}>
      <Tooltip title="Ver">
        <IconButton onClick={() => handleOpenModal(usuario, "view")}>
          <VisibilityIcon sx={{ color: "#1976d2" }} />
        </IconButton>
      </Tooltip>
      <Tooltip title="Editar">
        <IconButton onClick={() => handleOpenModal(usuario, "edit")}>
          <EditIcon sx={{ color: "#f57c00" }} />
        </IconButton>
      </Tooltip>
      <Tooltip title="Eliminar">
        <IconButton onClick={() => handleDelete(usuario.id)}>
          <DeleteIcon sx={{ color: "#d32f2f" }} />
        </IconButton>
      </Tooltip>
      {"activo" in usuario && (
        <Tooltip title={usuario.activo ? "Desactivar" : "Activar"}>
          <IconButton onClick={() => handleToggleActivo(usuario)}>
            {usuario.activo ? (
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
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: { xs: "stretch", md: "center" },
          flexDirection: { xs: "column", md: "row" },
          gap: 2,
          mb: 2,
        }}
      >
        <Typography variant="h5" fontWeight="bold">
          Lista de Usuarios
        </Typography>
        <Box
          sx={{
            display: "flex",
            gap: 1,
            flexDirection: { xs: "column", sm: "row" },
            flexWrap: "wrap",
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
            label="Estado"
            value={estadoFiltro}
            onChange={(e) => setEstadoFiltro(e.target.value)}
            sx={{ minWidth: 120 }}
          >
            <MenuItem value="todos">Todos</MenuItem>
            <MenuItem value="activo">Activo</MenuItem>
            <MenuItem value="inactivo">Inactivo</MenuItem>
          </TextField>
          <TextField
            select
            size="small"
            label="Rol"
            value={rolFiltro}
            onChange={(e) => setRolFiltro(e.target.value)}
            sx={{ minWidth: 120 }}
          >
            <MenuItem value="todos">Todos</MenuItem>
            <MenuItem value="ADMIN">ADMIN</MenuItem>
            <MenuItem value="USER">USER</MenuItem>
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
          {paginatedUsuarios.map((usuario) => (
            <Paper key={usuario.id} sx={{ p: 2, mb: 2 }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                }}
              >
                <Box>
                  <Typography variant="subtitle1" fontWeight="bold">
                    {usuario.nombre}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {usuario.email}
                  </Typography>
                </Box>
                <Chip
                  label={usuario.activo ? "Activo" : "Inactivo"}
                  color={usuario.activo ? "success" : "default"}
                  size="small"
                />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mt: 1,
                }}
              >
                <Typography variant="body2">
                  Rol: <strong>{usuario.rol}</strong>
                </Typography>
                {renderActions(usuario)}
              </Box>
            </Paper>
          ))}
        </Box>
      ) : (
        <Paper>
          <Table>
            <TableHead>
              <TableRow>
                {paginatedUsuarios[0] &&
                  Object.keys(paginatedUsuarios[0])
                    .filter((key) => key !== "password")
                    .map((key) => (
                      <TableCell key={key} sx={{ textTransform: "capitalize" }}>
                        {key}
                      </TableCell>
                    ))}
                <TableCell align="right">Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedUsuarios.map((usuario) => (
                <TableRow key={usuario.id}>
                  {Object.entries(usuario).map(([k, v]) => {
                    if (k === "password") return null;
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
                  <TableCell align="right">{renderActions(usuario)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      )}

      <TablePagination
        component="div"
        count={filteredUsuarios.length}
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
              ? "Ver Usuario"
              : modalMode === "edit"
              ? "Editar Usuario"
              : "Nuevo Usuario"}
          </Typography>
          {selectedUsuario && (
            <>
              <TextField
                label="Nombre"
                name="nombre"
                fullWidth
                margin="dense"
                value={selectedUsuario.nombre}
                onChange={modalMode === "view" ? undefined : handleEditChange}
                InputProps={{ readOnly: modalMode === "view" }}
              />
              <TextField
                label="Correo electrónico"
                name="email"
                fullWidth
                margin="dense"
                value={selectedUsuario.email}
                onChange={modalMode === "view" ? undefined : handleEditChange}
                InputProps={{ readOnly: modalMode === "view" }}
              />
              {modalMode !== "view" && (
                <TextField
                  label="Contraseña"
                  name="password"
                  type="password"
                  fullWidth
                  margin="dense"
                  value={selectedUsuario.password || ""}
                  onChange={handleEditChange}
                  placeholder={
                    modalMode === "edit"
                      ? "Dejar en blanco para no cambiar"
                      : ""
                  }
                />
              )}
              <TextField
                select
                label="Rol"
                name="rol"
                fullWidth
                margin="dense"
                value={selectedUsuario.rol}
                onChange={modalMode === "view" ? undefined : handleEditChange}
                InputProps={{ readOnly: modalMode === "view" }}
              >
                <MenuItem value="ADMIN">ADMIN</MenuItem>
                <MenuItem value="USER">USER</MenuItem>
              </TextField>
              <TextField
                select
                label="Estado"
                name="activo"
                fullWidth
                margin="dense"
                value={String(selectedUsuario.activo)}
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

export default UsuariosList;
