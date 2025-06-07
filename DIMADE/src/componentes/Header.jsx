import { Box, Typography, Container } from "@mui/material";

const Header = ({ titulo, subtitulo, imagenFondo }) => {
  return (
    <Box
      sx={{
        height: "30vh",
        backgroundImage: `url(${imagenFondo})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "start",
        color: "black",
      }}
    >
      <Container>
        <Typography
          variant="h2"
          sx={{
            textShadow: "2px 2px 8px rgba(0,0,0,0.6)",
          }}
        >
          {titulo}
        </Typography>
        {subtitulo && (
          <Typography
            variant="h5"
            sx={{
              mt: 2,
              textShadow: "1px 1px 6px rgba(0,0,0,0.5)",
            }}
          >
            {subtitulo}
          </Typography>
        )}
      </Container>
    </Box>
  );
};

export default Header;
