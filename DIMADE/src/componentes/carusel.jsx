import Slider from "react-slick";
import { Box, Typography, Card, CardMedia, CardContent } from "@mui/material";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  ArrowBackIos,
  ArrowForwardIos,
  Description,
} from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import { Link } from "react-router-dom";

const slides = [
  {
    title: "Primera imagen",
    Description: " descripcion imagen uno",
    url: "",
  },
  {
    title: "Segunda imagen",
    Description: "descripcion imagen dos",
    url: "",
  },
  {
    title: "Tercera imagen",
    Description: "descripcion imagen tres",
    url: "",
  },
  {
    title: "Cuarta imagen",
    Description: "descripcion imagen cuatro",
    url: "",
  },
];

// Flecha izquierda
function PrevArrow(props) {
  const { onClick } = props;
  return (
    <IconButton
      onClick={onClick}
      sx={{
        position: "absolute",
        top: "50%",
        left: 20,
        transform: "translateY(-50%)",
        zIndex: 1,
        color: "white",
        backgroundColor: "rgba(29, 109, 159, 0.51)",
        "&:hover": { backgroundColor: "rgba(203, 88, 12, 0.51)" },
      }}
    >
      <ArrowBackIos />
    </IconButton>
  );
}

// Flecha derecha
function NextArrow(props) {
  const { onClick } = props;
  return (
    <IconButton
      onClick={onClick}
      sx={{
        position: "absolute",
        top: "50%",
        right: 20,
        transform: "translateY(-50%)",
        zIndex: 1,
        color: "white",
        backgroundColor: "rgba(29, 109, 159, 0.51)",
        "&:hover": { backgroundColor: "rgba(203, 88, 12, 0.51)" },
      }}
    >
      <ArrowForwardIos />
    </IconButton>
  );
}

function Carousel() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
  };

  return (
    <Box
      sx={{
        width: "100%",
        margin: "0 auto",
        height: "70vh",
        overflow: "auto",
        position: "relative",
      }}
    >
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <Link
            // to="/productos"
            key={index}
            style={{ textDecoration: "none" }}
            component="div"
          >
            <Box
              key={index}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
              }}
            >
              <Card sx={{ boxShadow: "none", width: "100%", height: "100%" }}>
                <CardMedia
                  component="img"
                  image={slide.url}
                  alt={slide.title}
                  sx={{
                    objectFit: "cover",
                    width: "100%",
                    height: "60vh",
                  }}
                />
              </Card>
              {/* Titulo de la imagen */}
              <Typography
                variant="h4"
                sx={{
                  position: "absolute",
                  top: "20%", // Distancia desde la parte superior
                  left: "5%", // Distancia desde la parte izquierda
                  color: "#fff",
                  textShadow: "0 0 6px black",
                  display: "flex",
                  // alignItems: "center", // No es necesario si el texto es una sola línea y usas top/left
                  justifyContent: "flex-start",
                  maxWidth: "90%", // Para que el texto no se desborde si es muy largo
                  textAlign: "left", // Asegura que el texto en sí se alinee a la izquierda
                }}
              >
                {slide.title}
              </Typography>
              {/* Descripción de la imagen */}
              <Typography
                variant="body1"
                sx={{
                  position: "absolute",
                  top: "30%", // Distancia desde la parte superior (ajustado para que esté debajo del título)
                  left: "5%", // Distancia desde la parte izquierda
                  color: "#fff",
                  textShadow: "0 0 6px black",
                  display: "flex",
                  // alignItems: "center", // No es necesario si el texto es una sola línea y usas top/left
                  justifyContent: "flex-start",
                  maxWidth: "90%", // Para que el texto no se desborde si es muy largo
                  textAlign: "left", // Asegura que el texto en sí se alinee a la izquierda
                }}
              >
                {slide.Description}
              </Typography>
            </Box>
          </Link>
        ))}
      </Slider>
    </Box>
  );
}
export default Carousel;
