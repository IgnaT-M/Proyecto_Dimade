import * as React from "react";
import Navbar from "../../componentes/NavBar.jsx";
import Footer from "../../componentes/Footer.jsx";
import Banner from "../../componentes/Banner.jsx";
import CotizaForm from "../../componentes/CotizaForm.jsx";
import Cubicador from "../../componentes/Cubicador.jsx";
import Header from "../../componentes/Header.jsx";
import img1 from "../../../public/imagenes/img1.jpg"; // Asegúrate de que la ruta sea correcta
import {
  Box,
  Grid,
  Typography,
  Paper,
  Modal,
  Button,
  Fade,
} from "@mui/material";
import Backdrop from "@mui/material/Backdrop";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "80vw", md: "60vw" },
  height: { xs: "50vh", md: "65vh" },
  bgcolor: "rgba(25, 130, 210, 0.08)",
  borderRadius: "15px",
  border: "1px",
  boxShadow: 10,
  p: 4,
  display: { xs: "flex", md: "flex", lg: "flex" },
  justifyContent: { xs: "center", md: "center", lg: "center" },
  alignItems: { xs: "center", md: "center", lg: "center" },
  overflow: "hidden",
};

const Cotizar = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Navbar />
      <Header titulo="Cotizador" subtitulo="Hola" imagenFondo={img1} />
      <Box>
        <Paper
          elevation={0}
          sx={{
            py: 6,
            backgroundColor: "#ffff",
          }}
        >
          <Box
            sx={{
              maxWidth: "1200px",
              margin: "0 auto",
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              gap: 4,
              alignItems: "flex-start",
            }}
          >
            <Box
              component="img"
              src="src/assets/imagenes/img1.jpg"
              alt="Imagen DIMADE"
              sx={{
                display: { xs: "none", md: "block" },
                width: {
                  xs: "100%",
                  md: "30vw",
                },
                height: { xs: "auto", md: "64vh" },
                objectFit: "cover",
              }}
            />
            <CotizaForm />
          </Box>
        </Paper>
      </Box>
      <div>
        <Button onClick={handleOpen}>Cubicador</Button>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={open}
          onClose={handleClose}
          closeAfterTransition
          slots={{ backdrop: Backdrop }}
          slotProps={{
            backdrop: {
              timeout: 500,
            },
          }}
        >
          <Fade in={open}>
            <Box sx={style}>
              <Cubicador />
              <Typography
                id="transition-modal-title"
                variant="h6"
                component="h2"
              ></Typography>
            </Box>
          </Fade>
        </Modal>
      </div>

      <Footer />
    </>
  );
};

export default Cotizar;
