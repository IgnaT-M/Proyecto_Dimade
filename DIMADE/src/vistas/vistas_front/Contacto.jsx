import React from "react";
import Navbar from "../../componentes/NavBar.jsx";
import Footer from "../../componentes/Footer.jsx";
import Banner from "../../componentes/Banner.jsx";
import ContactForm from "../../componentes/ContactForm.jsx";
import { Box, Grid, Typography, Paper } from "@mui/material";
import Header from "../../componentes/Header.jsx";

import ContactoSection from "../../componentes/ContactSection.jsx";


import img1 from "../../../public/imagenes/img1.jpg";

const Contact = () => {
  return (
    <>
      <Navbar />
      <Header titulo="" subtitulo="" imagenFondo={img1} />
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
              src="public/imagenes/img1.jpg"
              alt="Imagen DIMADE"
              sx={{
<<<<<<< HEAD
                width: { xs: "100%", md: "30vw" , xl:"25vw" },
=======

                display: { xs: "none", md: "block" },
                width: {
                  xs: "100%",
                  md: "30vw",
                },

>>>>>>> 7d551ecd7740484ee72b2cfadc1edab227172751
                height: { xs: "auto", md: "64vh" },
                objectFit: "cover",
              }}
            />

            <ContactForm />
          </Box>
        </Paper>
      </Box>

      <ContactoSection />



      <Footer />
    </>
  );
};

export default Contact;
