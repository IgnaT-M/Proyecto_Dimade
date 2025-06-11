import * as React from "react";
import Navbar from "../../componentes/NavBar.jsx";
import Footer from "../../componentes/Footer.jsx";
import Banner from "../../componentes/Banner.jsx";
import CotizaForm from "../../componentes/CotizaForm.jsx";
import Cubicador from "../../componentes/Cubicador.jsx";
import Header from "../../componentes/Header.jsx";
import banner_cotizar from "/public/banner_cotizar.jpg";
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
      <Header imagenFondo={banner_cotizar} />
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
              src="public/cotiza.jpg"
              alt="Imagen DIMADE"
              sx={{
                display: { xs: "none", md: "block" },
                width: {
                  xs: "100%",
                  md: "30vw",
                },
<<<<<<< HEAD
                height: { xs: "auto", md: "55vh" },
=======
                height: { xs: "auto", md: "73vh" },
>>>>>>> origin/main
                objectFit: "cover",
              }}
            />
            <CotizaForm />
          </Box>
        </Paper>
      </Box>

      <Footer />
    </>
  );
};

export default Cotizar;
