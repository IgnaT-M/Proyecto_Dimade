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
  FormControl,
  InputLabel,
  Select,
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
  Download as DownloadIcon,
} from "@mui/icons-material";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import BASE_URL from "../../config/apiConfig";

const formatFecha = (dateString) => {
  if (!dateString) return "N/A";
  return new Date(dateString).toLocaleString("es-CL", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

const formatTotal = (amount) => {
  return new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
  }).format(amount);
};

const OrdenCompraList = () => {
  const [ordenes, setOrdenes] = useState([]);
  const [search, setSearch] = useState("");
  const [estadoFiltro, setEstadoFiltro] = useState("todos");
  const [tipoFiltro, setTipoFiltro] = useState("todos");
  const [ordenFecha, setOrdenFecha] = useState("recientes");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedOrden, setSelectedOrden] = useState(null);
  const [modalMode, setModalMode] = useState("view");
  const [openModal, setOpenModal] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    fetchOrdenes();
  }, []);

  const fetchOrdenes = async () => {
    try {
      const token = localStorage.getItem("jwtToken");
      const res = await fetch(`${BASE_URL}/api/ordenes-compra`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setOrdenes(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error cargando órdenes de compra:", err);
    }
  };

  const filteredOrdenes = useMemo(() => {
    return ordenes
      .filter((orden) => {
        const lowerCaseSearch = search.toLowerCase();
        const searchableText = [
          orden.id,
          orden.rutProveedor,
          orden.rutCliente,
          orden.estado,
          orden.tipo,
          formatTotal(orden.total),
          formatFecha(orden.fechaOrden),
        ]
          .join(" ")
          .toLowerCase();
        const matchesSearch = searchableText.includes(lowerCaseSearch);
        const matchesEstado =
          estadoFiltro === "todos" || orden.estado === estadoFiltro;
        const matchesTipo = tipoFiltro === "todos" || orden.tipo === tipoFiltro;
        return matchesSearch && matchesEstado && matchesTipo;
      })
      .sort((a, b) => {
        const dateA = new Date(a.fechaOrden).getTime();
        const dateB = new Date(b.fechaOrden).getTime();
        return ordenFecha === "recientes" ? dateB - dateA : dateA - dateB;
      });
  }, [ordenes, search, estadoFiltro, tipoFiltro, ordenFecha]);

  const paginatedOrdenes = useMemo(() => {
    const start = page * rowsPerPage;
    return filteredOrdenes.slice(start, start + rowsPerPage);
  }, [filteredOrdenes, page, rowsPerPage]);

  const handleUpload = async (file, ordenId) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("nombreOrden", ordenId);

    const token = localStorage.getItem("jwtToken");

    const res = await fetch(`${BASE_URL}/api/ordenes-compra/upload`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    const pdfId = await res.text();

    await fetch(`${BASE_URL}/api/ordenes-compra/${ordenId}/pdf`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ pdfId }),
    });

    console.log("PDF almacenado para orden:", ordenId);
    await fetchOrdenes();
  };

  const handleDownload = async (pdfId) => {
    if (!pdfId) {
      alert("Esta orden no tiene un PDF asociado.");
      return;
    }

    const token = localStorage.getItem("jwtToken");

    const res = await fetch(
      `${BASE_URL}/api/ordenes-compra/download/${pdfId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!res.ok) {
      alert("Error al descargar PDF: " + res.status);
      return;
    }

    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `orden-${pdfId}.pdf`;
    link.click();
  };

  const handleDelete = async (id) => {
    if (!window.confirm("¿Eliminar orden de compra?")) return;
    try {
      const token = localStorage.getItem("jwtToken");

      const res = await fetch(`${BASE_URL}/api/ordenes-compra/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        setOrdenes((prev) => prev.filter((o) => o.id !== id));
      }
    } catch (err) {
      console.error("Error al eliminar orden:", err);
    }
  };

  const handleOpenModal = (orden, mode) => {
    const initialData = {
      rutProveedor: "",
      rutCliente: "",
      telefono: "",
      mail: "",
      fechaOrden: new Date().toISOString().slice(0, 16),
      productos: "",
      total: 0,
      estado: "Pendiente",
      tipo: "Cliente",
      detalle: "",
    };
    setSelectedOrden(mode === "new" ? initialData : orden);
    setModalMode(mode);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setSelectedOrden(null);
    setOpenModal(false);
  };

  const handleEditChange = (e) => {
    setSelectedOrden((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const generarPDFOrden = (orden) => {
    const doc = new jsPDF();

    // Usar autoTable importado directamente
    autoTable(doc, {
      startY: 100,
      head: [["Producto", "Cantidad", "Precio Unitario", "Subtotal"]],
      body:
        Array.isArray(orden.productos) && orden.productos.length > 0
          ? orden.productos.map((p) => [
              p.nombre || "-",
              p.cantidad || 0,
              `$${p.precioUnitario || 0}`,
              `$${(p.cantidad || 0) * (p.precioUnitario || 0)}`,
            ])
          : [["Sin productos", "", "", ""]],
      styles: { halign: "left" },
      theme: "grid",
    });

    doc.setFontSize(16);
    doc.text("DIMADE - ORDEN DE COMPRA", 14, 20);
    doc.setFontSize(12);
    doc.text(
      `Fecha: ${new Date(orden.fechaOrden).toLocaleDateString()}`,
      14,
      30
    );
    doc.text(`N° Orden: ${orden.id || "Sin ID"}`, 14, 38);

    doc.text("Cliente / Proveedor:", 14, 50);
    doc.text(`RUT Cliente: ${orden.rutCliente || "-"}`, 14, 58);
    doc.text(`RUT Proveedor: ${orden.rutProveedor || "-"}`, 14, 66);
    doc.text(`Teléfono: ${orden.telefono || "-"}`, 14, 74);
    doc.text(`Email: ${orden.mail || "-"}`, 14, 82);

    doc.setFontSize(14);
    doc.text(
      `TOTAL: $${orden.total || 0}`,
      14,
      doc.lastAutoTable?.finalY + 10 || 120
    );

    doc.save(`orden-${orden.id || "sin-id"}.pdf`);
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("jwtToken");
      const url =
        modalMode === "new"
          ? `${BASE_URL}/api/ordenes-compra`
          : `${BASE_URL}/api/ordenes-compra/${selectedOrden.id}`;
      const method = modalMode === "new" ? "POST" : "PUT";
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(selectedOrden),
      });
      if (res.ok) {
        await fetchOrdenes();
        handleCloseModal();
      }
    } catch (err) {
      console.error("Error al guardar orden:", err);
    }
  };

  const renderActions = (orden) => (
    <Box sx={{ display: "flex", justifyContent: "flex-end", flexWrap: "wrap" }}>
      <Tooltip title="Ver">
        <IconButton onClick={() => handleOpenModal(orden, "view")}>
          <VisibilityIcon sx={{ color: "#1976d2" }} />
        </IconButton>
      </Tooltip>
      <Tooltip title="Editar">
        <IconButton onClick={() => handleOpenModal(orden, "edit")}>
          <EditIcon sx={{ color: "#f57c00" }} />
        </IconButton>
      </Tooltip>
      <Tooltip title="Eliminar">
        <IconButton onClick={() => handleDelete(orden.id)}>
          <DeleteIcon sx={{ color: "#d32f2f" }} />
        </IconButton>
      </Tooltip>
    </Box>
  );

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

  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: { xs: "90%", md: 500 },
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    borderRadius: 2,
    maxHeight: "90vh",
    overflowY: "auto",
  };

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
          Órdenes de Compra
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
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Estado</InputLabel>
            <Select
              value={estadoFiltro}
              label="Estado"
              onChange={(e) => setEstadoFiltro(e.target.value)}
            >
              <MenuItem value="todos">Todos</MenuItem>
              <MenuItem value="Pendiente">Pendiente</MenuItem>
              <MenuItem value="Aprobada">Aprobada</MenuItem>
              <MenuItem value="Rechazada">Rechazada</MenuItem>
            </Select>
          </FormControl>
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Tipo</InputLabel>
            <Select
              value={tipoFiltro}
              label="Tipo"
              onChange={(e) => setTipoFiltro(e.target.value)}
            >
              <MenuItem value="todos">Todos</MenuItem>
              <MenuItem value="Cliente">Cliente</MenuItem>
              <MenuItem value="Proveedor">Proveedor</MenuItem>
              <MenuItem value="Otros">Otros</MenuItem>
            </Select>
          </FormControl>
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Orden</InputLabel>
            <Select
              value={ordenFecha}
              label="Orden"
              onChange={(e) => setOrdenFecha(e.target.value)}
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

      {isMobile ? (
        <Box>
          {paginatedOrdenes.map((orden, index) => (
            <Paper
              key={orden.id}
              sx={{
                p: 2,
                mb: 2,
                backgroundColor:
                  index % 2 !== 0 ? theme.palette.action.hover : "inherit",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  mb: 1,
                }}
              >
                <Typography variant="subtitle1" fontWeight="bold">
                  Orden #{orden.id}
                </Typography>
                <Chip
                  label={orden.estado}
                  color={getEstadoColor(orden.estado)}
                  size="small"
                />
              </Box>
              <Typography variant="body2" color="text.secondary">
                {orden.tipo}:{" "}
                <strong>
                  {orden.tipo === "Proveedor"
                    ? orden.rutProveedor
                    : orden.rutCliente}
                </strong>
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Fecha: {formatFecha(orden.fechaOrden)}
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mt: 2,
                }}
              >
                <Typography variant="h6">{formatTotal(orden.total)}</Typography>
                {renderActions(orden)}
              </Box>
            </Paper>
          ))}
        </Box>
      ) : (
        <Paper>
          <Table>
            <TableHead>
              <TableRow>
                {paginatedOrdenes[0] &&
                  Object.keys(paginatedOrdenes[0])
                    .filter((key) => key !== "productos" && key !== "detalle")
                    .map((key) => (
                      <TableCell key={key} sx={{ textTransform: "capitalize" }}>
                        {key}
                      </TableCell>
                    ))}
                <TableCell align="right">Acciones</TableCell>

              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedOrdenes.map((orden) => (
                <TableRow
                  key={orden.id}
                  sx={{
                    "&:nth-of-type(even)": {
                      backgroundColor: theme.palette.action.hover,
                    },
                  }}
                >
                  {Object.entries(orden)
                    .filter(([k]) => k !== "productos" && k !== "detalle")
                    .map(([k, v]) => (
                      <TableCell key={k}>
                        {k === "fechaOrden"
                          ? formatFecha(v)
                          : k === "total"
                          ? formatTotal(v)
                          : String(v)}
                      </TableCell>
                    ))}
                  <TableCell align="right">{renderActions(orden)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      )}

      <TablePagination
        component="div"
        count={filteredOrdenes.length}
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
              ? "Ver Orden"
              : modalMode === "edit"
              ? "Editar Orden"
              : "Nueva Orden"}
          </Typography>
          {selectedOrden &&
            Object.keys(selectedOrden).map((key) => {
              if (key === "id" || key === "productos") return null;
              const isReadOnly = modalMode === "view";
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
                    value={selectedOrden[key]}
                    onChange={isReadOnly ? undefined : handleEditChange}
                    InputProps={{ readOnly: isReadOnly }}
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
                    key === "fechaOrden"
                      ? new Date(selectedOrden[key]).toISOString().slice(0, 16)
                      : selectedOrden[key]
                  }
                  onChange={isReadOnly ? undefined : handleEditChange}
                  type={
                    key === "fechaOrden"
                      ? "datetime-local"
                      : key === "total"
                      ? "number"
                      : "text"
                  }
                  InputProps={{ readOnly: isReadOnly }}
                  multiline={key === "detalle"}
                  rows={key === "detalle" ? 3 : 1}
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
    </Box>
  );
};

export default OrdenCompraList;
