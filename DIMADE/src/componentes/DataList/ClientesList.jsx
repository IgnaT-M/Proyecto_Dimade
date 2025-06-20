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
  Button,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ToggleOnIcon from "@mui/icons-material/ToggleOn";
import ToggleOffIcon from "@mui/icons-material/ToggleOff";

const ClientesList = () => {
  const [clientes, setClientes] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const fetchClientes = async () => {
    try {
      const token = localStorage.getItem("jwtToken");
      const res = await fetch("http://localhost:8080/api/clientes", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setClientes(data);
    } catch (err) {
      console.error("Error cargando clientes:", err);
    }
  };

  useEffect(() => {
    fetchClientes();
  }, []);

  const filteredClientes = useMemo(() => {
    return clientes.filter((cliente) =>
      Object.values(cliente).some((val) =>
        String(val).toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [clientes, search]);

  const paginatedClientes = useMemo(() => {
    const start = page * rowsPerPage;
    return filteredClientes.slice(start, start + rowsPerPage);
  }, [filteredClientes, page, rowsPerPage]);

  const handleDelete = async (id) => {
    if (!window.confirm("¿Eliminar cliente?")) return;
    try {
      const token = localStorage.getItem("jwtToken");
      const res = await fetch(`http://localhost:8080/api/clientes/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.ok) {
        setClientes((prev) => prev.filter((c) => c.id !== id));
      }
    } catch (err) {
      console.error("Error al eliminar cliente:", err);
    }
  };

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <Typography variant="h5" fontWeight="bold">
          Lista de Clientes
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
              {Object.keys(paginatedClientes[0] || {}).map((key) => (
                <TableCell key={key}>{key}</TableCell>
              ))}
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedClientes.map((cliente) => (
              <TableRow key={cliente.id}>
                {Object.entries(cliente).map(([k, v]) => (
                  <TableCell key={k}>{String(v)}</TableCell>
                ))}
                <TableCell>
                  <Tooltip title="Ver">
                    <IconButton>
                      <VisibilityIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Editar">
                    <IconButton>
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Eliminar">
                    <IconButton onClick={() => handleDelete(cliente.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title={cliente.activo ? "Desactivar" : "Activar"}>
                    <IconButton>
                      {cliente.activo ? <ToggleOnIcon /> : <ToggleOffIcon />}
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <TablePagination
          component="div"
          count={filteredClientes.length}
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
    </Box>
  );
};

export default ClientesList;
