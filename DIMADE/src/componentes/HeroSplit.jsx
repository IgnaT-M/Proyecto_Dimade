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
import { useTheme } from "@mui/material/styles";
import ContactForm from "../componentes/ContactForm.jsx";
import CotizaForm from "../componentes/CotizaForm.jsx";

//esta es la seccion al medio de la pagina con las partes de cotizar y contacto

export default function ResponsiveBoxes() {
  const theme = useTheme();
  const [openCotizar, setOpenCotizar] = useState(false);
  const [openContacto, setOpenContacto] = useState(false);

  const [producto, setProducto] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [listaProductos, setListaProductos] = useState([]);

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
