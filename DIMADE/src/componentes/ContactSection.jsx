import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  IconButton,
  Stack,
} from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import XIcon from "@mui/icons-material/X"; // Para Twitter/X

const ContactoSection = () => {
  return (
    <Box
      sx={{
        position: "relative",
        py: 8,
        px: 4,
        color: "white",
        overflow: "hidden",
      }}
    >
      {/* Fondo con overlay oscuro */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundImage: "url('/img1.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          zIndex: 0,
        }}
      />
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0,0,0,0.5)",
          zIndex: 1,
        }}
      />

      <Box sx={{ position: "relative", zIndex: 2 }}>
        <Typography
          variant="h4"
          textAlign="center"
          gutterBottom
          sx={{ color: "white" }}
        >
          Contáctanos
        </Typography>

        <Grid container spacing={4} justifyContent="center">
          {/* Teléfono */}
          <Grid item xs={12} sm={6} md={4} sx={{ display: "flex" }}>
            <Card
              sx={{
                p: 3,
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                flexGrow: 1,
                height: "100%",
                width: "100%",
              }}
            >
              <CardContent sx={{ flexGrow: 1 }}>
                <PhoneIcon color="primary" sx={{ fontSize: 50, mb: 2 }} />
                <Typography variant="h6" fontWeight="bold">
                  Teléfono
                </Typography>
                <Typography variant="body1">+56 9 6721 6646</Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Email */}
          <Grid item xs={12} sm={6} md={4} sx={{ display: "flex" }}>
            <Card
              sx={{
                p: 3,
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                flexGrow: 1,
                height: "100%",
                width: "100%",
              }}
            >
              <CardContent sx={{ flexGrow: 1 }}>
                <EmailIcon color="primary" sx={{ fontSize: 50, mb: 2 }} />
                <Typography variant="h6" fontWeight="bold">
                  Correo
                </Typography>
                <Typography variant="body1">
                  Dimadecontacto@gmail.com
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Redes Sociales */}
          <Grid item xs={12} sm={6} md={4} sx={{ display: "flex" }}>
            <Card
              sx={{
                p: 3,
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                flexGrow: 1,
                height: "100%",
                width: "100%",
              }}
            >
              <CardContent sx={{ flexGrow: 1 }}>
                <Stack
                  direction="row"
                  spacing={2}
                  justifyContent="center"
                  mb={2}
                >
                  <IconButton href="https://facebook.com" target="_blank">
                    <FacebookIcon color="primary" fontSize="large" />
                  </IconButton>
                  <IconButton href="https://instagram.com" target="_blank">
                    <InstagramIcon color="secondary" fontSize="large" />
                  </IconButton>
                  <IconButton href="https://twitter.com" target="_blank">
                    <XIcon sx={{ color: "#1DA1F2" }} fontSize="large" />
                  </IconButton>
                </Stack>
                <Typography variant="h6" fontWeight="bold">
                  Redes Sociales
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default ContactoSection;
