import React from "react";
import Navbar from "../../componentes/NavBar.jsx";
import Footer from "../../componentes/Footer.jsx";
import Banner from "../../componentes/Banner.jsx";
import { Box, Container, Grid, Typography, Stack, Paper } from "@mui/material";
import Header from "../../componentes/Header.jsx";
import img1 from "../../../public/imagenes/img1.jpg";
import Paper from "@mui/material/Paper";

const Us = () => {
  return (
    <>
      <Navbar />
<<<<<<< HEAD
      <Header titulo="Nosotros" subtitulo="Hola" imagenFondo={img1} />
      
  <Box sx={{ py: 3, width: '100vw', marginLeft: 'calc(-50vw + 50%)' }}>
  <Paper elevation={0} sx={{ py: 3, px: { xs: 2, md: 4 }, backgroundColor: '#f5f5f5', width: '100%' }}>
    <Box sx={{
      maxWidth: '1200px', margin: '0 auto', display: 'flex',
      flexDirection: { xs: 'column', md: 'row' }, gap: 4, alignItems: 'flex-start'
    }}>
      {/* Imagen izquierda */}
      <Box component="img" src="src/assets/imagenes/img3.jpeg" alt="Imagen 1"
        sx={{ width: { xs: '100%', md: '50%' }, objectFit: 'cover' }} />
      {/* Texto derecha */}
      <Box sx={{ flex: 1 }}>
        <Typography variant="h4" gutterBottom>Quiénes Somos?</Typography>
        <Typography variant="body1" paragraph>
  En <strong>DIMADE</strong>, somos una empresa especializada en la intermediación comercial dentro del rubro de la construcción. Nuestra principal misión es conectar de forma eficiente a proveedores y clientes, asegurando procesos de negociación ágiles, confiables y beneficiosos para ambas partes.
</Typography>
<Typography variant="body1" paragraph>
  Desde nuestros inicios, nos hemos enfocado en construir relaciones basadas en la <strong>confianza</strong>, la <strong>transparencia</strong> y la <strong>calidad del servicio</strong>. Entendemos que cada proyecto es único, por eso ofrecemos un acompañamiento personalizado que se adapta a las necesidades específicas de nuestros aliados comerciales.
</Typography>
<Typography variant="body1" paragraph>
  Creemos en el poder de la tecnología como herramienta para optimizar la gestión empresarial. Por ello, estamos en constante evolución, integrando soluciones digitales que nos permiten ser más ágiles, mejorar la experiencia del cliente y ampliar nuestro alcance en el mercado.
</Typography>
<Typography variant="body1" paragraph>
  En <strong>DIMADE</strong>, más que intermediarios, somos <strong>aliados estratégicos</strong> en la generación de oportunidades comerciales sostenibles y exitosas.
</Typography>
      </Box>
    </Box>
  </Paper>
</Box>

{/* Fila 2: Texto izquierda, imagen derecha */}
<Box sx={{ py: 1, width: '100vw', marginLeft: 'calc(-50vw + 50%)' }}>
  <Paper elevation={0} sx={{ py: 1, px: { xs: 2, md: 4 },  width: '100%' }}>
    <Box sx={{
      maxWidth: '1200px', margin: '0 auto', display: 'flex',
      flexDirection: { xs: 'column', md: 'row' }, gap: 4, alignItems: 'flex-start'
    }}>
      {/* Texto izquierda */}
      <Box sx={{ flex: 1 }}>
        <Typography variant="h4" gutterBottom>Visión</Typography>
      <Typography 
        variant="body1" 
        sx={{ 
          fontStyle: 'italic', 
          textAlign: 'left', 
       
        }}
      >
        "Ser el intermediario líder en la comercialización de materiales de construcción, 
        reconocido por nuestra excelencia en servicio, confiabilidad y capacidad de conectar 
        eficientemente a proveedores y clientes. Aspiramos a transformar el mercado mediante 
        soluciones innovadoras, sostenibles y personalizadas, contribuyendo al crecimiento 
        de la industria con integridad y compromiso."
      </Typography>
      </Box>
      {/* Imagen derecha */}
      <Box component="img" src="src/assets/imagenes/img2.jpg" alt="Imagen 2"
        sx={{ width: { xs: '100%', md: '50%' }, objectFit: 'cover' }} />
    </Box>
  </Paper>
</Box>

{/* Fila 3: Imagen derecha, texto izquierda */}
<Box sx={{ py: 1, width: '100vw', marginLeft: 'calc(-50vw + 50%)' }}>
  <Paper elevation={0} sx={{ py: 1, px: { xs: 2, md: 4 }, backgroundColor: '#f5f5f5', width: '100%' }}>
    <Box sx={{
      maxWidth: '1200px', margin: '0 auto', display: 'flex',
      flexDirection: { xs: 'column', md: 'row' }, gap: 4, alignItems: 'flex-start'
    }}>
      {/* Imagen derecha (row-reverse invierte orden en pantallas grandes) */}
      <Box component="img" src="src/assets/imagenes/img1.jpg" alt="Imagen 3"
        sx={{ width: { xs: '100%', md: '50%' }, objectFit: 'cover' }} />
      {/* Texto izquierda */}
      <Box sx={{ flex: 1 }}>
        <Typography variant="h4" gutterBottom>Misión</Typography>
        <Typography 
        variant="body1" 
        sx={{ 
          fontStyle: 'italic', 
          textAlign: 'left', 
       
        }}
      >
        "Facilitar la adquisición de materiales de construcción de alta calidad 
        mediante un servicio de intermediación ágil, transparente y confiable. 
        Nos comprometemos a optimizar la cadena de suministro, ofreciendo asesoría personalizada 
        y soluciones adaptadas a las necesidades de clientes y proveedores, 
        mientras impulsamos estándares de eficiencia y sostenibilidad en el sector."
      </Typography>
      </Box>
    </Box>
  </Paper>
</Box>
      
      <br />
      texto imagen
=======
      <Header titulo="" subtitulo="" imagenFondo={img1} />
      <Box sx={{ py: 3, width: "100vw", marginLeft: "calc(-50vw + 50%)" }}>
        <Paper
          elevation={0}
          sx={{
            py: 3,
            px: { xs: 2, md: 4 },
            backgroundColor: "#f6f4f2",
            width: "100%",
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
            {/* Imagen izquierda */}
            <Box
              component="img"
              src="public/imagenes/img5.jpg"
              alt="Imagen 1"
              sx={{ width: { xs: "100%", md: "50%" }, objectFit: "cover" }}
            />
            {/* Texto derecha */}
            <Box sx={{ flex: 1 }}>
              <Typography variant="h4" gutterBottom>
                Quiénes Somos?
              </Typography>
              <Typography variant="body1" paragraph>
                En <strong>DIMADE</strong>, somos una empresa especializada en
                la intermediación comercial dentro del rubro de la construcción.
                Nuestra principal misión es conectar de forma eficiente a
                proveedores y clientes, asegurando procesos de negociación
                ágiles, confiables y beneficiosos para ambas partes.
              </Typography>
              <Typography variant="body1" paragraph>
                Desde nuestros inicios, nos hemos enfocado en construir
                relaciones basadas en la <strong>confianza</strong>, la{" "}
                <strong>transparencia</strong> y la{" "}
                <strong>calidad del servicio</strong>. Entendemos que cada
                proyecto es único, por eso ofrecemos un acompañamiento
                personalizado que se adapta a las necesidades específicas de
                nuestros aliados comerciales.
              </Typography>
              <Typography variant="body1" paragraph>
                Creemos en el poder de la tecnología como herramienta para
                optimizar la gestión empresarial. Por ello, estamos en constante
                evolución, integrando soluciones digitales que nos permiten ser
                más ágiles, mejorar la experiencia del cliente y ampliar nuestro
                alcance en el mercado.
              </Typography>
              <Typography variant="body1" paragraph>
                En <strong>DIMADE</strong>, más que intermediarios, somos{" "}
                <strong>aliados estratégicos</strong> en la generación de
                oportunidades comerciales sostenibles y exitosas.
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Box>
      {/* Fila 2: Texto izquierda, imagen derecha */}
      <Box sx={{ py: 1, width: "100vw", marginLeft: "calc(-50vw + 50%)" }}>
        <Paper
          elevation={0}
          sx={{ py: 1, px: { xs: 2, md: 4 }, width: "100%" }}
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
            {/* Texto izquierda */}
            <Box sx={{ flex: 1 }}>
              <Typography variant="h4" gutterBottom>
                Visión
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontStyle: "italic",
                  textAlign: "left",
                }}
              >
                "Ser el intermediario líder en la comercialización de materiales
                de construcción, reconocido por nuestra excelencia en servicio,
                confiabilidad y capacidad de conectar eficientemente a
                proveedores y clientes. Aspiramos a transformar el mercado
                mediante soluciones innovadoras, sostenibles y personalizadas,
                contribuyendo al crecimiento de la industria con integridad y
                compromiso."
              </Typography>
            </Box>
            {/* Imagen derecha */}
            <Box
              component="img"
              src="public/imagenes/imagen2.jpg"
              alt="Imagen 2"
              sx={{ width: { xs: "100%", md: "50%" }, objectFit: "cover" }}
            />
          </Box>
        </Paper>
      </Box>
      {/* Fila 3: Imagen derecha, texto izquierda */}
      <Box sx={{ py: 1, width: "100vw", marginLeft: "calc(-50vw + 50%)" }}>
        <Paper
          elevation={0}
          sx={{
            py: 1,
            px: { xs: 2, md: 4 },
            backgroundColor: "#f6f4f2",
            width: "100%",
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
            {/* Imagen derecha (row-reverse invierte orden en pantallas grandes) */}
            <Box
              component="img"
              src="public/imagenes/img1.jpg"
              alt="Imagen 3"
              sx={{ width: { xs: "100%", md: "50%" }, objectFit: "cover" }}
            />
            {/* Texto izquierda */}
            <Box sx={{ flex: 1 }}>
              <Typography variant="h4" gutterBottom>
                Misión
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontStyle: "italic",
                  textAlign: "left",
                }}
              >
                "Facilitar la adquisición de materiales de construcción de alta
                calidad mediante un servicio de intermediación ágil,
                transparente y confiable. Nos comprometemos a optimizar la
                cadena de suministro, ofreciendo asesoría personalizada y
                soluciones adaptadas a las necesidades de clientes y
                proveedores, mientras impulsamos estándares de eficiencia y
                sostenibilidad en el sector."
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Box>

>>>>>>> 7d551ecd7740484ee72b2cfadc1edab227172751
      <Footer />
    </>
  );
};

export default Us;
