import React, { useEffect, useState } from "react";
import {
  Box,
  TextField,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
} from "@mui/material";
import { Delete, Edit, Visibility } from "@mui/icons-material";
import axios from "axios";

const ContactoList = () => {
  const [solicitudes, setSolicitudes] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [ordenFecha, setOrdenFecha] = useState("desc");

  const [modalEliminar, setModalEliminar] = useState({ open: false, id: null });
  const [modalVer, setModalVer] = useState({ open: false, datos: null });
  const [modalEditar, setModalEditar] = useState({ open: false, datos: null });

  const fetchSolicitudes = async () => {
    try {
      const res = await axios.get("/api/solicitudes-contacto");
      let data = res.data;

      if (busqueda.trim()) {
        data = data.filter(
          (s) =>
            s.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
            s.email.toLowerCase().includes(busqueda.toLowerCase())
        );
      }

      data.sort((a, b) => {
        const fechaA = new Date(a.fecha);
        const fechaB = new Date(b.fecha);
        return ordenFecha === "asc" ? fechaA - fechaB : fechaB - fechaA;
      });

      setSolicitudes(data);
    } catch (err) {
      console.error("Error al cargar solicitudes:", err);
    }
  };

  useEffect(() => {
    fetchSolicitudes();
  }, [busqueda, ordenFecha]);

  const handleEliminar = async () => {
    try {
      await axios.delete(`/api/solicitudes-contacto/${modalEliminar.id}`);
      setModalEliminar({ open: false, id: null });
      fetchSolicitudes();
    } catch (err) {
      console.error("Error al eliminar:", err);
    }
  };

  const handleGuardarEdicion = async () => {
    try {
      await axios.put(
        `/api/solicitudes-contacto/${modalEditar.datos._id}`,
        modalEditar.datos
      );
      setModalEditar({ open: false, datos: null });
      fetchSolicitudes();
    } catch (err) {
      console.error("Error al editar:", err);
    }
  };

  return (
    <Box sx={{ p: 2 }}>
      {/* Buscador y filtro */}
      <TextField
        label="Buscar por nombre o correo"
        variant="outlined"
        fullWidth
        margin="normal"
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
      />

      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Ordenar por fecha</InputLabel>
        <Select
          value={ordenFecha}
          label="Ordenar por fecha"
          onChange={(e) => setOrdenFecha(e.target.value)}
        >
          <MenuItem value="desc">Más recientes primero</MenuItem>
          <MenuItem value="asc">Más antiguas primero</MenuItem>
        </Select>
      </FormControl>

      {/* Tabla */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Teléfono</TableCell>
              <TableCell>Mensaje</TableCell>
              <TableCell>Fecha</TableCell>
              <TableCell align="center">Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {solicitudes.map((s) => (
              <TableRow key={s._id}>
                <TableCell>{s.nombre}</TableCell>
                <TableCell>{s.email}</TableCell>
                <TableCell>{s.telefono}</TableCell>
                <TableCell>{s.mensaje}</TableCell>
                <TableCell>{new Date(s.fecha).toLocaleString()}</TableCell>
                <TableCell align="center">
                  <IconButton
                    color="primary"
                    onClick={() => setModalVer({ open: true, datos: s })}
                  >
                    <Visibility />
                  </IconButton>
                  <IconButton
                    color="warning"
                    onClick={() =>
                      setModalEditar({ open: true, datos: { ...s } })
                    }
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => setModalEliminar({ open: true, id: s._id })}
                  >
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
            {solicitudes.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  No se encontraron resultados
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Modal Ver */}
      <Dialog
        open={modalVer.open}
        onClose={() => setModalVer({ open: false, datos: null })}
      >
        <DialogTitle>Detalle de solicitud</DialogTitle>
        <DialogContent dividers>
          {modalVer.datos && (
            <>
              <Typography>
                <b>Nombre:</b> {modalVer.datos.nombre}
              </Typography>
              <Typography>
                <b>Email:</b> {modalVer.datos.email}
              </Typography>
              <Typography>
                <b>Teléfono:</b> {modalVer.datos.telefono}
              </Typography>
              <Typography>
                <b>Mensaje:</b> {modalVer.datos.mensaje}
              </Typography>
              <Typography>
                <b>Fecha:</b> {new Date(modalVer.datos.fecha).toLocaleString()}
              </Typography>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setModalVer({ open: false, datos: null })}>
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>

      {/* Modal Editar */}
      <Dialog
        open={modalEditar.open}
        onClose={() => setModalEditar({ open: false, datos: null })}
      >
        <DialogTitle>Editar solicitud</DialogTitle>
        <DialogContent dividers>
          {modalEditar.datos && (
            <>
              <TextField
                label="Nombre"
                value={modalEditar.datos.nombre}
                fullWidth
                margin="normal"
                onChange={(e) =>
                  setModalEditar((prev) => ({
                    ...prev,
                    datos: { ...prev.datos, nombre: e.target.value },
                  }))
                }
              />
              <TextField
                label="Email"
                value={modalEditar.datos.email}
                fullWidth
                margin="normal"
                onChange={(e) =>
                  setModalEditar((prev) => ({
                    ...prev,
                    datos: { ...prev.datos, email: e.target.value },
                  }))
                }
              />
              <TextField
                label="Teléfono"
                value={modalEditar.datos.telefono}
                fullWidth
                margin="normal"
                onChange={(e) =>
                  setModalEditar((prev) => ({
                    ...prev,
                    datos: { ...prev.datos, telefono: e.target.value },
                  }))
                }
              />
              <TextField
                label="Mensaje"
                value={modalEditar.datos.mensaje}
                fullWidth
                multiline
                rows={3}
                margin="normal"
                onChange={(e) =>
                  setModalEditar((prev) => ({
                    ...prev,
                    datos: { ...prev.datos, mensaje: e.target.value },
                  }))
                }
              />
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setModalEditar({ open: false, datos: null })}>
            Cancelar
          </Button>
          <Button
            onClick={handleGuardarEdicion}
            variant="contained"
            color="primary"
          >
            Guardar
          </Button>
        </DialogActions>
      </Dialog>

      {/* Modal Confirmar Eliminación */}
      <Dialog
        open={modalEliminar.open}
        onClose={() => setModalEliminar({ open: false, id: null })}
      >
        <DialogTitle>Confirmar eliminación</DialogTitle>
        <DialogContent>
          <Typography>
            ¿Estás seguro de que deseas eliminar esta solicitud?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setModalEliminar({ open: false, id: null })}>
            Cancelar
          </Button>
          <Button onClick={handleEliminar} variant="contained" color="error">
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ContactoList;
