import React from "react";
import Navbar from "../../componentes/NavBar.jsx";
import Footer from "../../componentes/Footer.jsx";
import Banner from "../../componentes/Banner.jsx";
import ContactForm from "../../componentes/ContactForm.jsx";
import { Box, Grid, Typography, Paper } from "@mui/material";
import Header from "../../componentes/Header.jsx";

import ContactoSection from "../../componentes/ContactSection.jsx";

<<<<<<< HEAD


=======
>>>>>>> origin/main
import banner_contacto from "/public/banner_contacto.jpg";

const Contact = () => {
  return (
    <>
      <Navbar />
      <Header titulo="" subtitulo="" imagenFondo={banner_contacto} />
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
              src="public/contacto.jpg"
              alt="Imagen DIMADE"
              sx={{
                display: { xs: "none", md: "block" },
                width: {
                  xs: "100%",
                  md: "100vw",
                },
<<<<<<< HEAD
                height: { xs: "auto", md: "48.4vh" },
=======
                height: { xs: "auto", md: "64vh" },
>>>>>>> origin/main
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
