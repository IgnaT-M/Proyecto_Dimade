import Slider from "react-slick";
import { Box, Typography, Card, CardMedia } from "@mui/material";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import { Link } from "react-router-dom";

const slides = [
  {
    title: "Soluciones eficientes para tu proyecto",
    Description: "Conectamos a clientes y proveedores del rubro construcción y más",
    url: "/imagenes/slide1_optimized.webp",
  },
  {
    title: "Ahorra tiempo y cotiza en un solo lugar",
    Description: "Recibe múltiples ofertas y elige la mejor opción para tu necesidad",
    url: "/imagenes/slide2_optimized.webp",
  },
  {
    title: "Transparencia y confianza en cada gestión",
    Description: "Nos encargamos de validar proveedores y asegurar un servicio de calidad",
    url: "/imagenes/slide3_optimized.webp",
  },
  {
    title: "Gestionamos tus solicitudes con eficiencia",
    Description: "Optimiza la comunicación entre todas las partes involucradas",
    url: "/imagenes/slide4_optimized.webp",
  },
];

function PrevArrow(props) {
  const { onClick } = props;
  return (
    <IconButton
      onClick={onClick}
      sx={{
        position: "absolute",
        top: "30%",
        left: 10,
        transform: "translateY(-50%)",
        zIndex: 3,
        color: "white",
        backgroundColor: "rgba(29, 109, 159, 0.51)",
        "&:hover": { backgroundColor: "rgba(203, 88, 12, 0.51)" },
      }}
    >
      <ArrowBackIos />
    </IconButton>
  );
}

function NextArrow(props) {
  const { onClick } = props;
  return (
    <IconButton
      onClick={onClick}
      sx={{
        position: "absolute",
        top: "30%",
        right: 10,
        transform: "translateY(-50%)",
        zIndex: 3,
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
    dots: false, // 👈 desactivado
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
        height: { xs: "35vh", sm: "45vh", md: "60vh" },
        position: "relative",
        overflow: "hidden",
        pb: 0, // ya no es necesario espacio para los dots
      }}
    >
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <Link key={index} style={{ textDecoration: "none" }} component="div">
            <Box
              sx={{
                position: "relative",
                width: "100%",
                height: "100%",
              }}
            >
              <Card sx={{ width: "100%", height: "100%", boxShadow: "none" }}>
                <CardMedia
                  component="img"
                  image={slide.url}
                  alt={slide.title}
                  sx={{
                    objectFit: "cover",
                    width: "100%",
                    height: "100%",
                  }}
                />
              </Card>

              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  backgroundColor: "rgba(0, 0, 0, 0.4)",
                  zIndex: 1,
                  pointerEvents: "none",
                }}
              />

              <Box
                sx={{
                  position: "absolute",
                  top: "30%",
                  left: "10%",
                  transform: "translateY(-50%)",
                  zIndex: 2,
                  color: "#fff",
                  maxWidth: "80%",
                }}
              >
                <Typography
                  variant="h3"
                  gutterBottom
                  sx={{
                    fontSize: { xs: "2rem", sm: "2.8rem", md: "3.4rem" },
                    fontWeight: "bold",
                    WebkitTextStroke: "0.4px black",
                    textShadow: "2px 2px 6px rgba(0,0,0,0.85)",
                    lineHeight: 1.2,
                    maxWidth: { xs: "90%", sm: "70%", md: "60%" },
                    textAlign: "left",
                    whiteSpace: "normal",
                  }}
                >
                  {slide.title}
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    fontSize: { xs: "1.2rem", sm: "1.6rem", md: "1.8rem" },
                    WebkitTextStroke: "0.3px black",
                    textShadow: "1px 1px 4px rgba(0,0,0,0.7)",
                    lineHeight: 1.3,
                    maxWidth: { xs: "90%", sm: "70%", md: "60%" },
                    textAlign: "left",
                  }}
                >
                  {slide.Description}
                </Typography>
              </Box>
            </Box>
          </Link>
        ))}
      </Slider>
    </Box>
  );
}

export default Carousel;
