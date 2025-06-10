import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Modal,
  TextField,
  Paper,
  Fade,
  Backdrop,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  List,
  ListItem,
  ListItemText,
  IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const HeroSplit = () => {
  const [openCotizar, setOpenCotizar] = useState(false);
  const [openContacto, setOpenContacto] = useState(false);

  // Estados cotización
  const [producto, setProducto] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [listaProductos, setListaProductos] = useState([]);

  // Estados contacto
  const [asunto, setAsunto] = useState("");

  const handleAddProducto = () => {
    if (producto && cantidad) {
      setListaProductos([...listaProductos, { producto, cantidad }]);
      setProducto("");
      setCantidad("");
    }
  };

  const styleModal = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    p: 4,
    borderRadius: 3,
    boxShadow: 24,
    bgcolor: "#fff",
    maxHeight: "90vh",
    overflowY: "auto",
  };

  const commonBoxStyles = {
    width: "50%",
    height: 400,
    color: "#fff",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    px: 4,
    position: "relative",
    textAlign: "center",
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  return (
    <>
      <Box display="flex" width="100%" flexWrap="wrap" mt={4}>
        {/* Izquierda - Cotizar */}
        <Box
          sx={{
            ...commonBoxStyles,
            backgroundImage: 'url("/public/cotiza.jpg")',
          }}
        >
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              backgroundColor: "rgba(0,0,0,0.5)",
              zIndex: 1,
            }}
          />
          <Box sx={{ zIndex: 2 }}>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
              ¿Necesitas una cotización?
            </Typography>
            <Typography variant="body1" mb={2}>
              Envíanos los detalles de tu requerimiento y te responderemos a la
              brevedad.
            </Typography>
            <Button
              variant="outlined"
              color="inherit"
              onClick={() => setOpenCotizar(true)}
            >
              Cotizar ahora
            </Button>
          </Box>
        </Box>

        {/* Derecha - Contacto */}
        <Box
          sx={{
            ...commonBoxStyles,
            backgroundImage: 'url("/public/contacto.jpg")',
          }}
        >
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              backgroundColor: "rgba(0,0,0,0.5)",
              zIndex: 1,
            }}
          />
          <Box sx={{ zIndex: 2 }}>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
              ¿Tienes preguntas?
            </Typography>
            <Typography variant="body1" mb={2}>
              Estamos aquí para ayudarte. Escríbenos y resolveremos tus dudas.
            </Typography>
            <Button
              variant="outlined"
              color="inherit"
              onClick={() => setOpenContacto(true)}
            >
              Contactar
            </Button>
          </Box>
        </Box>
      </Box>

      {/* Modal Cotizar */}
      <Modal
        open={openCotizar}
        onClose={() => setOpenCotizar(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{ timeout: 400 }}
      >
        <Fade in={openCotizar}>
          <Paper sx={styleModal}>
            <Typography variant="h6" gutterBottom>
              Cotización
            </Typography>
            <TextField label="Nombre completo" fullWidth margin="normal" />
            <TextField label="Teléfono" fullWidth margin="normal" />
            <TextField label="Email" fullWidth margin="normal" />
            <TextField label="Empresa" fullWidth margin="normal" />

            {/* Nueva casilla única de descripción */}
            <TextField
              label="Descripción del requerimiento"
              fullWidth
              multiline
              rows={4}
              margin="normal"
              placeholder="Ej: Necesito 50 bolsas de cemento y 10 mallas ACMA 15-15-6..."
            />

            <Button variant="contained" fullWidth sx={{ mt: 2 }}>
              Enviar
            </Button>
          </Paper>
        </Fade>
      </Modal>

      {/* Modal Contacto */}
      <Modal
        open={openContacto}
        onClose={() => setOpenContacto(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{ timeout: 400 }}
      >
        <Fade in={openContacto}>
          <Paper sx={styleModal}>
            <Typography variant="h6" gutterBottom>
              Contacto
            </Typography>
            <TextField label="Nombre completo" fullWidth margin="normal" />
            <TextField label="Email" fullWidth margin="normal" />
            <TextField label="Teléfono" fullWidth margin="normal" />

            <FormControl fullWidth margin="normal">
              <InputLabel id="asunto-label">Asunto</InputLabel>
              <Select
                labelId="asunto-label"
                value={asunto}
                label="Asunto"
                onChange={(e) => setAsunto(e.target.value)}
              >
                <MenuItem value="Soporte">Soporte</MenuItem>
                <MenuItem value="Ventas">Ventas</MenuItem>
                <MenuItem value="Otro">Otro</MenuItem>
              </Select>
            </FormControl>

            <TextField
              label="Mensaje"
              fullWidth
              multiline
              rows={3}
              margin="normal"
            />
            <Button variant="contained" fullWidth sx={{ mt: 2 }}>
              Enviar
            </Button>
          </Paper>
        </Fade>
      </Modal>
    </>
  );
};

export default HeroSplit;
