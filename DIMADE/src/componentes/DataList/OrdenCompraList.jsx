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
  Menu, // Importar Menu para el selector de país
  Snackbar,
  Alert,
} from "@mui/material";
import {
  Search as SearchIcon,
  Visibility as VisibilityIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  Add as AddIcon,
  Download as DownloadIcon,
} from "@mui/icons-material";
<<<<<<< HEAD
import UploadFileIcon from "@mui/icons-material/UploadFile";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import DescriptionIcon from "@mui/icons-material/Description";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import BASE_URL from "../../config/apiConfig";
import logoDimade from "../../../public/imagenes/logo_dimade.png";
=======
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import BASE_URL from "../../config/apiConfig";
>>>>>>> e8aa16ed00c4ff87d8239d92399067968fa540d0

const formatFecha = (dateString) => {
  if (!dateString) return "N/A";
  return new Date(dateString).toLocaleString("es-CL", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

const formatTotal = (amount) => {
  const numberAmount = typeof amount === "number" ? amount : 0;
  return new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
  }).format(numberAmount);
};

export const OrdenCompraList = () => {
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
  const [anchorEl, setAnchorEl] = useState(null);
  const [errors, setErrors] = useState({});

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("info");

  // Estado para el código de país del teléfono y para el menú de selección
  const [codigoPais, setCodigoPais] = useState("+56"); // Valor predeterminado para Chile
  const [anchorElPhonePrefix, setAnchorElPhonePrefix] = useState(null); // Para el menú de prefijos

  const openMenu = Boolean(anchorEl);
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
          orden.email,
          orden.direccion,
          orden.telefono,
          orden.nombre, // Incluir nombre en la búsqueda
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

<<<<<<< HEAD
  const handleMenuClick = (event) => setAnchorEl(event.currentTarget);

  const handleMenuClose = () => setAnchorEl(null);

  const handleAddNew = (orderType) => {
    handleMenuClose();
    handleOpenModal(null, "new", orderType);
  };

=======
>>>>>>> e8aa16ed00c4ff87d8239d92399067968fa540d0
  const handleUpload = async (file, ordenId) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("nombreOrden", ordenId);
<<<<<<< HEAD
    const token = localStorage.getItem("jwtToken");
=======

    const token = localStorage.getItem("jwtToken");

>>>>>>> e8aa16ed00c4ff87d8239d92399067968fa540d0
    const res = await fetch(`${BASE_URL}/api/ordenes-compra/upload`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });
<<<<<<< HEAD
    const pdfId = await res.text();
=======

    const pdfId = await res.text();

>>>>>>> e8aa16ed00c4ff87d8239d92399067968fa540d0
    await fetch(`${BASE_URL}/api/ordenes-compra/${ordenId}/pdf`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ pdfId }),
    });
<<<<<<< HEAD
=======

>>>>>>> e8aa16ed00c4ff87d8239d92399067968fa540d0
    console.log("PDF almacenado para orden:", ordenId);
    await fetchOrdenes();
  };

  const handleDownload = async (pdfId) => {
    if (!pdfId) {
      alert("Esta orden no tiene un PDF asociado.");
      return;
    }
<<<<<<< HEAD
    const token = localStorage.getItem("jwtToken");
=======

    const token = localStorage.getItem("jwtToken");

>>>>>>> e8aa16ed00c4ff87d8239d92399067968fa540d0
    const res = await fetch(
      `${BASE_URL}/api/ordenes-compra/download/${pdfId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
<<<<<<< HEAD
=======

>>>>>>> e8aa16ed00c4ff87d8239d92399067968fa540d0
    if (!res.ok) {
      alert("Error al descargar PDF: " + res.status);
      return;
    }
<<<<<<< HEAD
=======

>>>>>>> e8aa16ed00c4ff87d8239d92399067968fa540d0
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
<<<<<<< HEAD
=======

>>>>>>> e8aa16ed00c4ff87d8239d92399067968fa540d0
      const res = await fetch(`${BASE_URL}/api/ordenes-compra/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
<<<<<<< HEAD
=======

>>>>>>> e8aa16ed00c4ff87d8239d92399067968fa540d0
      if (res.ok) {
        setOrdenes((prev) => prev.filter((o) => o.id !== id));
      }
    } catch (err) {
      console.error("Error al eliminar orden:", err);
    }
  };

  const handleOpenModal = (orden, mode, orderType) => {
    let dataForModal;
    if (mode === "new") {
      const baseData = {
        nombre: "", // Campo de nombre (empresa/contacto)
        telefono: "",
        email: "",
        direccion: "",
        fechaOrden: new Date().toISOString().slice(0, 16),
        productos: [],
        totalSinIva: 0,
        totalConIva: 0,
        descuento: 0,
        totalAPagar: 0,
        estado: "Pendiente",
        detalle: "",
      };
      if (orderType === "Cliente") {
        dataForModal = { rutCliente: "", ...baseData, tipo: "Cliente" };
      } else {
        dataForModal = { rutProveedor: "", ...baseData, tipo: "Proveedor" };
      }
      setCodigoPais("+56"); // Establece el código de país predeterminado al crear una nueva orden
    } else {
      const ordenCorregida = {
        ...orden,
        email: orden.email || "",
        direccion: orden.direccion || "",
        nombre: orden.nombre || "", // Asegura que el nombre exista
      };
      // Extrae el código de país si existe en el teléfono
      const telefonoCompleto = ordenCorregida.telefono || "";
      let foundPrefix = "+56"; // Default to Chile if no prefix found or not in map

      // Find the longest matching prefix
      const prefixes = Object.keys(phonePrefixes).sort(
        (a, b) => b.length - a.length
      );
      for (let prefix of prefixes) {
        if (telefonoCompleto.startsWith(prefix)) {
          foundPrefix = prefix;
          ordenCorregida.telefono = telefonoCompleto.substring(prefix.length); // Guarda solo el número local
          break;
        }
      }
      setCodigoPais(foundPrefix);
      dataForModal = ordenCorregida;
    }
    setSelectedOrden(dataForModal);
    setModalMode(mode);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setSelectedOrden(null);
    setOpenModal(false);
    setErrors({});
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setSelectedOrden((prev) => ({ ...prev, [name]: value }));
  };

  const handleProductChange = (index, event) => {
    const { name, value } = event.target;
    const list = [...selectedOrden.productos];
    const parsedValue = name === "nombre" ? value : parseFloat(value) || 0;
    list[index][name] = parsedValue;
    setSelectedOrden((prev) => ({ ...prev, productos: list }));
  };

  const handleRemoveProduct = (index) => {
    const list = [...selectedOrden.productos];
    list.splice(index, 1);
    setSelectedOrden((prev) => ({ ...prev, productos: list }));
  };

  const handleAddProduct = () => {
    setSelectedOrden((prev) => ({
      ...prev,
      productos: [
        ...prev.productos,
        { nombre: "", cantidad: "", precioUnitario: "" },
      ],
    }));
  };

  useEffect(() => {
    if (selectedOrden && selectedOrden.productos) {
      const totalConIva = selectedOrden.productos.reduce(
        (acc, curr) => acc + (curr.cantidad || 0) * (curr.precioUnitario || 0),
        0
      );
      const totalSinIva = totalConIva / 1.19;
      const descuento = selectedOrden.descuento || 0;
      const totalAPagar = totalConIva * (1 - descuento / 100);

      setSelectedOrden((prev) => ({
        ...prev,
        totalConIva,
        totalSinIva,
        totalAPagar,
      }));
    }
  }, [selectedOrden?.productos, selectedOrden?.descuento]);

  const generarPDFOrden = (orden) => {
    if (!orden) {
      console.error(
        "No se pueden generar el PDF: los datos de la orden son nulos."
      );
      alert("No se pueden generar el PDF porque no hay datos de la orden.");
      return;
    }

    const doc = new jsPDF();
    const pageWidth =
      doc.internal.pageSize.width || doc.internal.pageSize.getWidth();

    try {
      doc.addImage(logoDimade, "PNG", 14, 12, 25, 27);
    } catch (e) {
      console.error("Error al cargar el logo importado:", e);
      doc.text("[Logo]", 14, 20);
    }

    const infoStartY = 45;
    doc.setFontSize(8);
    doc.setFont("helvetica", "normal");
    doc.text("Rut: 16.458.963-4", 14, infoStartY);
    doc.text("Dirección: Dirección Dimade 35", 14, infoStartY + 5);
    doc.text("Teléfono: +56-9-6523-7854", 14, infoStartY + 10);
    doc.text("Correo: correo@dimade.cl", 14, infoStartY + 15);
    doc.text("Sitio Web: www.dimade.cl", 14, infoStartY + 20);

    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.text("ORDEN DE COMPRA", pageWidth - 14, 20, { align: "right" });

    doc.setFontSize(10);
    doc.setDrawColor(0);
    doc.setLineWidth(0.5);

    const firstBlockY = 30;
    doc.setFont("helvetica", "bold");
    doc.text("Fecha", pageWidth - 64, firstBlockY);
    doc.setFont("helvetica", "normal");
    doc.rect(pageWidth - 64, firstBlockY + 2, 50, 8);
    doc.text(
      formatFecha(orden.fechaOrden) || "N/A",
      pageWidth - 39,
      firstBlockY + 7,
      { align: "center" }
    );

    const secondBlockY = firstBlockY + 14;
    doc.setFont("helvetica", "bold");
    doc.text("Número de Orden de Compra", pageWidth - 64, secondBlockY);
    doc.setFont("helvetica", "normal");
    doc.rect(pageWidth - 64, secondBlockY + 2, 50, 8);
    doc.text(`${orden.id || "N/A"}`, pageWidth - 39, secondBlockY + 7, {
      align: "center",
    });

    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.text("SEÑORES:", 14, 75);

    // Ajuste: Usa orden.nombre para el campo de nombre de la empresa/contacto
    doc.setFont("helvetica", "normal");
    doc.text(orden.nombre || "N/A", 16, 82);
    // Eliminado el campo de contacto duplicado que causaba la línea vacía
    doc.text(orden.direccion || "N/A", 16, 87);
    doc.text(`Rut: ${orden.rutCliente || orden.rutProveedor || "N/A"}`, 16, 92);
    doc.text(`Teléfono: ${orden.telefono || "N/A"}`, 16, 97);
    doc.text(`Correo: ${orden.email || "N/A"}`, 16, 102);

    const tableHeaders = [["Detalle", "Cantidad", "Precio Unitario", "Total"]];
    const tableBody =
      Array.isArray(orden.productos) && orden.productos.length > 0
        ? orden.productos.map((p) => [
            p?.nombre || "-",
            p?.cantidad || 0,
            formatTotal(p?.precioUnitario || 0),
            formatTotal((p?.cantidad || 0) * (p?.precioUnitario || 0)),
          ])
        : [["Sin productos", "", "", ""]];

    autoTable(doc, {
      startY: 115,
      head: tableHeaders,
      body: tableBody,
      theme: "grid",
      headStyles: { fillColor: "#10567E", textColor: 255, halign: "center" },
      columnStyles: {
        0: { halign: "left" },
        1: { halign: "right" },
        2: { halign: "right" },
        3: { halign: "right" },
      },
    });

    // Calcular totales para el PDF, incluyendo el descuento
    const currentTableBottomY = doc.lastAutoTable.finalY;
    let currentY = currentTableBottomY + 10;
    const startX = pageWidth - 84;

    const totalBruto = orden.productos.reduce(
      (acc, curr) => acc + (curr.cantidad || 0) * (curr.precioUnitario || 0),
      0
    );
    const netoOrden = totalBruto / 1.19;
    const iva = totalBruto - netoOrden;
    const descuentoPorcentaje =
      typeof orden.descuento === "number" ? orden.descuento : 0;
    const descuentoMonto = totalBruto * (descuentoPorcentaje / 100);
    const totalAPagarConDescuento = totalBruto - descuentoMonto;

    const drawTotalRow = (y, label, value, isTotal = false) => {
      const boxX = startX;
      const boxWidth = 60;
      doc.rect(boxX, y, boxWidth, 7);
      doc.text(label, boxX - 2, y + 5, { align: "right" });

      if (isTotal) {
        doc.setFillColor(200, 200, 200);
        doc.rect(boxX, y, boxWidth, 7, "F");
        doc.setFont("helvetica", "bold");
      }

      const currencyText = formatTotal(typeof value === "number" ? value : 0);
      const symbol = currencyText.charAt(0);
      const numberText = currencyText.substring(1).trim();

      doc.text(symbol, boxX + 2, y + 5);
      doc.text(numberText, boxX + boxWidth - 2, y + 5, { align: "right" });

      doc.setFont("helvetica", "normal");
    };

    drawTotalRow(currentY, "NETO", netoOrden);
    currentY += 7;
    drawTotalRow(currentY, "IVA 19%", iva);
    currentY += 7;
    // Agregar fila de Descuento si aplica
    if (descuentoMonto > 0) {
      drawTotalRow(
        currentY,
        `Descuento (${descuentoPorcentaje}%)`,
        -descuentoMonto
      ); // Muestra el descuento como negativo
      currentY += 7;
    }
    drawTotalRow(currentY, "TOTAL", totalAPagarConDescuento, true); // Usar el total con descuento

    doc.save(`orden-${orden.id || "sin-id"}.pdf`);
  };

  const phonePrefixes = {
    "+1": "Estados Unidos / Canadá",
    "+7": "Rusia",
    "+20": "Egipto",
    "+27": "Sudáfrica",
    "+30": "Grecia",
    "+31": "Países Bajos",
    "+32": "Bélgica",
    "+33": "Francia",
    "+34": "España",
    "+39": "Italia",
    "+44": "Reino Unido",
    "+49": "Alemania",
    "+51": "Perú",
    "+52": "México",
    "+53": "Cuba",
    "+54": "Argentina",
    "+55": "Brasil",
    "+56": "Chile",
    "+57": "Colombia",
    "+58": "Venezuela",
    "+591": "Bolivia",
    "+593": "Ecuador",
    "+595": "Paraguay",
    "+598": "Uruguay",
    "+60": "Malasia",
    "+61": "Australia",
    "+62": "Indonesia",
    "+63": "Filipinas",
    "+64": "Nueva Zelanda",
    "+65": "Singapur",
    "+66": "Tailandia",
    "+81": "Japón",
    "+82": "Corea del Sur",
    "+86": "China",
    "+90": "Turquía",
    "+91": "India",
    "+92": "Pakistán",
    "+93": "Afganistán",
    "+94": "Sri Lanka",
    "+95": "Myanmar",
    "+98": "Irán",
    "+212": "Marruecos",
    "+213": "Argelia",
    "+216": "Túnez",
    "+218": "Libia",
    "+220": "Gambia",
    "+221": "Senegal",
    "+222": "Mauritania",
    "+223": "Mali",
    "+224": "Guinea",
    "+225": "Costa de Marfil",
    "+226": "Burkina Faso",
    "+227": "Níger",
    "+228": "Togo",
    "+229": "Benín",
    "+230": "Mauricio",
    "+231": "Liberia",
    "+232": "Sierra Leona",
    "+233": "Ghana",
    "+234": "Nigeria",
    "+235": "Chad",
    "+236": "República Centroafricana",
    "+237": "Camerún",
    "+238": "Cabo Verde",
    "+239": "Santo Tomé y Príncipe",
    "+240": "Guinea Ecuatorial",
    "+241": "Gabón",
    "+242": "Congo (República del)",
    "+243": "Congo (República Democrática del)",
    "+244": "Angola",
    "+245": "Guinea-Bisáu",
    "+246": "Diego García",
    "+248": "Seychelles",
    "+249": "Sudán",
    "+250": "Ruanda",
    "+251": "Etiopía",
    "+252": "Somalia",
    "+253": "Yibuti",
    "+254": "Kenia",
    "+255": "Tanzania",
    "+256": "Uganda",
    "+257": "Burundi",
    "+258": "Mozambique",
    "+260": "Zambia",
    "+261": "Madagascar",
    "+262": "Reunión / Mayotte",
    "+263": "Zimbabue",
    "+264": "Namibia",
    "+265": "Malawi",
    "+266": "Lesoto",
    "+267": "Botsuana",
    "+268": "Esuatini (Suazilandia)",
    "+269": "Comoras",
    "+290": "Santa Elena",
    "+291": "Eritrea",
    "+297": "Aruba",
    "+298": "Islas Feroe",
    "+299": "Groenlandia",
    "+350": "Gibraltar",
    "+351": "Portugal",
    "+352": "Luxemburgo",
    "+353": "Irlanda",
    "+354": "Islandia",
    "+355": "Albania",
    "+356": "Malta",
    "+357": "Chipre",
    "+358": "Finlandia",
    "+359": "Bulgaria",
    "+370": "Lituania",
    "+371": "Letonia",
    "+372": "Estonia",
    "+373": "Moldavia",
    "+374": "Armenia",
    "+375": "Bielorrusia",
    "+376": "Andorra",
    "+377": "Mónaco",
    "+378": "San Marino",
    "+379": "Ciudad del Vaticano",
    "+380": "Ucrania",
    "+381": "Serbia",
    "+382": "Montenegro",
    "+383": "Kosovo",
    "+385": "Croacia",
    "+386": "Eslovenia",
    "+387": "Bosnia y Herzegovina",
    "+389": "Macedonia del Norte",
    "+420": "República Checa",
    "+421": "Eslovaquia",
    "+423": "Liechtenstein",
    "+670": "Timor Oriental",
    "+672": "Territorios Australianos (Antártida, Isla Norfolk)",
    "+673": "Brunéi",
    "+674": "Nauru",
    "+675": "Papúa Nueva Guinea",
    "+676": "Tonga",
    "+677": "Islas Salomón",
    "+678": "Vanuatu",
    "+679": "Fiyi",
    "+680": "Palaos",
    "+681": "Wallis y Futuna",
    "+682": "Islas Cook",
    "+683": "Niue",
    "+685": "Samoa",
    "+686": "Kiribati",
    "+687": "Nueva Caledonia",
    "+688": "Tuvalu",
    "+689": "Polinesia Francesa",
    "+690": "Tokelau",
    "+691": "Micronesia",
    "+692": "Islas Marshall",
    // Agrega más países y sus códigos si es necesario.
    // Esta lista es bastante exhaustiva, pero si necesitas un país específico que falte, puedes añadirlo.
  };

  const handlePhonePrefixClick = (event) => {
    setAnchorElPhonePrefix(event.currentTarget);
  };

  const handlePhonePrefixClose = () => {
    setAnchorElPhonePrefix(null);
  };

  const handleSelectPhonePrefix = (prefix) => {
    setCodigoPais(prefix);
    handlePhonePrefixClose();
  };

  const validate = (orden) => {
    const tempErrors = {};
    const rutRegex = /^\d{7,8}-[\dkK]$/; // Regex para RUT sin puntos, solo con guion
    const mailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Validación del teléfono: se valida el número completo con el prefijo
    const telefonoCompleto = selectedOrden.telefono
      ? `${codigoPais}${selectedOrden.telefono}`
      : "";
    // Una regex más general para números de teléfono con prefijo internacional
    // Permitir números de 6 a 14 dígitos después del prefijo
    const telefonoRegex = /^\+\d{1,4}\d{6,14}$/;

    if (orden.rutCliente && !rutRegex.test(orden.rutCliente)) {
      tempErrors.rutCliente = "Formato incorrecto. Ej: 12345678-9";
    }
    if (orden.rutProveedor && !rutRegex.test(orden.rutProveedor)) {
      tempErrors.rutProveedor = "Formato incorrecto. Ej: 12345678-9";
    }
    if (orden.email && !mailRegex.test(orden.email)) {
      tempErrors.email = "El formato del correo es inválido.";
    }
    // Solo validar si el campo de teléfono no está vacío, para permitir campos opcionales
    if (selectedOrden.telefono && !telefonoRegex.test(telefonoCompleto)) {
      tempErrors.telefono = "Formato de teléfono incorrecto. Ej: +56912345678";
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
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
    // Concatena el código de país con el número antes de guardar
    const telefonoFinal = selectedOrden.telefono
      ? `${codigoPais}${selectedOrden.telefono}`
      : "";
    const ordenToSave = { ...selectedOrden, telefono: telefonoFinal };

    if (!validate(ordenToSave)) {
      // Valida con el número completo
      setSnackbarMessage("Por favor, corrige los errores en el formulario.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      return;
    }

    try {
      const payload = { ...ordenToSave, total: selectedOrden.totalAPagar }; // Usa ordenToSave aquí
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
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        await fetchOrdenes();
        handleCloseModal();
        setSnackbarMessage(
          `Orden ${modalMode === "new" ? "creada" : "actualizada"} con éxito.`
        );
        setSnackbarSeverity("success");
        setSnackbarOpen(true);
      } else {
        setSnackbarMessage("Hubo un error al guardar la orden.");
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
        console.error(
          "Error al guardar la orden:",
          res.status,
          await res.text()
        );
      }
    } catch (err) {
      setSnackbarMessage("Error de conexión al guardar la orden.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      console.error("Error en la función handleSave:", err);
    }
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
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
          <DeleteIcon color="error" />
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
    width: { xs: "90%", md: 700 },
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    borderRadius: 2,
    maxHeight: "90vh",
    overflowY: "auto",
  };

  // Actualización: Añadida columna para el nombre del solicitante
  const tableColumns = [
    { id: "id", label: "ID" },
    { id: "nombre", label: "Nombre Solicitante" }, // Nueva columna para el nombre
    { id: "tipo", label: "Tipo" },
    { id: "rut", label: "RUT" },
    { id: "email", label: "Email" },
    { id: "fechaOrden", label: "Fecha" },
    { id: "estado", label: "Estado" },
    { id: "totalAPagar", label: "Total" },
  ];

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
            onClick={handleMenuClick}
            aria-controls={openMenu ? "add-order-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={openMenu ? "true" : undefined}
          >
            Agregar
          </Button>
          <Menu
            id="add-order-menu"
            anchorEl={anchorEl}
            open={openMenu}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={() => handleAddNew("Cliente")}>
              Orden de Cliente
            </MenuItem>
            <MenuItem onClick={() => handleAddNew("Proveedor")}>
              Orden de Proveedor
            </MenuItem>
          </Menu>
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
                Nombre Solicitante: <strong>{orden.nombre || "N/A"}</strong>
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Email: <strong>{orden.email || "N/A"}</strong>
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Dirección: <strong>{orden.direccion || "N/A"}</strong>
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Teléfono: <strong>{orden.telefono || "N/A"}</strong>
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
                <Typography variant="h6">
                  {formatTotal(orden.totalAPagar || orden.totalConIva)}
                </Typography>
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
                {tableColumns.map((column) => (
                  <TableCell key={column.id}>{column.label}</TableCell>
                ))}
                <TableCell align="right">Acciones</TableCell>

              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedOrdenes.map((orden) => (
                <TableRow
                  key={orden.id}
                  hover
                  sx={{
                    "&:nth-of-type(even)": {
                      backgroundColor: theme.palette.action.hover,
                    },
                  }}
                >
                  {tableColumns.map((column) => {
                    let value;
                    if (column.id === "rut") {
                      value =
                        orden.tipo === "Proveedor"
                          ? orden.rutProveedor
                          : orden.rutCliente;
                    } else {
                      value = orden[column.id];
                    }

                    return (
                      <TableCell key={column.id}>
                        {column.id === "estado" ? (
                          <Chip
                            label={value}
                            color={getEstadoColor(value)}
                            size="small"
                          />
                        ) : column.id === "totalAPagar" ? (
                          formatTotal(value)
                        ) : column.id === "fechaOrden" ? (
                          formatFecha(value)
                        ) : (
                          value || ""
                        )}
                      </TableCell>
                    );
                  })}
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

          {selectedOrden && (
            <>
              {(() => {
                const isReadOnly = modalMode === "view";
                return (
                  <Box>
                    {selectedOrden.tipo === "Cliente" && (
                      <TextField
                        label="RUT Cliente"
                        name="rutCliente"
                        fullWidth
                        margin="dense"
                        value={selectedOrden.rutCliente || ""}
                        onChange={handleEditChange}
                        error={!!errors.rutCliente}
                        helperText={errors.rutCliente}
                        InputProps={{ readOnly: isReadOnly }}
                      />
                    )}
                    {selectedOrden.tipo === "Proveedor" && (
                      <TextField
                        label="RUT Proveedor"
                        name="rutProveedor"
                        fullWidth
                        margin="dense"
                        value={selectedOrden.rutProveedor || ""}
                        onChange={handleEditChange}
                        error={!!errors.rutProveedor}
                        helperText={errors.rutProveedor}
                        InputProps={{ readOnly: isReadOnly }}
                      />
                    )}
                    {/* Campo para Nombre de Empresa / Contacto */}
                    <TextField
                      label="Nombre de Empresa / Contacto"
                      name="nombre"
                      fullWidth
                      margin="dense"
                      value={selectedOrden.nombre || ""}
                      onChange={handleEditChange}
                      InputProps={{ readOnly: isReadOnly }}
                    />
                    <TextField
                      label="Email"
                      name="email"
                      type="email"
                      fullWidth
                      margin="dense"
                      value={selectedOrden.email || ""}
                      onChange={handleEditChange}
                      error={!!errors.email}
                      helperText={errors.email}
                      InputProps={{ readOnly: isReadOnly }}
                    />
                    {/* Campo de Teléfono con Adornment para el prefijo */}
                    <TextField
                      label="Teléfono"
                      name="telefono"
                      fullWidth
                      margin="dense"
                      value={selectedOrden.telefono || ""}
                      onChange={handleEditChange}
                      error={!!errors.telefono}
                      helperText={errors.telefono}
                      InputProps={{
                        readOnly: isReadOnly,
                        startAdornment: (
                          <InputAdornment position="start">
                            <Button
                              onClick={handlePhonePrefixClick}
                              disabled={isReadOnly}
                              sx={{
                                minWidth: 0,
                                padding: "4px 8px",
                                textTransform: "none",
                                color: "inherit",
                              }}
                            >
                              {codigoPais}
                            </Button>
                            <Menu
                              anchorEl={anchorElPhonePrefix}
                              open={Boolean(anchorElPhonePrefix)}
                              onClose={handlePhonePrefixClose}
                              PaperProps={{
                                style: {
                                  maxHeight: 200, // Altura máxima para hacer scroll
                                  width: "20ch", // Ancho del menú
                                },
                              }}
                            >
                              {Object.entries(phonePrefixes).map(
                                ([prefix, countryName]) => (
                                  <MenuItem
                                    key={prefix}
                                    onClick={() =>
                                      handleSelectPhonePrefix(prefix)
                                    }
                                  >
                                    {countryName} ({prefix})
                                  </MenuItem>
                                )
                              )}
                            </Menu>
                          </InputAdornment>
                        ),
                      }}
                    />
                    {/* Campo de Dirección */}
                    <TextField
                      label="Dirección"
                      name="direccion"
                      fullWidth
                      margin="dense"
                      value={selectedOrden.direccion || ""}
                      onChange={handleEditChange}
                      InputProps={{ readOnly: isReadOnly }}
                    />
                    <TextField
                      label="Fecha de Orden"
                      name="fechaOrden"
                      fullWidth
                      margin="dense"
                      type="datetime-local"
                      value={
                        selectedOrden.fechaOrden
                          ? new Date(selectedOrden.fechaOrden)
                              .toISOString()
                              .slice(0, 16)
                          : ""
                      }
                      onChange={handleEditChange}
                      InputProps={{ readOnly: isReadOnly }}
                      InputLabelProps={{ shrink: true }}
                    />
                    <TextField
                      label="Estado"
                      name="estado"
                      select
                      fullWidth
                      margin="dense"
                      value={selectedOrden.estado}
                      onChange={handleEditChange}
                      InputProps={{ readOnly: isReadOnly }}
                    >
                      {["Pendiente", "Aprobada", "Rechazada"].map((opt) => (
                        <MenuItem key={opt} value={opt}>
                          {opt}
                        </MenuItem>
                      ))}
                    </TextField>
                    <TextField
                      label="Descuento"
                      name="descuento"
                      type="number"
                      fullWidth
                      margin="dense"
                      value={selectedOrden.descuento || ""}
                      onChange={handleEditChange}
                      InputProps={{
                        readOnly: isReadOnly,
                        endAdornment: (
                          <InputAdornment position="end">%</InputAdornment>
                        ),
                      }}
                    />
                  </Box>
                );
              })()}

              <Typography variant="subtitle1" mt={2} mb={1}>
                Productos
              </Typography>
              {selectedOrden.productos.map((product, index) => (
                <Box
                  key={index}
                  display="flex"
                  gap={1}
                  alignItems="center"
                  mb={1}
                >
                  <TextField
                    name="nombre"
                    label="Detalle Producto"
                    variant="outlined"
                    size="small"
                    value={product.nombre}
                    onChange={(e) => handleProductChange(index, e)}
                    disabled={modalMode === "view"}
                    sx={{ flexGrow: 1 }}
                  />
                  <TextField
                    name="cantidad"
                    label="Cant."
                    type="number"
                    variant="outlined"
                    size="small"
                    value={product.cantidad}
                    onChange={(e) => handleProductChange(index, e)}
                    disabled={modalMode === "view"}
                    sx={{ width: "80px" }}
                  />
                  <TextField
                    name="precioUnitario"
                    label="Precio Unit."
                    type="number"
                    variant="outlined"
                    size="small"
                    value={product.precioUnitario}
                    onChange={(e) => handleProductChange(index, e)}
                    disabled={modalMode === "view"}
                    sx={{ width: "120px" }}
                  />
                  {modalMode !== "view" && (
                    <Tooltip title="Eliminar Producto">
                      <IconButton
                        onClick={() => handleRemoveProduct(index)}
                        sx={{ color: "#f57c00" }} // Color naranja para el ícono
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  )}
                </Box>
              ))}

              {modalMode !== "view" && (
                <Button
                  startIcon={<AddIcon />}
                  onClick={handleAddProduct}
                  variant="outlined"
                  size="small"
                  sx={{ mt: 1 }}
                >
                  Agregar Producto
                </Button>
              )}

              <TextField
                label="Detalles Generales de la Orden"
                name="detalle"
                fullWidth
                margin="dense"
                value={selectedOrden.detalle || ""}
                onChange={handleEditChange}
                InputProps={{ readOnly: modalMode === "view" }}
                multiline
                rows={3}
                sx={{ mt: 3 }}
              />

              <Box display="flex" gap={2} mt={2}>
                <TextField
                  label="Total Neto"
                  value={formatTotal(selectedOrden.totalSinIva)}
                  InputProps={{ readOnly: true }}
                  fullWidth
                />
                <TextField
                  label="Total con IVA"
                  value={formatTotal(selectedOrden.totalConIva)}
                  InputProps={{ readOnly: true }}
                  fullWidth
                />
                <TextField
                  label="Total a Pagar"
                  value={formatTotal(selectedOrden.totalAPagar)}
                  InputProps={{ readOnly: true }}
                  fullWidth
                />
              </Box>

              {modalMode !== "view" && (
                <Box sx={{ mt: 3, textAlign: "right" }}>
                  <Button variant="contained" onClick={handleSave}>
                    Guardar
                  </Button>
                </Box>
              )}
            </>
          )}
        </Box>
      </Modal>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};
