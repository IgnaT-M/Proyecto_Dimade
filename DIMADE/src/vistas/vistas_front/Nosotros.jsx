import React from 'react';
import { Typography, Paper, Box } from '@mui/material';

const Nosotros = () => {
  return (
    <Box sx={{ 
      py: 4,
      width: '100vw', // Ocupa todo el ancho de la ventana
      marginLeft: 'calc(-50vw + 50%)' // Centra el contenido
    }}>
      {/* Paper con fondo blanco a todo ancho */}
      <Paper
        elevation={0}
        sx={{
          py: 6,
          px: { xs: 2, md: 4 },
          backgroundColor: '#ffff',
          width: '100%',
        }}
      >
        {/* Contenedor interno con ancho máximo */}
        <Box
          sx={{
            maxWidth: '1200px',
            margin: '0 auto',
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            gap: 4,
            alignItems: 'flex-start',
          }}
        >
          {/* Imagen a la izquierda */}
            <Box
              component="img"
              src="src/assets/imagenes/img1.jpg"
              alt="Imagen DIMADE"
              sx={{
                width: { xs: '100%', md: '50%' },
                height: 'auto',
                objectFit: 'cover',
              }}
            />

          {/* Texto a la derecha */}
          <Box sx={{ flex: 1, textAlign: 'justify' }}>
            <Typography variant="h4" gutterBottom>
              Sobre Nosotros
            </Typography>
            <Typography variant="body1" paragraph>
              En DIMADE, nos especializamos en conectar de manera eficiente a clientes y proveedores, facilitando acuerdos comerciales exitosos. Nuestra misión es simplificar y optimizar los procesos de intermediación, asegurando que ambas partes disfruten de interacciones fluidas y relaciones mutuamente beneficiosas.
            </Typography>
            <Typography variant="body1" paragraph>
              Con un enfoque basado en la confianza, la transparencia y la innovación, en DIMADE nos comprometemos a ofrecer un servicio excepcional, adaptado a las necesidades únicas de nuestros clientes y proveedores. Aunque hemos construido una sólida reputación gracias a nuestro trato personalizado, reconocemos la importancia de la transformación digital para ampliar nuestro alcance y mejorar nuestra eficiencia operativa.
            </Typography>
            <Typography variant="body1" paragraph>
              En DIMADE, estamos comprometidos con el crecimiento continuo y la excelencia, siempre con el objetivo de ser el puente más confiable entre quienes buscan y quienes ofrecen soluciones comerciales.
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default Nosotros;