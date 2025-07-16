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
  Menu,
  Snackbar,
  Alert,
} from "@mui/material";
import {
  Search as SearchIcon,
  Visibility as VisibilityIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  Add as AddIcon,
  ShoppingCartCheckout as ShoppingCartCheckoutIcon,
} from "@mui/icons-material";
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
  const numberAmount = typeof amount === "number" ? amount : 0;
  return new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
  }).format(numberAmount);
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
  "+679": "Fiji",
  "+680": "Palau",
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
};

const CotizacionesList = () => {
  const [solicitudes, setSolicitudes] = useState([]);
  const [search, setSearch] = useState("");
  const [estadoFiltro, setEstadoFiltro] = useState("todos");
  const [ordenFecha, setOrdenFecha] = useState("recientes");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selected, setSelected] = useState(null); // Para el modal de solicitud de cotización
  const [modalMode, setModalMode] = useState("view");
  const [openModal, setOpenModal] = useState(false); // Modal de solicitud de cotización
  const [openOrdenModal, setOpenOrdenModal] = useState(false); // Modal de orden de compra
  const [ordenData, setOrdenData] = useState(null); // Datos de la orden de compra en el modal

  // Snackbar state
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [snackbarMessage, setSnackbarMessage] = useState("");

  // Estado para el tipo de solicitud (Cliente/Proveedor) al crear una NUEVA solicitud de cotización
  const [selectedRequestType, setSelectedRequestType] = useState(null);

  // Estados y manejadores para el menú del botón "Agregar" (solicitud de cotización)
  const [anchorElAddButton, setAnchorElAddButton] = useState(null);
  const openAddMenu = Boolean(anchorElAddButton);

  // Estados y manejadores para el prefijo telefónico en el modal de Orden de Compra
  const [codigoPais, setCodigoPais] = useState("+56"); // Valor predeterminado para Chile
  const [anchorElPhonePrefix, setAnchorElPhonePrefix] = useState(null); // Para el menú de prefijos
  const [errors, setErrors] = useState({}); // Para validación del modal de orden de compra

  // Manejadores para abrir/cerrar el menú "Agregar" (solicitud de cotización)
  const handleOpenAddButton = (event) => {
    setAnchorElAddButton(event.currentTarget);
  };

  const handleCloseAddMenu = () => {
    setAnchorElAddButton(null);
  };

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    fetchSolicitudes();
  }, []);

  const fetchSolicitudes = async () => {
    try {
      const token = localStorage.getItem("jwtToken");

      const res = await fetch(`${BASE_URL}/api/solicitudes-cotizacion`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      setSolicitudes(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error al cargar cotizaciones:", err);
    }
  };

  const filtered = useMemo(() => {
    return solicitudes
      .filter((s) => {
        const texto = search.toLowerCase();
        const searchableFields = [
          s.id,
          s.tipo,
          s.nombreSolicitante,
          s.rutSolicitante,
          s.correo,
          s.telefono,
          s.direccion,
          s.detalle,
          s.estado,
          formatFecha(s.fechaSolicitud),
        ];
        const matchesSearch = searchableFields.some((val) =>
          String(val).toLowerCase().includes(texto)
        );
        const matchesEstado =
          estadoFiltro === "todos" || s.estado === estadoFiltro;
        return matchesSearch && matchesEstado;
      })
      .sort((a, b) => {
        const dateA = new Date(a.fechaSolicitud).getTime();
        const dateB = new Date(b.fechaSolicitud).getTime();
        return ordenFecha === "recientes" ? dateB - dateA : dateA - dateB;
      });
  }, [solicitudes, search, estadoFiltro, ordenFecha]);

  const handleDelete = async (id) => {
    if (!window.confirm("¿Eliminar solicitud?")) return;
    try {
      const token = localStorage.getItem("jwtToken");
      await fetch(`${BASE_URL}/api/solicitudes-cotizacion/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchSolicitudes();
      setSnackbarSeverity("success");
      setSnackbarMessage("Solicitud eliminada con éxito.");
      setSnackbarOpen(true);
    } catch (err) {
      setSnackbarSeverity("error");
      setSnackbarMessage("Error al eliminar la solicitud.");
      setSnackbarOpen(true);
      console.error("Error al eliminar:", err);
    }
  };

  // Modificación en handleOpenModal (para solicitud de cotización)
  const handleOpenModal = (item, mode, type = "Cliente") => {
    let productsForModal;
    if (mode === "new") {
      // Para un nuevo formulario de solicitud, inicializa con un producto vacío (con precio unitario en 0)
      productsForModal = [{ detalle: "", cantidad: "", precioUnitario: "" }]; // <-- AGREGADO precioUnitario aquí
    } else {
      // Para ver/editar una solicitud existente, asegúrate de que productosSolicitados sea un array
      productsForModal = Array.isArray(item?.productosSolicitados)
        ? item.productosSolicitados
        : [];
      // Asegura que cada producto tenga las propiedades esperadas, incluso si CotizaForm no las envía
      productsForModal = productsForModal.map((p) => ({
        detalle: p.detalle || "",
        cantidad: p.cantidad || "",
        precioUnitario: p.precioUnitario || "", // Asegura que el precioUnitario exista, inicializa a vacío
      }));
    }

    const initialData = {
      nombreSolicitante: "",
      rutSolicitante: "",
      correo: "",
      telefono: "",
      direccion: "",
      detalle: "",
      estado: "Pendiente",
      tipo: type, // Asigna el tipo directamente al crear
      productosSolicitados: productsForModal, // Usamos los productos preparados
      fechaSolicitud: new Date().toISOString(), // Añade fecha por defecto
    };

    setSelected(
      mode === "new"
        ? initialData
        : { ...item, productosSolicitados: productsForModal }
    );
    setModalMode(mode);
    setOpenModal(true);
    setSelectedRequestType(type); // Guarda el tipo para el título del modal
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelected(null);
    setSelectedRequestType(null);
  };

  // handleChange para el modal de solicitud de cotización (selected)
  const handleChangeSolicitud = (e) => {
    setSelected((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // handleProductChange para el modal de solicitud de cotización (productosSolicitados)
  const handleProductChangeSolicitud = (index, e) => {
    const { name, value } = e.target;
    const newProducts = [...(selected.productosSolicitados || [])];
    // Convierte a número si es cantidad o precioUnitario
    newProducts[index][name] =
      name === "cantidad" || name === "precioUnitario"
        ? parseFloat(value) || (value === "" ? "" : 0) // Permite vacío temporalmente para borrar
        : value;
    setSelected((prev) => ({ ...prev, productosSolicitados: newProducts }));
  };

  const handleAddProductSolicitud = () => {
    setSelected((prev) => ({
      ...prev,
      productosSolicitados: [
        ...(prev.productosSolicitados || []),
        { detalle: "", cantidad: "", precioUnitario: "" }, // <-- AGREGADO precioUnitario al agregar
      ],
    }));
  };

  const handleRemoveProductSolicitud = (index) => {
    const newProducts = [...(selected.productosSolicitados || [])];
    newProducts.splice(index, 1);
    setSelected((prev) => ({ ...prev, productosSolicitados: newProducts }));
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("jwtToken");
      const url =
        modalMode === "new"
          ? `${BASE_URL}/api/solicitudes-cotizacion`
          : `${BASE_URL}/api/solicitudes-cotizacion/${selected.id}`;
      const method = modalMode === "new" ? "POST" : "PUT";

      // Validar productosSolicitados antes de enviar
      const invalidProducts = selected.productosSolicitados.some(
        (p) =>
          !p.detalle ||
          p.cantidad === "" ||
          parseFloat(p.cantidad) <= 0 ||
          (modalMode !== "view" &&
            (p.precioUnitario === "" || parseFloat(p.precioUnitario) <= 0)) // Validar precioUnitario solo si no es vista
      );

      if (invalidProducts) {
        setSnackbarSeverity("error");
        setSnackbarMessage(
          "Asegúrate de que todos los productos tengan detalle, cantidad y precio unitario válidos (mayores a 0)."
        );
        setSnackbarOpen(true);
        return;
      }

      await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...selected,
          // Al guardar la solicitud, se envía detalle, cantidad y precioUnitario
          productosSolicitados: selected.productosSolicitados.map((p) => ({
            detalle: p.detalle,
            cantidad: parseFloat(p.cantidad),
            precioUnitario: parseFloat(p.precioUnitario) || 0, // Asegura que sea un número o 0
          })),
          fechaSolicitud: selected.fechaSolicitud || new Date().toISOString(),
        }),
      });
      await fetchSolicitudes();
      handleCloseModal();
      setSnackbarSeverity("success");
      setSnackbarMessage("Solicitud guardada con éxito.");
      setSnackbarOpen(true);
    } catch (err) {
      setSnackbarSeverity("error");
      setSnackbarMessage("Error al guardar la solicitud.");
      setSnackbarOpen(true);
      console.error("Error al guardar solicitud:", err);
    }
  };

  // --- LÓGICA DEL MODAL DE ORDEN DE COMPRA ---
  const handleCrearOrden = (item) => {
    // Mapear productosSolicitados de la cotización al formato de productos de la orden
    // Si la solicitud de cotización ya tiene precioUnitario (de ser editada previamente en el modal), úsalo.
    // Si no, inicializa a 0 para que el usuario lo pueda ingresar.
    const productsForOrder = Array.isArray(item.productosSolicitados)
      ? item.productosSolicitados.map((prod) => ({
          nombre: prod.detalle || "", // Detalle de cotización es nombre de producto en orden
          cantidad: prod.cantidad || 0,
          precioUnitario: prod.precioUnitario || 0, // <-- Usa el precioUnitario si existe, sino 0
        }))
      : [];

    const initialOrdenData = {
      rutCliente: item.rutSolicitante || "",
      nombre: item.nombreSolicitante || "",
      telefono: "", // Se extraerá el número local, se requiere el prefijo
      email: item.correo || "",
      direccion: item.direccion || "",
      fechaOrden: new Date().toISOString().slice(0, 16),
      productos: productsForOrder, // Usamos los productos mapeados con precioUnitario
      totalSinIva: 0,
      totalConIva: 0,
      descuento: 0,
      totalAPagar: 0,
      estado: "Pendiente",
      tipo: "Cliente",
      detalle: item.detalle || "",
    };

    // Extraer el prefijo del teléfono si existe
    let currentTelefonoSinPrefijo = item.telefono || "";
    let currentPrefijo = "+56"; // Default a Chile
    const prefixes = Object.keys(phonePrefixes).sort(
      (a, b) => b.length - a.length
    );
    for (let prefix of prefixes) {
      if (currentTelefonoSinPrefijo.startsWith(prefix)) {
        currentPrefijo = prefix;
        currentTelefonoSinPrefijo = currentTelefonoSinPrefijo.substring(
          prefix.length
        );
        break;
      }
    }
    setCodigoPais(currentPrefijo);
    initialOrdenData.telefono = currentTelefonoSinPrefijo;

    setOrdenData(initialOrdenData);
    setErrors({}); // Limpiar errores previos
    setOpenOrdenModal(true);
  };

  const handleOrdenChange = (e) => {
    const { name, value } = e.target;
    setOrdenData((prev) => ({ ...prev, [name]: value }));
  };

  const handleProductOrdenChange = (index, event) => {
    const { name, value } = event.target;
    const list = [...(ordenData.productos || [])]; // Asegurar que sea un array
    const parsedValue =
      name === "nombre" ? value : parseFloat(value) || (value === "" ? "" : 0);
    list[index][name] = parsedValue;

    setOrdenData((prev) => ({ ...prev, productos: list }));
  };

  const handleRemoveProductOrden = (index) => {
    const list = [...(ordenData.productos || [])]; // Asegurar que sea un array
    list.splice(index, 1);
    setOrdenData((prev) => ({ ...prev, productos: list }));
  };

  const handleAddProductOrden = () => {
    setOrdenData((prev) => ({
      ...prev,
      productos: [
        ...(prev.productos || []), // Asegurar que sea un array
        { nombre: "", cantidad: "", precioUnitario: "" }, // Inicializar para la orden
      ],
    }));
  };

  // Recalcular totales en el modal de orden al cambiar productos/descuento
  useEffect(() => {
    if (ordenData && ordenData.productos) {
      const totalConIva = ordenData.productos.reduce(
        (acc, curr) =>
          acc +
          (parseFloat(curr.cantidad) || 0) *
            (parseFloat(curr.precioUnitario) || 0),
        0
      );
      const totalSinIva = totalConIva / 1.19;
      const descuento = ordenData.descuento || 0;
      const totalAPagar = totalConIva * (1 - descuento / 100);

      setOrdenData((prev) => ({
        ...prev,
        totalConIva,
        totalSinIva,
        totalAPagar,
      }));
    }
  }, [ordenData?.productos, ordenData?.descuento]);

  const validateOrden = (orden) => {
    const tempErrors = {};
    const rutRegex = /^\d{7,8}-[\dkK]$/;
    const mailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const telefonoCompleto = orden.telefono || "";
    const telefonoRegex = /^\+\d{1,4}\d{6,14}$/;

    if (orden.tipo === "Cliente" && !orden.rutCliente) {
      tempErrors.rutCliente = "El RUT del cliente es obligatorio.";
    } else if (orden.tipo === "Cliente" && !rutRegex.test(orden.rutCliente)) {
      tempErrors.rutCliente = "Formato incorrecto. Ej: 12345678-9";
    }
    if (orden.email && !mailRegex.test(orden.email)) {
      tempErrors.email = "El formato del correo es inválido.";
    }
    if (orden.telefono && !telefonoRegex.test(telefonoCompleto)) {
      tempErrors.telefono = "Formato de teléfono incorrecto. Ej: +56912345678";
    }
    if (!orden.productos || orden.productos.length === 0) {
      tempErrors.productos = "Debe haber al menos un producto.";
    } else {
      orden.productos.forEach((p, index) => {
        if (
          !p.nombre ||
          p.cantidad === "" ||
          parseFloat(p.cantidad) <= 0 ||
          p.precioUnitario === "" ||
          parseFloat(p.precioUnitario) <= 0
        ) {
          tempErrors[`producto-${index}`] =
            "Detalle, cantidad y precio unitario son obligatorios para cada producto y deben ser mayores a 0.";
        }
      });
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSaveOrden = async () => {
    const telefonoFinal = ordenData.telefono
      ? `${codigoPais}${ordenData.telefono}`
      : "";
    const ordenToSave = { ...ordenData, telefono: telefonoFinal };

    if (!validateOrden(ordenToSave)) {
      setSnackbarMessage("Por favor, corrige los errores en el formulario.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      return;
    }

    try {
      const payload = { ...ordenToSave, total: ordenData.totalAPagar };
      const token = localStorage.getItem("jwtToken");
<<<<<<< HEAD
      const BASE_URL = "http://localhost:8080";
=======
>>>>>>> e8aa16ed00c4ff87d8239d92399067968fa540d0
      const res = await fetch(`${BASE_URL}/api/ordenes-compra`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setOpenOrdenModal(false);
        setOrdenData(null);
        setErrors({});
        setSnackbarSeverity("success");
        setSnackbarMessage("Orden creada con éxito.");
        setSnackbarOpen(true);
      } else {
        const errorText = await res.text();
        setSnackbarSeverity("error");
        setSnackbarMessage(`Error al crear la orden: ${errorText}`);
        setSnackbarOpen(true);
        console.error("Error al crear orden", res.status, errorText);
      }
    } catch (err) {
      setSnackbarSeverity("error");
      setSnackbarMessage("Error al guardar orden.");
      setSnackbarOpen(true);
      console.error("Error al guardar orden:", err);
    }
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

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
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

  const renderActions = (item) => (
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-end",
        flexWrap: "wrap",
        alignItems: "center",
      }}
    >
      <Tooltip title="Ver">
        <IconButton onClick={() => handleOpenModal(item, "view")}>
          <VisibilityIcon sx={{ color: "#1976d2" }} />
        </IconButton>
      </Tooltip>
      <Tooltip title="Editar">
        <IconButton onClick={() => handleOpenModal(item, "edit")}>
          <EditIcon sx={{ color: "#f57c00" }} />
        </IconButton>
      </Tooltip>
      <Tooltip title="Eliminar">
        <IconButton onClick={() => handleDelete(item.id)}>
          <DeleteIcon sx={{ color: "#d32f2f" }} />
        </IconButton>
      </Tooltip>
      {item.estado === "Aprobada" && (
        <Tooltip title="Crear Orden de Compra">
          <IconButton onClick={() => handleCrearOrden(item)}>
            <ShoppingCartCheckoutIcon color="success" />
          </IconButton>
        </Tooltip>
      )}
    </Box>
  );

  const paginated = useMemo(
    () => filtered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [filtered, page, rowsPerPage]
  );

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          mb: 2,
          flexDirection: { xs: "column", md: "row" },
          gap: 2,
        }}
      >
        <Typography variant="h5" fontWeight="bold">
          Solicitudes de Cotización
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
          <TextField
            size="small"
            select
            value={estadoFiltro}
            onChange={(e) => setEstadoFiltro(e.target.value)}
            label="Estado"
            sx={{ minWidth: 120 }}
          >
            <MenuItem value="todos">Todos</MenuItem>
            <MenuItem value="Pendiente">Pendiente</MenuItem>
            <MenuItem value="Aprobada">Aprobada</MenuItem>
            <MenuItem value="Rechazada">Rechazada</MenuItem>
          </TextField>
          <TextField
            size="small"
            select
            value={ordenFecha}
            onChange={(e) => setOrdenFecha(e.target.value)}
            label="Orden"
            sx={{ minWidth: 140 }}
          >
            <MenuItem value="recientes">Más recientes</MenuItem>
            <MenuItem value="antiguos">Más antiguos</MenuItem>
          </TextField>
          {/* Nuevo botón "Agregar" con menú desplegable */}
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={handleOpenAddButton}
          >
            Agregar
          </Button>
          <Menu
            id="add-request-menu"
            anchorEl={anchorElAddButton}
            open={openAddMenu}
            onClose={handleCloseAddMenu}
          >
            <MenuItem
              onClick={() => {
                handleOpenModal(null, "new", "Cliente");
                handleCloseAddMenu();
              }}
            >
              Solicitud de Cliente
            </MenuItem>
            <MenuItem
              onClick={() => {
                handleOpenModal(null, "new", "Proveedor");
                handleCloseAddMenu();
              }}
            >
              Solicitud de Proveedor
            </MenuItem>
          </Menu>
        </Box>
      </Box>

      {isMobile ? (
        <Box>
          {paginated.map((s, index) => (
            <Paper
              key={s.id}
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
                  Solicitud #{s.id}
                </Typography>
                <Chip
                  label={s.estado}
                  color={getEstadoColor(s.estado)}
                  size="small"
                />
              </Box>
              <Typography variant="body2">
                <strong>{s.nombreSolicitante}</strong> ({s.rutSolicitante})
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Tipo: {s.tipo || "N/A"} {/* Muestra el tipo */}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Fecha: {formatFecha(s.fechaSolicitud)}
              </Typography>
              <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}>
                {renderActions(s)}
              </Box>
            </Paper>
          ))}
        </Box>
      ) : (
        <Paper>
          <Table>
            <TableHead>
              <TableRow>
                {/* Definir las columnas explícitamente para mayor control y legibilidad */}
                <TableCell>ID</TableCell>
                <TableCell>Tipo</TableCell> {/* Nueva columna para el tipo */}
                <TableCell>Nombre Solicitante</TableCell>
                <TableCell>RUT Solicitante</TableCell>
                <TableCell>Correo</TableCell>
                <TableCell>Teléfono</TableCell>
                <TableCell>Dirección</TableCell>
                <TableCell>Estado</TableCell>
                <TableCell>Fecha Solicitud</TableCell>
                <TableCell align="right">Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginated.map((s) => (
                <TableRow
                  key={s.id}
                  sx={{
                    "&:nth-of-type(even)": {
                      backgroundColor: theme.palette.action.hover,
                    },
                  }}
                >
                  <TableCell>{s.id}</TableCell>
                  <TableCell>{s.tipo || "N/A"}</TableCell>{" "}
                  {/* Muestra el tipo */}
                  <TableCell>{s.nombreSolicitante}</TableCell>
                  <TableCell>{s.rutSolicitante}</TableCell>
                  <TableCell>{s.correo}</TableCell>
                  <TableCell>{s.telefono}</TableCell>
                  <TableCell>{s.direccion}</TableCell>
                  <TableCell>
                    <Chip
                      label={s.estado}
                      color={getEstadoColor(s.estado)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>{formatFecha(s.fechaSolicitud)}</TableCell>
                  <TableCell align="right">{renderActions(s)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      )}

      <TablePagination
        component="div"
        count={filtered.length}
        page={page}
        onPageChange={(_, newPage) => setPage(newPage)}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={(e) =>
          setRowsPerPage(parseInt(e.target.value, 10))
        }
      />

      {/* Modal para ver/editar/crear Solicitudes de Cotización */}
      <Modal open={openModal} onClose={handleCloseModal}>
        <Box sx={modalStyle}>
          <Typography variant="h6" mb={2}>
            {modalMode === "view"
              ? "Ver Solicitud"
              : modalMode === "edit"
              ? "Editar Solicitud"
              : `Nueva Solicitud de ${selectedRequestType || "Cliente"}`}
          </Typography>
          {selected && (
            <>
              <TextField
                label="Tipo de Solicitud"
                name="tipo"
                fullWidth
                margin="dense"
                value={selected.tipo || ""}
                InputProps={{ readOnly: true }} // El tipo no se edita desde aquí
              />
              <TextField
                label="Nombre Solicitante"
                name="nombreSolicitante"
                fullWidth
                margin="dense"
                value={selected.nombreSolicitante || ""}
                onChange={handleChangeSolicitud}
                InputProps={{ readOnly: modalMode === "view" }}
              />
              <TextField
                label="RUT Solicitante"
                name="rutSolicitante"
                fullWidth
                margin="dense"
                value={selected.rutSolicitante || ""}
                onChange={handleChangeSolicitud}
                InputProps={{ readOnly: modalMode === "view" }}
              />
              <TextField
                label="Correo"
                name="correo"
                fullWidth
                margin="dense"
                value={selected.correo || ""}
                onChange={handleChangeSolicitud}
                InputProps={{ readOnly: modalMode === "view" }}
              />
              <TextField
                label="Teléfono"
                name="telefono"
                fullWidth
                margin="dense"
                value={selected.telefono || ""}
                onChange={handleChangeSolicitud}
                InputProps={{ readOnly: modalMode === "view" }}
              />
              <TextField
                label="Dirección"
                name="direccion"
                fullWidth
                margin="dense"
                value={selected.direccion || ""}
                onChange={handleChangeSolicitud}
                InputProps={{ readOnly: modalMode === "view" }}
              />
              <TextField
                label="Detalle"
                name="detalle"
                fullWidth
                margin="dense"
                value={selected.detalle || ""}
                onChange={handleChangeSolicitud}
                multiline
                rows={3}
                InputProps={{ readOnly: modalMode === "view" }}
              />
              {/* SECCIÓN DE PRODUCTOS SOLICITADOS EN EL MODAL DE SOLICITUD DE COTIZACIÓN */}
              <Typography variant="subtitle1" mt={2} mb={1}>
                Productos Solicitados
              </Typography>
              {Array.isArray(selected.productosSolicitados) &&
                selected.productosSolicitados.map((product, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      mb: 1,
                      p: 1, // Añadido padding para visualización
                      border: "1px solid #e0e0e0", // Borde para cada producto
                      borderRadius: 1,
                      flexWrap: "wrap", // Permite que los campos se envuelvan en pantallas pequeñas
                    }}
                  >
                    <TextField
                      margin="dense"
                      name="detalle"
                      label="Detalle Producto"
                      variant="outlined"
                      size="small"
                      value={product.detalle}
                      onChange={(e) => handleProductChangeSolicitud(index, e)}
                      disabled={modalMode === "view"} // Deshabilitado en modo "ver"
                      sx={{
                        flexBasis: { xs: "100%", sm: "calc(60% - 8px)" },
                        flexGrow: 1,
                      }}
                    />
                    <TextField
                      margin="dense"
                      name="cantidad"
                      label="Cant."
                      type="number"
                      variant="outlined"
                      size="small"
                      value={product.cantidad}
                      onChange={(e) => handleProductChangeSolicitud(index, e)}
                      disabled={modalMode === "view"} // Deshabilitado en modo "ver"
                      sx={{
                        flexBasis: { xs: "calc(40% - 8px)", sm: "100px" }, // Ajusta el ancho
                        minWidth: "80px",
                      }}
                    />
                    {(modalMode === "edit" || modalMode === "new") && ( // Solo muestra en editar/nuevo
                      <TextField
                        margin="dense"
                        name="precioUnitario"
                        label="Precio Unit."
                        type="number"
                        variant="outlined"
                        size="small"
                        value={product.precioUnitario}
                        onChange={(e) => handleProductChangeSolicitud(index, e)}
                        sx={{
                          flexBasis: { xs: "calc(50% - 8px)", sm: "120px" }, // Ajusta el ancho
                          minWidth: "80px",
                        }}
                      />
                    )}
                    {modalMode !== "view" && (
                      <Tooltip title="Eliminar Producto">
                        <IconButton
                          onClick={() => handleRemoveProductSolicitud(index)}
                          sx={{ color: "#d32f2f" }}
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
                  onClick={handleAddProductSolicitud}
                  variant="outlined"
                  size="small"
                  sx={{ mt: 1 }}
                >
                  Agregar Producto
                </Button>
              )}
              {/* FIN SECCIÓN DE PRODUCTOS SOLICITADOS */}

              <TextField
                label="Estado"
                name="estado"
                select
                fullWidth
                margin="dense"
                value={selected.estado}
                onChange={handleChangeSolicitud}
                InputProps={{ readOnly: modalMode === "view" }}
              >
                <MenuItem value="Pendiente">Pendiente</MenuItem>
                <MenuItem value="Aprobada">Aprobada</MenuItem>
                <MenuItem value="Rechazada">Rechazada</MenuItem>
              </TextField>

              {modalMode === "view" && (
                <Box mt={2} sx={{ textAlign: "right" }}>
                  {" "}
                  {/* Alineado a la derecha */}
                  <Button variant="contained" onClick={handleCloseModal}>
                    Cerrar
                  </Button>
                </Box>
              )}
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

      {/* Modal para crear Orden de Compra desde Solicitud (copiado de OrdenesCompraList.jsx) */}
      <Modal open={openOrdenModal} onClose={() => setOpenOrdenModal(false)}>
        <Box sx={modalStyle}>
          <Typography variant="h6" mb={2}>
            Nueva Orden de Compra de Cliente
          </Typography>
          {ordenData && (
            <>
              <TextField
                label="RUT Cliente"
                name="rutCliente"
                fullWidth
                margin="dense"
                value={ordenData.rutCliente || ""}
                onChange={handleOrdenChange}
                error={!!errors.rutCliente}
                helperText={errors.rutCliente}
                InputProps={{ readOnly: modalMode === "view" }}
              />
              <TextField
                label="Nombre de Cliente"
                name="nombre"
                fullWidth
                margin="dense"
                value={ordenData.nombre || ""}
                onChange={handleOrdenChange}
                InputProps={{ readOnly: modalMode === "view" }}
              />
              <TextField
                label="Email"
                name="email"
                type="email"
                fullWidth
                margin="dense"
                value={ordenData.email || ""}
                onChange={handleOrdenChange}
                error={!!errors.email}
                helperText={errors.email}
                InputProps={{ readOnly: modalMode === "view" }}
              />
              <TextField
                label="Teléfono"
                name="telefono"
                fullWidth
                margin="dense"
                value={ordenData.telefono || ""}
                onChange={handleOrdenChange}
                error={!!errors.telefono}
                helperText={errors.telefono}
                InputProps={{
                  readOnly: modalMode === "view",
                  startAdornment: (
                    <InputAdornment position="start">
                      <Button
                        onClick={handlePhonePrefixClick}
                        disabled={modalMode === "view"}
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
                            maxHeight: 200,
                            width: "20ch",
                          },
                        }}
                      >
                        {Object.entries(phonePrefixes).map(
                          ([prefix, countryName]) => (
                            <MenuItem
                              key={prefix}
                              onClick={() => handleSelectPhonePrefix(prefix)}
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
              <TextField
                label="Dirección"
                name="direccion"
                fullWidth
                margin="dense"
                value={ordenData.direccion || ""}
                onChange={handleOrdenChange}
                InputProps={{ readOnly: modalMode === "view" }}
              />
              <TextField
                label="Fecha de Orden"
                name="fechaOrden"
                fullWidth
                margin="dense"
                type="datetime-local"
                value={
                  ordenData.fechaOrden
                    ? new Date(ordenData.fechaOrden).toISOString().slice(0, 16)
                    : ""
                }
                onChange={handleOrdenChange}
                InputProps={{ readOnly: modalMode === "view" }}
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                label="Estado"
                name="estado"
                select
                fullWidth
                margin="dense"
                value={ordenData.estado}
                onChange={handleOrdenChange}
                InputProps={{ readOnly: modalMode === "view" }}
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
                value={ordenData.descuento || ""}
                onChange={handleOrdenChange}
                InputProps={{
                  readOnly: modalMode === "view",
                  endAdornment: (
                    <InputAdornment position="end">%</InputAdornment>
                  ),
                }}
              />

              <Typography variant="subtitle1" mt={2} mb={1}>
                Productos de la Orden
              </Typography>
              {Array.isArray(ordenData.productos) &&
                ordenData.productos.map((product, index) => (
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
                      onChange={(e) => handleProductOrdenChange(index, e)}
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
                      onChange={(e) => handleProductOrdenChange(index, e)}
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
                      onChange={(e) => handleProductOrdenChange(index, e)}
                      disabled={modalMode === "view"}
                      sx={{ width: "120px" }}
                    />
                    {modalMode !== "view" && (
                      <Tooltip title="Eliminar Producto">
                        <IconButton
                          onClick={() => handleRemoveProductOrden(index)}
                          sx={{ color: "#f57c00" }}
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
                  onClick={handleAddProductOrden}
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
                value={ordenData.detalle || ""}
                onChange={handleOrdenChange}
                InputProps={{ readOnly: modalMode === "view" }}
                multiline
                rows={3}
                sx={{ mt: 3 }}
              />

              <Box display="flex" gap={2} mt={2}>
                <TextField
                  label="Total Neto"
                  value={formatTotal(ordenData.totalSinIva)}
                  InputProps={{ readOnly: true }}
                  fullWidth
                />
                <TextField
                  label="Total con IVA"
                  value={formatTotal(ordenData.totalConIva)}
                  InputProps={{ readOnly: true }}
                  fullWidth
                />
                <TextField
                  label="Total a Pagar"
                  value={formatTotal(ordenData.totalAPagar)}
                  InputProps={{ readOnly: true }}
                  fullWidth
                />
              </Box>

              {modalMode !== "view" && (
                <Box sx={{ mt: 3, textAlign: "right" }}>
                  <Button variant="contained" onClick={handleSaveOrden}>
                    Guardar Orden
                  </Button>
                </Box>
              )}
              {modalMode === "view" && (
                <Box sx={{ mt: 3, textAlign: "right" }}>
                  <Button
                    variant="contained"
                    onClick={() => setOpenOrdenModal(false)}
                  >
                    Cerrar
                  </Button>
                </Box>
              )}
            </>
          )}
        </Box>
      </Modal>

      {/* Snackbar para notificaciones, se mantiene si es parte del flujo de UX */}
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

export default CotizacionesList;
