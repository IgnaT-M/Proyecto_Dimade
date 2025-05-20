import React from "react";
import Navbar from "../../componentes/NavBar.jsx";
import Footer from "../../componentes/Footer.jsx";
import Banner from "../../componentes/Banner.jsx";
import ContactForm from "../../componentes/ContactForm.jsx";
import { Box, Grid, Typography, Paper } from "@mui/material";
import img1 from "../../assets/imagenes/img1.jpg";
import Header from "../../componentes/Header.jsx";

const Contact = () => {
  return (
    <>
      <Navbar />
      <Header titulo="Contacto" subtitulo="si" imagenFondo={img1} />
      <br />
      <Box
        sx={{
          width: "100%",
          marginLeft: "calc(-50vw + 50%)",
        }}
      >
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
                width: { xs: "100%", md: "30vw" },
                height: { xs: "auto", md: "64vh" },
                objectFit: "cover",
              }}
            />
            <Box sx={{ flex: 1, textAlign: "justify" }}>
              <ContactForm />
            </Box>
          </Box>
        </Paper>
      </Box>
      cards rrss,wasap,correo
      <Footer />
    </>
  );
};

export default Contact;
