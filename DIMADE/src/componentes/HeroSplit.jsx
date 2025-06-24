import {
  Box,
  Typography,
  Button,
  Modal,
  Backdrop,
  Paper,
  Fade,
} from "@mui/material";
import { useState } from "react";
import { useTheme } from "@mui/material/styles"; // Importa el theme
import ContactForm from "../componentes/ContactForm.jsx";
import CotizaForm from "../componentes/CotizaForm.jsx";

export default function ResponsiveBoxes() {
  const theme = useTheme(); // Usar el theme actual
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

  // Estilos del modal que se adaptan al tema
  const styleModal = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: { xs: "90%", sm: 400, md: 500 },
    p: 4,
    borderRadius: 3,
    boxShadow: 24,
    bgcolor: theme.palette.modalBg,
    color: theme.palette.text.primary,
    maxHeight: "90vh",
    overflowY: "auto",
  };

  return (
    <>
      <Box
        display="flex"
        flexDirection={{ xs: "column", md: "row" }}
        width="100%"
        mt={4}
      >
        {/* Cotizar */}
        <Box
          id="cotizar"
          sx={{
            width: { xs: "100%", md: "50%" },
            height: 300,
            backgroundImage:
              'linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url("/cotiza.jpg")',
            backgroundSize: "cover",
            backgroundPosition: "center",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            color: "#fff",
            p: 2,
            marginBottom: { xs: 0.5, md: 0 },
          }}
        >
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

        {/* Contactar */}
        <Box
          id="contacto"
          sx={{
            width: { xs: "100%", md: "50%" },
            height: 300,
            backgroundImage:
              'linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url("/contacto.jpg")',
            backgroundSize: "cover",
            backgroundPosition: "center",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            color: "#fff",
            p: 2,
          }}
        >
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
            <CotizaForm />
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
            <ContactForm />
          </Paper>
        </Fade>
      </Modal>
    </>
  );
}
