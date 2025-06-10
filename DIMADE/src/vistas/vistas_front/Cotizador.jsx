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

const Cotizar = () => {
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
                height: { xs: "auto", md: "73vh" },
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
