import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Snackbar,
  Alert,
  IconButton,
  Tooltip,
} from "@mui/material";

import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

import BASE_URL from "../config/apiConfig";

const CotizaForm = () => {
  const [formData, setFormData] = useState({
    rut: "",
    nombre: "",
    email: "",
    telefono: "",

    direccion: "",
    productos: [{ detalle: "", cantidad: "", valor: 0 }],

    mensaje: "",
    tipo: "Cliente",
  });

  const [open, setOpen] = useState(false);
  const [error, setError] = useState(null);
  const [touched, setTouched] = useState({});
  const [submitAttempted, setSubmitAttempted] = useState(false);

  const handleChange = async (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleProductChange = (index, e) => {
    const { name, value } = e.target;
    const newProducts = [...formData.productos];
    // Solo 'cantidad' se convierte a número
    newProducts[index][name] =
      name === "cantidad" ? parseInt(value) || "" : value;
    setFormData((prev) => ({ ...prev, productos: newProducts }));
  };

  const handleBlur = (e) => {
    setTouched((prev) => ({ ...prev, [e.target.name]: true }));
  };

  const handleProductBlur = (index, fieldName) => {
    setTouched((prev) => ({
      ...prev,
      [`producto-${index}-${fieldName}`]: true,
    }));
  };

  const isEmpty = (field) =>
    (touched[field] || submitAttempted) && !formData[field];

  const isProductFieldEmpty = (index, fieldName) =>
    (touched[`producto-${index}-${fieldName}`] || submitAttempted) &&
    (formData.productos[index][fieldName] === "" ||
      (fieldName === "cantidad" &&
        parseFloat(formData.productos[index].cantidad) <= 0)); // Validar cantidad > 0

  const handleAddProduct = () => {
    setFormData((prev) => ({
      ...prev,
      // SIN precioUnitario al agregar nuevo producto
      productos: [...prev.productos, { detalle: "", cantidad: "", valor: 0 }],
    }));
  };

  const handleRemoveProduct = (index) => {
    const newProducts = [...formData.productos];
    newProducts.splice(index, 1);
    setFormData((prev) => ({ ...prev, productos: newProducts }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitAttempted(true);

    const camposVacios = Object.keys(formData).filter(
      (campo) =>
        campo !== "productos" &&
        campo !== "mensaje" &&
        campo !== "tipo" &&
        !formData[campo]
    );

    // Validar que al menos un producto esté especificado y sus campos no estén vacíos
    // SIN validación de precioUnitario aquí
    const productosVacios = formData.productos.some(
      (prod) =>
        !prod.detalle || prod.cantidad === "" || parseFloat(prod.cantidad) <= 0
    );

    if (camposVacios.length > 0 || productosVacios) {
      setError(
        "Por favor, completa todos los campos obligatorios y los productos."
      );
      return;
    }

    const payload = {
      rutSolicitante: formData.rut,
      nombreSolicitante: formData.nombre,
      correo: formData.email,
      telefono: formData.telefono,

      direccion: formData.direccion,

      fechaSolicitud: new Date(),
      productos: formData.productos, // Los productos se envían sin precio unitario
      estado: "Pendiente",
      detalle: formData.mensaje,
      tipo: formData.tipo,
    };

    try {
      const response = await fetch(`${BASE_URL}/api/solicitudes-cotizacion`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error("Error al enviar la solicitud");

      setOpen(true);
      setFormData({
        rut: "",
        nombre: "",
        email: "",
        telefono: "",

        direccion: "",
        productos: [{ detalle: "", cantidad: "" }],

        mensaje: "",
        tipo: "Cliente",
      });
      setSubmitAttempted(false);
      setTouched({});
      setError(null);
    } catch (error) {
      console.error("Error al enviar solicitud:", error);
      setError("Error al enviar el mensaje. Inténtalo de nuevo.");
    }
  };

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", py: 2 }}>
      <Typography variant="h4" gutterBottom>
        Solicita tu cotización
      </Typography>
      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          fullWidth
          margin="normal"
          name="nombre"
          label="Nombre"
          value={formData.nombre}
          onChange={handleChange}
          onBlur={handleBlur}
          error={isEmpty("nombre")}
          helperText={isEmpty("nombre") ? "El Nombre es Obligatorio." : ""}
        />
        <TextField
          fullWidth
          margin="normal"
          name="rut"
          label="RUT"
          value={formData.rut}
          onChange={handleChange}
          onBlur={handleBlur}
          error={isEmpty("rut")}
          helperText={isEmpty("rut") ? "El RUT es obligatorio" : ""}
        />
        <TextField
          fullWidth
          margin="normal"
          name="email"
          label="Correo electrónico"
          type="email"
          value={formData.email}
          onChange={handleChange}
          onBlur={handleBlur}
          error={isEmpty("email")}
          helperText={
            isEmpty("email") ? "Debes Ingresar un Email, por favor" : ""
          }
        />
        <TextField
          fullWidth
          margin="normal"
          name="telefono"
          label="Teléfono"
          type="tel"
          value={formData.telefono}
          onChange={handleChange}
          onBlur={handleBlur}
          error={isEmpty("telefono")}
          helperText={isEmpty("telefono") ? "Debes Ingresar un Telefono" : ""}
        />

        <TextField
          fullWidth
          margin="normal"
          name="direccion"
          label="Dirección"
          type="text"
          value={formData.direccion}
          onChange={handleChange}
          onBlur={handleBlur}
          error={isEmpty("direccion")}
          helperText={
            isEmpty("direccion") ? "Debes Ingresar una Dirección." : ""
          }
          placeholder="Ej: Avenida Providencia 200, Conchalí"
        />

        {/* Sección de Productos Solicitados */}
        <Typography variant="h5" gutterBottom sx={{ mt: 3, mb: 1 }}>
          Productos
        </Typography>
        {formData.productos.map((product, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              mb: 2,
              border: "1px solid #e0e0e0",
              borderRadius: 1,
              p: 1.5,
              boxShadow: 1,
              flexWrap: "wrap",
            }}
          >
            <TextField
              margin="dense"
              name="detalle"
              label="Detalle Producto"
              value={product.detalle}
              onChange={(e) => handleProductChange(index, e)}
              onBlur={() => handleProductBlur(index, "detalle")}
              error={isProductFieldEmpty(index, "detalle")}
              helperText={
                isProductFieldEmpty(index, "detalle")
                  ? "Describe el producto"
                  : ""
              }
              placeholder="Ej: 50 bolsas de cemento, color gris"
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
              value={product.cantidad}
              onChange={(e) => handleProductChange(index, e)}
              onBlur={() => handleProductBlur(index, "cantidad")}
              error={isProductFieldEmpty(index, "cantidad")}
              helperText={
                isProductFieldEmpty(index, "cantidad")
                  ? "Ingresa la cantidad"
                  : ""
              }
              sx={{
                flexBasis: { xs: "calc(40% - 8px)", sm: "120px" },
                minWidth: "80px",
              }}
            />
            {/* <--- ELIMINADO: Campo Precio Unitario */}
            {formData.productos.length > 1 && (
              <Tooltip title="Eliminar Producto">
                <IconButton
                  onClick={() => handleRemoveProduct(index)}
                  color="error"
                  aria-label="eliminar producto"
                  sx={{ mt: { xs: 1, sm: 0 }, ml: { xs: 0, sm: 1 } }}
                >
                  <DeleteOutlineIcon />
                </IconButton>
              </Tooltip>
            )}
          </Box>
        ))}

        {/* Botón "AGREGAR PRODUCTO" */}
        <Button
          variant="outlined"
          fullWidth
          onClick={handleAddProduct}
          startIcon={<AddCircleOutlineIcon />}
          sx={{
            mt: 2,
            mb: 3,
            fontWeight: "bold",
            borderRadius: 1,
            color: "#D95830",
            borderColor: "#D95830",
            "&:hover": {
              bgcolor: "#D958301A",
              borderColor: "#D95830",
            },
          }}
        >
          AGREGAR PRODUCTO
        </Button>

        <TextField
          fullWidth
          multiline
          rows={4}
          margin="normal"
          name="mensaje"
          label="Detalles adicionales (opcional)"
          value={formData.mensaje}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Ej: Necesito que la entrega sea antes de fin de mes..."
        />
        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{
            mt: 2,
            fontWeight: "bold",
            borderRadius: 1,
            bgcolor: "#10567E",
            color: "#fff",
            "&:hover": { bgcolor: "#D95830" },
          }}
        >
          Enviar solicitud
        </Button>
      </Box>

      <Snackbar
        open={open}
        autoHideDuration={4000}
        onClose={() => setOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setOpen(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          ¡Solicitud de cotización enviada con éxito!
        </Alert>
      </Snackbar>

      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={() => setError(null)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setError(null)}
          severity="error"
          sx={{ width: "100%" }}
        >
          {error}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default CotizaForm;
