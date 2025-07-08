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
      setOrdenes(Array.isArray(data) ? data : [data]);
    } catch (err) {
      console.error("Error cargando órdenes de compra:", err);
    }
  };

  const filteredOrdenes = useMemo(() => {
    return ordenes
      .filter((orden) => {
        const matchesSearch = Object.values(orden).some((val) =>
          String(val).toLowerCase().includes(search.toLowerCase())
        );
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
    if (mode === "new") {
      setSelectedOrden({
        rutProveedor: "",
        rutCliente: "",
        telefono: "",
        mail: "",
        fechaOrden: new Date(),
        productos: "",
        total: 0,
        estado: "Pendiente",
        tipo: "Cliente",
        detalle: "",
      });
    } else {
      setSelectedOrden(orden);
    }
    setModalMode(mode);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setSelectedOrden(null);
    setOpenModal(false);
  };

  const handleEditChange = (e) => {
    setSelectedOrden((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
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
        body: JSON.stringify({
          ...selectedOrden,
          fechaOrden: new Date(selectedOrden.fechaOrden),
        }),
      });

      if (res.ok) {
        await fetchOrdenes();
        handleCloseModal();
      }
    } catch (err) {
      console.error("Error al guardar orden:", err);
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
          gap: 1,
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
          <FormControl size="small">
            <InputLabel>Estado</InputLabel>
            <Select
              value={estadoFiltro}
              label="Estado"
              onChange={(e) => setEstadoFiltro(e.target.value)}
              sx={{ minWidth: 120 }}
            >
              <MenuItem value="todos">Todos</MenuItem>
              <MenuItem value="Pendiente">Pendiente</MenuItem>
              <MenuItem value="Aprobada">Aprobada</MenuItem>
              <MenuItem value="Rechazada">Rechazada</MenuItem>
            </Select>
          </FormControl>
          <FormControl size="small">
            <InputLabel>Tipo</InputLabel>
            <Select
              value={tipoFiltro}
              label="Tipo"
              onChange={(e) => setTipoFiltro(e.target.value)}
              sx={{ minWidth: 120 }}
            >
              <MenuItem value="todos">Todos</MenuItem>
              <MenuItem value="Cliente">Cliente</MenuItem>
              <MenuItem value="Proveedor">Proveedor</MenuItem>
              <MenuItem value="Otros">Otros</MenuItem>
            </Select>
          </FormControl>
          <FormControl size="small">
            <InputLabel>Orden</InputLabel>
            <Select
              value={ordenFecha}
              label="Orden"
              onChange={(e) => setOrdenFecha(e.target.value)}
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
              {paginatedOrdenes[0] &&
                Object.keys(paginatedOrdenes[0])
                  .filter((key) => key !== "productos" && key !== "detalle")
                  .map((key) => <TableCell key={key}>{key}</TableCell>)}
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedOrdenes.map((orden) => (
              <TableRow key={orden.id}>
                {Object.entries(orden)
                  .filter(([k]) => k !== "productos" && k !== "detalle")
                  .map(([k, v]) => (
                    <TableCell key={k}>
                      {k === "fechaOrden"
                        ? new Date(v).toLocaleString([], {
                            dateStyle: "short",
                            timeStyle: "short",
                          })
                        : String(v)}
                    </TableCell>
                  ))}
                <TableCell>
                  <Tooltip title="Ver">
                    <IconButton onClick={() => handleOpenModal(orden, "view")}>
                      {" "}
                      <VisibilityIcon sx={{ color: "#1976d2" }} />{" "}
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Editar">
                    <IconButton onClick={() => handleOpenModal(orden, "edit")}>
                      {" "}
                      <EditIcon sx={{ color: "#f57c00" }} />{" "}
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Eliminar">
                    <IconButton onClick={() => handleDelete(orden.id)}>
                      {" "}
                      <DeleteIcon sx={{ color: "#d32f2f" }} />{" "}
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Subir PDF">
                    <IconButton component="label">
                      <input
                        type="file"
                        accept="application/pdf"
                        hidden
                        onChange={(e) => {
                          if (e.target.files.length > 0) {
                            handleUpload(e.target.files[0], orden.id);
                          }
                        }}
                      />
                      <AddIcon sx={{ color: "#388e3c" }} />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Descargar PDF">
                    <IconButton onClick={() => handleDownload(orden.pdfId)}>
                      {" "}
                      <DownloadIcon sx={{ color: "#0288d1" }} />{" "}
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Generar PDF desde datos">
                    <IconButton onClick={() => generarPDFOrden(orden)}>
                      <DownloadIcon sx={{ color: "#6a1b9a" }} />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          component="div"
          count={filteredOrdenes.length}
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
              ? "Ver Orden"
              : modalMode === "edit"
              ? "Editar Orden"
              : "Nueva Orden"}
          </Typography>
          {selectedOrden &&
            [
              "rutProveedor",
              "rutCliente",
              "telefono",
              "mail",
              "total",
              "estado",
              "tipo",
              "detalle",
              "fechaOrden",
            ].map((key) => {
              const isReadOnly = modalMode === "view" || key === "id";

              if (key === "estado") {
                return (
                  <TextField
                    key={key}
                    label="Estado"
                    name="estado"
                    select
                    fullWidth
                    margin="dense"
                    value={selectedOrden.estado}
                    onChange={isReadOnly ? undefined : handleEditChange}
                    InputProps={{ readOnly: isReadOnly }}
                  >
                    <MenuItem value="Pendiente">Pendiente</MenuItem>
                    <MenuItem value="Aprobada">Aprobada</MenuItem>
                    <MenuItem value="Rechazada">Rechazada</MenuItem>
                  </TextField>
                );
              }

              if (key === "tipo") {
                return (
                  <TextField
                    key={key}
                    label="Tipo"
                    name="tipo"
                    select
                    fullWidth
                    margin="dense"
                    value={selectedOrden.tipo}
                    onChange={isReadOnly ? undefined : handleEditChange}
                    InputProps={{ readOnly: isReadOnly }}
                  >
                    <MenuItem value="Cliente">Cliente</MenuItem>
                    <MenuItem value="Proveedor">Proveedor</MenuItem>
                    <MenuItem value="Otros">Otros</MenuItem>
                  </TextField>
                );
              }

              return (
                <TextField
                  key={key}
                  label={key}
                  name={key}
                  fullWidth
                  margin="dense"
                  value={
                    key === "fechaOrden"
                      ? new Date(selectedOrden[key]).toISOString().slice(0, 16)
                      : selectedOrden[key]
                  }
                  onChange={isReadOnly ? undefined : handleEditChange}
                  type={key === "fechaOrden" ? "datetime-local" : "text"}
                  InputProps={{ readOnly: isReadOnly }}
                  multiline={key === "detalle"}
                  minRows={key === "detalle" ? 3 : undefined}
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
