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
import UploadFileIcon from "@mui/icons-material/UploadFile";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import DescriptionIcon from "@mui/icons-material/Description";
import logoDimade from "../../../public/imagenes/logo_dimade.png";

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
      modificador: 0,
      total: 0,
      iva: 19,
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
    const pageWidth = doc.internal.pageSize.width;

    // --- Logo ---
    try {
      doc.addImage(logoDimade, "PNG", 14, 12, 25, 25);
    } catch (err) {
      console.error("Error cargando logo:", err);
      doc.setFontSize(12);
      doc.text("[Logo]", 14, 20);
    }

    // --- Empresa info ---
    doc.setFontSize(8);
    doc.text("Rut: 16.458.963-4", 14, 40);
    doc.text("Dirección: Dirección Dimade 35", 14, 45);
    doc.text("Teléfono: +56-9-6523-7854", 14, 50);
    doc.text("Correo: correo@dimade.cl", 14, 55);
    doc.text("Sitio Web: www.dimade.cl", 14, 60);

    // --- Título principal ---
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text("ORDEN DE COMPRA", pageWidth - 14, 20, { align: "right" });

    // --- Fecha y número OC ---
    doc.setFontSize(10);
    const fechaY = 30;
    doc.text("Fecha", pageWidth - 64, fechaY);
    doc.rect(pageWidth - 64, fechaY + 2, 50, 8);
    doc.text(formatFecha(orden.fechaOrden), pageWidth - 39, fechaY + 7, {
      align: "center",
    });

    const ordenY = fechaY + 14;
    doc.text("Número de Orden de Compra", pageWidth - 64, ordenY);
    doc.rect(pageWidth - 64, ordenY + 2, 50, 8);
    doc.text(orden.id || "N/A", pageWidth - 39, ordenY + 7, {
      align: "center",
    });

    // --- Datos cliente/proveedor ---
    let infoY = 75;
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.text("SEÑORES:", 14, infoY);

    doc.setFont("helvetica", "normal");
    infoY += 7;
    doc.text(orden.nombreEmpresa || "[Nombre de empresa]", 16, infoY);
    infoY += 5;
    doc.text(orden.contacto || "[Contacto o Departamento]", 16, infoY);
    infoY += 5;
    doc.text(orden.direccion || "[Dirección]", 16, infoY);
    infoY += 5;
    doc.text(`Rut: ${orden.rutCliente || "N/A"}`, 16, infoY);
    infoY += 5;
    doc.text(`Teléfono: ${orden.telefono || "-"}`, 16, infoY);
    infoY += 5;
    doc.text(`Correo: ${orden.mail || "-"}`, 16, infoY);

    // --- Tabla productos ---
    const productos = (orden.productos || "").split(",").map((item) => {
      const match = item.match(/^(.*?)\s*\*\s*(\d+)\s*:\s*\$(\d+)/);
      if (!match) return ["-", "-", "-"];
      const [_, nombre, cantidad, total] = match;
      return [nombre.trim(), cantidad, `$${total}`];
    });

    autoTable(doc, {
      startY: 120,
      head: [["DETALLE", "CANTIDAD", "TOTAL"]],
      body: productos.length ? productos : [["Sin productos", "", ""]],
      theme: "grid",
      headStyles: { fillColor: "#10567E", textColor: 255, halign: "center" },
      columnStyles: {
        0: { halign: "left" },
        1: { halign: "right" },
        2: { halign: "right" },
      },
    });

    // --- Totales ---
    const finalY = doc.lastAutoTable.finalY + 10;

    const modificador = parseFloat(orden.modificador) || 0; // % de descuento
    const ivaPorcentaje = parseFloat(orden.iva) || 0;
    const subtotal = parseFloat(orden.total) || 0; // Subtotal = bruto

    // 1. IVA
    const iva = subtotal * (ivaPorcentaje / 100);

    // 2. NETO
    const neto = subtotal - iva;

    // 3. DESCUENTO
    const descuento = subtotal * (modificador / 100);

    // 4. TOTAL FINAL
    const totalFinal = subtotal - descuento;

    // --- Redondeo limpio para PDF ---
    const round = (n) => Math.round(n);

    // --- Fila de totales ---
    const drawBoxRow = (y, label, value, isTotal = false) => {
      const boxX = pageWidth - 80;
      const boxWidth = 60;
      doc.setFont("helvetica", isTotal ? "bold" : "normal");
      if (isTotal) {
        doc.setFillColor(220);
        doc.rect(boxX, y, boxWidth, 7, "F");
      } else {
        doc.rect(boxX, y, boxWidth, 7);
      }
      doc.text(label, boxX - 2, y + 5, { align: "right" });
      const monto = formatTotal(round(value));
      doc.text("$", boxX + 2, y + 5);
      doc.text(monto.replace("$", ""), boxX + boxWidth - 2, y + 5, {
        align: "right",
      });
    };

    // --- Impresión final en el PDF ---
    let currentY = finalY;
    drawBoxRow(currentY, "NETO", neto);
    currentY += 7;
    drawBoxRow(currentY, `IVA ${ivaPorcentaje}%`, iva);
    currentY += 7;
    drawBoxRow(currentY, "SUBTOTAL", subtotal);
    currentY += 7;
    drawBoxRow(currentY, `DESCUENTO (${modificador}%)`, descuento);
    currentY += 7;
    drawBoxRow(currentY, "TOTAL", totalFinal, true);

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
      <Tooltip title="Subir PDF">
        <IconButton component="label">
          <input
            type="file"
            hidden
            accept="application/pdf"
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) handleUpload(file, orden.id);
            }}
          />
          <UploadFileIcon sx={{ color: "#4caf50" }} />
        </IconButton>
      </Tooltip>
      <Tooltip title="Descargar PDF">
        <IconButton onClick={() => handleDownload(orden.pdfId)}>
          <PictureAsPdfIcon sx={{ color: "#0288d1" }} />
        </IconButton>
      </Tooltip>
      <Tooltip title="Generar PDF desde datos">
        <IconButton onClick={() => generarPDFOrden(orden)}>
          <DescriptionIcon sx={{ color: "#7b1fa2" }} />
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
              <Box sx={{ mt: 2 }}>
                <Typography variant="h6">{formatTotal(orden.total)}</Typography>

                <Box sx={{ mt: 1 }}>{renderActions(orden)}</Box>
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
                    .filter((key) =>
                      [
                        "id",
                        "rutCliente",
                        "telefono",
                        "mail",
                        "fechaOrden",
                        "total",
                        "estado",
                        "tipo",
                        "pdfId",
                      ].includes(key)
                    )

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
                    .filter(([key]) =>
                      [
                        "id",
                        "rutCliente",
                        "telefono",
                        "mail",
                        "fechaOrden",
                        "total",
                        "estado",
                        "tipo",
                        "pdfId",
                      ].includes(key)
                    )

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
            Object.keys(selectedOrden)
              .filter(
                (key) =>
                  !["_tempProducto", "_tempCantidad", "_tempMonto"].includes(
                    key
                  )
              )
              .map((key) => {
                if (["id", "pdfId"].includes(key)) return null;

                const isReadOnly = modalMode === "view";
                const label = key
                  .replace(/([A-Z])/g, " $1")
                  .replace(/^./, (str) => str.toUpperCase());

                // Selects de estado y tipo
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

                // Campo personalizado de productos (solo en modo nuevo)
                if (key === "productos" && modalMode === "new") {
                  return (
                    <Box key="productos" sx={{ mt: 2 }}>
                      <Typography variant="subtitle2">
                        Agregar Productos
                      </Typography>

                      <Box
                        sx={{
                          display: "flex",
                          gap: 1,
                          mb: 1,
                          flexWrap: "wrap",
                        }}
                      >
                        <TextField
                          label="Producto"
                          size="small"
                          fullWidth
                          value={selectedOrden._tempProducto || ""}
                          onChange={(e) =>
                            setSelectedOrden((prev) => ({
                              ...prev,
                              _tempProducto: e.target.value,
                            }))
                          }
                        />
                        <TextField
                          label="Cantidad"
                          type="number"
                          size="small"
                          value={selectedOrden._tempCantidad || ""}
                          onChange={(e) =>
                            setSelectedOrden((prev) => ({
                              ...prev,
                              _tempCantidad: e.target.value,
                            }))
                          }
                        />
                        <TextField
                          label="Monto"
                          type="number"
                          size="small"
                          value={selectedOrden._tempMonto || ""}
                          onChange={(e) =>
                            setSelectedOrden((prev) => ({
                              ...prev,
                              _tempMonto: e.target.value,
                            }))
                          }
                        />
                        <Button
                          variant="outlined"
                          onClick={() => {
                            const { _tempProducto, _tempCantidad, _tempMonto } =
                              selectedOrden;
                            if (_tempProducto && _tempCantidad && _tempMonto) {
                              const nuevoItem = `${_tempProducto} * ${_tempCantidad} : $${_tempMonto}`;
                              const productosStr = selectedOrden.productos
                                ?.length
                                ? selectedOrden.productos + ", " + nuevoItem
                                : nuevoItem;
                              const totalActual =
                                parseFloat(selectedOrden.total) || 0;
                              const nuevoTotal =
                                totalActual + parseFloat(_tempMonto || 0);
                              setSelectedOrden((prev) => ({
                                ...prev,
                                productos: productosStr,
                                total: nuevoTotal,
                                _tempProducto: "",
                                _tempCantidad: "",
                                _tempMonto: "",
                              }));
                            }
                          }}
                        >
                          +
                        </Button>
                      </Box>

                      <Box sx={{ mt: 1 }}>
                        {selectedOrden.productos
                          ?.split(", ")
                          .map((item, idx) => (
                            <Box
                              key={idx}
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                mb: 0.5,
                                pl: 1,
                                pr: 1,
                                py: 0.5,
                                bgcolor: "#f5f5f5",
                                borderRadius: 1,
                              }}
                            >
                              <Typography variant="body2">{item}</Typography>
                              <IconButton
                                size="small"
                                onClick={() => {
                                  const productosArray = selectedOrden.productos
                                    .split(", ")
                                    .filter((_, i) => i !== idx);
                                  const newProductos =
                                    productosArray.join(", ");
                                  const nuevoTotal = productosArray.reduce(
                                    (acc, str) => {
                                      const match = str.match(/\$(\d+)/);
                                      return match
                                        ? acc + parseFloat(match[1])
                                        : acc;
                                    },
                                    0
                                  );
                                  setSelectedOrden((prev) => ({
                                    ...prev,
                                    productos: newProductos,
                                    total: nuevoTotal,
                                  }));
                                }}
                              >
                                ❌
                              </IconButton>
                            </Box>
                          ))}
                      </Box>

                      <Button
                        variant="outlined"
                        onClick={() => {
                          const {
                            _tempProducto,
                            _tempCantidad,
                            _tempMonto,
                            modificador,
                          } = selectedOrden;

                          if (_tempProducto && _tempCantidad && _tempMonto) {
                            const nuevoItem = `${_tempProducto} * ${_tempCantidad} : $${_tempMonto}`;
                            const productosStr = selectedOrden.productos?.length
                              ? selectedOrden.productos + ", " + nuevoItem
                              : nuevoItem;

                            const productosArray = productosStr.split(", ");
                            const totalBruto = productosArray.reduce(
                              (acc, str) => {
                                const match = str.match(/\$(\d+)/);
                                return match ? acc + parseFloat(match[1]) : acc;
                              },
                              0
                            );

                            const descuento =
                              totalBruto * (parseFloat(modificador || 0) / 100);
                            const totalFinal = totalBruto - descuento;

                            setSelectedOrden((prev) => ({
                              ...prev,
                              productos: productosStr,
                              total: totalFinal,
                              _tempProducto: "",
                              _tempCantidad: "",
                              _tempMonto: "",
                            }));
                          }
                        }}
                      >
                        +
                      </Button>
                    </Box>
                  );
                }

                if (key === "modificador" && !isReadOnly) {
                  return (
                    <TextField
                      key={key}
                      label={label}
                      name={key}
                      type="number"
                      fullWidth
                      margin="dense"
                      value={selectedOrden[key]}
                      onChange={(e) => {
                        const nuevoModificador =
                          parseFloat(e.target.value) || 0;
                        const productosArray = (selectedOrden.productos || "")
                          .split(", ")
                          .filter(Boolean);
                        const totalBruto = productosArray.reduce((acc, str) => {
                          const match = str.match(/\$(\d+)/);
                          return match ? acc + parseFloat(match[1]) : acc;
                        }, 0);
                        const descuento = totalBruto * (nuevoModificador / 100);
                        const totalFinal = totalBruto - descuento;

                        setSelectedOrden((prev) => ({
                          ...prev,
                          modificador: nuevoModificador,
                          total: totalFinal,
                        }));
                      }}
                    />
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
                        ? new Date(selectedOrden[key])
                            .toISOString()
                            .slice(0, 16)
                        : selectedOrden[key]
                    }
                    onChange={isReadOnly ? undefined : handleEditChange}
                    type={
                      key === "fechaOrden"
                        ? "datetime-local"
                        : key === "total" || key === "iva"
                        ? "number"
                        : "text"
                    }
                    InputProps={{ readOnly: isReadOnly }}
                    multiline={["detalle"].includes(key)}
                    rows={["detalle"].includes(key) ? 3 : 1}
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
