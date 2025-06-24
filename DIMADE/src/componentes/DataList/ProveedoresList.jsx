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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ToggleOnIcon from "@mui/icons-material/ToggleOn";
import ToggleOffIcon from "@mui/icons-material/ToggleOff";

const ProveedoresList = () => {
  const [proveedores, setProveedores] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [modalProveedor, setModalProveedor] = useState({
    open: false,
    datos: null,
  });

  const fetchProveedores = async () => {
    try {
      const token = localStorage.getItem("jwtToken");
      const res = await fetch("http://localhost:8080/api/proveedores", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setProveedores(data);
    } catch (err) {
      console.error("Error cargando proveedores:", err);
    }
  };

  useEffect(() => {
    fetchProveedores();
  }, []);

  const filteredProveedores = useMemo(() => {
    return proveedores.filter((proveedor) =>
      Object.values(proveedor).some((val) =>
        String(val).toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [proveedores, search]);

  const paginatedProveedores = useMemo(() => {
    const start = page * rowsPerPage;
    return filteredProveedores.slice(start, start + rowsPerPage);
  }, [filteredProveedores, page, rowsPerPage]);

  const handleDelete = async (id) => {
    if (!window.confirm("¿Eliminar proveedor?")) return;
    try {
      const token = localStorage.getItem("jwtToken");
      const res = await fetch(`http://localhost:8080/api/proveedores/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.ok) {
        setProveedores((prev) => prev.filter((p) => p.id !== id));
      }
    } catch (err) {
      console.error("Error al eliminar proveedor:", err);
    }
  };

  const handleGuardarCambios = async () => {
    try {
      const token = localStorage.getItem("jwtToken");
      const res = await fetch(
        `http://localhost:8080/api/proveedores/${modalProveedor.datos.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(modalProveedor.datos),
        }
      );
      if (res.ok) {
        fetchProveedores();
        setModalProveedor({ open: false, datos: null });
      }
    } catch (err) {
      console.error("Error al actualizar proveedor:", err);
    }
  };

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <Typography variant="h5" fontWeight="bold">
          Lista de Proveedores
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
      </Box>

      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              {Object.keys(paginatedProveedores[0] || {}).map((key) => (
                <TableCell key={key}>{key}</TableCell>
              ))}
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedProveedores.map((proveedor) => (
              <TableRow key={proveedor.id}>
                {Object.entries(proveedor).map(([k, v]) => (
                  <TableCell key={k}>{String(v)}</TableCell>
                ))}
                <TableCell>
                  <Tooltip title="Ver / Editar">
                    <IconButton
                      onClick={() =>
                        setModalProveedor({
                          open: true,
                          datos: { ...proveedor },
                        })
                      }
                    >
                      <VisibilityIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Editar">
                    <IconButton
                      onClick={() =>
                        setModalProveedor({
                          open: true,
                          datos: { ...proveedor },
                        })
                      }
                    >
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Eliminar">
                    <IconButton onClick={() => handleDelete(proveedor.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title={proveedor.activo ? "Desactivar" : "Activar"}>
                    <IconButton>
                      {proveedor.activo ? <ToggleOnIcon /> : <ToggleOffIcon />}
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <TablePagination
          component="div"
          count={filteredProveedores.length}
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

      {/* Modal Ver/Editar Proveedor */}
      <Dialog
        open={modalProveedor.open}
        onClose={() => setModalProveedor({ open: false, datos: null })}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Detalle del Proveedor</DialogTitle>
        <DialogContent dividers>
          <TextField
            label="Nombre"
            value={modalProveedor.datos?.nombre || ""}
            fullWidth
            margin="normal"
            onChange={(e) =>
              setModalProveedor((prev) => ({
                ...prev,
                datos: { ...prev.datos, nombre: e.target.value },
              }))
            }
          />
          <TextField
            label="Email"
            value={modalProveedor.datos?.email || ""}
            fullWidth
            margin="normal"
            onChange={(e) =>
              setModalProveedor((prev) => ({
                ...prev,
                datos: { ...prev.datos, email: e.target.value },
              }))
            }
          />
          <TextField
            label="Teléfono"
            value={modalProveedor.datos?.telefono || ""}
            fullWidth
            margin="normal"
            onChange={(e) =>
              setModalProveedor((prev) => ({
                ...prev,
                datos: { ...prev.datos, telefono: e.target.value },
              }))
            }
          />
          <TextField
            label="Empresa"
            value={modalProveedor.datos?.empresa || ""}
            fullWidth
            margin="normal"
            onChange={(e) =>
              setModalProveedor((prev) => ({
                ...prev,
                datos: { ...prev.datos, empresa: e.target.value },
              }))
            }
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setModalProveedor({ open: false, datos: null })}
          >
            Cancelar
          </Button>
          <Button
            onClick={handleGuardarCambios}
            variant="contained"
            color="primary"
          >
            Guardar Cambios
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ProveedoresList;
