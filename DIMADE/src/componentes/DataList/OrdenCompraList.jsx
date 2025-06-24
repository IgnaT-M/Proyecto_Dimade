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
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Fab,
} from "@mui/material";
import { Visibility, Add } from "@mui/icons-material";
import axios from "axios";

const OrdenCompraList = () => {
  const [solicitudes, setSolicitudes] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [ordenFecha, setOrdenFecha] = useState("desc");
  const [modalVer, setModalVer] = useState({ open: false, datos: null });
  const [modalAgregar, setModalAgregar] = useState(false);
  const [nuevaSolicitud, setNuevaSolicitud] = useState({
    nombreSolicitante: "",
    rutSolicitante: "",
    correo: "",
    telefono: "",
    detalle: "",
    estado: "Pendiente",
  });

  const fetchSolicitudes = async () => {
    try {
      const res = await axios.get("/api/ordenes-compra");
      const data = res.data ? [res.data] : []; // fuerza a un array si es objeto único

      const filtrado = busqueda.trim()
        ? data.filter(
            (s) =>
              s.nombreSolicitante
                ?.toLowerCase()
                .includes(busqueda.toLowerCase()) ||
              s.rutSolicitante?.toLowerCase().includes(busqueda.toLowerCase())
          )
        : data;

      filtrado.sort((a, b) => {
        const fechaA = new Date(a.fechaSolicitud);
        const fechaB = new Date(b.fechaSolicitud);
        return ordenFecha === "asc" ? fechaA - fechaB : fechaB - fechaA;
      });

      setSolicitudes(filtrado);
    } catch (err) {
      console.error("Error al cargar cotizaciones:", err);
    }
  };

  useEffect(() => {
    fetchSolicitudes();
  }, [busqueda, ordenFecha]);

  const handleCrearOrdenCompra = async () => {
    try {
      const orden = {
        nombre: modalVer.datos.nombreSolicitante,
        rut: modalVer.datos.rutSolicitante,
        email: modalVer.datos.correo,
        telefono: modalVer.datos.telefono,
        tipoProducto: "Desde solicitud",
        mensaje: modalVer.datos.detalle,
        fecha: new Date(),
      };
      await axios.post("/api/ordenes-compra", orden);
      alert("Orden de compra creada con éxito");
      setModalVer({ open: false, datos: null });
    } catch (err) {
      console.error("Error al crear orden de compra:", err);
    }
  };

  const handleAgregarNueva = async () => {
    try {
      await axios.post("/api/solicitudes-cotizacion", {
        ...nuevaSolicitud,
        fechaSolicitud: new Date(),
      });
      setModalAgregar(false);
      setNuevaSolicitud({
        nombreSolicitante: "",
        rutSolicitante: "",
        correo: "",
        telefono: "",
        detalle: "",
        estado: "Pendiente",
      });
      fetchSolicitudes();
    } catch (err) {
      console.error("Error al agregar solicitud:", err);
    }
  };

  return (
    <Box sx={{ p: 2 }}>
      <TextField
        label="Buscar por nombre o RUT"
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

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell>RUT</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Teléfono</TableCell>
              <TableCell>Fecha</TableCell>
              <TableCell>Estado</TableCell>
              <TableCell align="center">Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {solicitudes.map((s) => (
              <TableRow key={s.id}>
                <TableCell>{s.nombreSolicitante}</TableCell>
                <TableCell>{s.rutSolicitante}</TableCell>
                <TableCell>{s.correo}</TableCell>
                <TableCell>{s.telefono}</TableCell>
                <TableCell>
                  {new Date(s.fechaSolicitud).toLocaleString()}
                </TableCell>
                <TableCell>{s.estado}</TableCell>
                <TableCell align="center">
                  <IconButton
                    color="primary"
                    onClick={() => setModalVer({ open: true, datos: { ...s } })}
                  >
                    <Visibility />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
            {solicitudes.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} align="center">
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
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Solicitud de Cotización</DialogTitle>
        <DialogContent dividers>
          {modalVer.datos && (
            <>
              <TextField
                label="Nombre"
                value={modalVer.datos.nombreSolicitante}
                fullWidth
                margin="normal"
              />
              <TextField
                label="RUT"
                value={modalVer.datos.rutSolicitante}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Email"
                value={modalVer.datos.correo}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Teléfono"
                value={modalVer.datos.telefono}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Detalle"
                value={modalVer.datos.detalle}
                multiline
                rows={3}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Estado"
                value={modalVer.datos.estado}
                fullWidth
                margin="normal"
                disabled
              />
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setModalVer({ open: false, datos: null })}>
            Cancelar
          </Button>
          <Button
            onClick={handleCrearOrdenCompra}
            variant="contained"
            color="primary"
          >
            Generar Orden de Compra
          </Button>
        </DialogActions>
      </Dialog>

      {/* Botón flotante para agregar */}
      <Fab
        color="primary"
        aria-label="add"
        sx={{ position: "fixed", bottom: 32, right: 32 }}
        onClick={() => setModalAgregar(true)}
      >
        <Add />
      </Fab>

      {/* Modal agregar */}
      <Dialog
        open={modalAgregar}
        onClose={() => setModalAgregar(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Agregar Solicitud</DialogTitle>
        <DialogContent dividers>
          <TextField
            label="Nombre"
            fullWidth
            margin="normal"
            value={nuevaSolicitud.nombreSolicitante}
            onChange={(e) =>
              setNuevaSolicitud((prev) => ({
                ...prev,
                nombreSolicitante: e.target.value,
              }))
            }
          />
          <TextField
            label="RUT"
            fullWidth
            margin="normal"
            value={nuevaSolicitud.rutSolicitante}
            onChange={(e) =>
              setNuevaSolicitud((prev) => ({
                ...prev,
                rutSolicitante: e.target.value,
              }))
            }
          />
          <TextField
            label="Correo"
            fullWidth
            margin="normal"
            value={nuevaSolicitud.correo}
            onChange={(e) =>
              setNuevaSolicitud((prev) => ({
                ...prev,
                correo: e.target.value,
              }))
            }
          />
          <TextField
            label="Teléfono"
            fullWidth
            margin="normal"
            value={nuevaSolicitud.telefono}
            onChange={(e) =>
              setNuevaSolicitud((prev) => ({
                ...prev,
                telefono: e.target.value,
              }))
            }
          />
          <TextField
            label="Detalle"
            fullWidth
            margin="normal"
            multiline
            rows={3}
            value={nuevaSolicitud.detalle}
            onChange={(e) =>
              setNuevaSolicitud((prev) => ({
                ...prev,
                detalle: e.target.value,
              }))
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setModalAgregar(false)}>Cancelar</Button>
          <Button
            onClick={handleAgregarNueva}
            variant="contained"
            color="primary"
          >
            Agregar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default OrdenCompraList;
