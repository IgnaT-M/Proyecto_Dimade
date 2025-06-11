import Slider from "react-slick";
import { Box, Typography, Card, CardMedia, CardContent } from "@mui/material";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import { Link } from "react-router-dom";

const slides = [
  { title: "", url: "/inicio_construccion.jpg" },
  { title: "", url: "/inicio_pinturas.jpg" },
  { title: "", url: "/inicio_ferreteria.jpg" },
  { title: "", url: "/inicio_herramientas.jpg" },
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

export default function Carousel() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
  };

  return (
    <Box
      sx={{
        width: "100%",           // 70% del ancho de la pantalla
        margin: "0 auto",
        height: "70vh",
        overflow: "hidden",
        position: "relative",
        py: 6,
        
      }}
    >
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <Link to="/productos" key={index} style={{ textDecoration: "none" }} 
          component="div">
          <Box
            key={index}
            sx={{
             
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
              mt:"4",
              
            }}
          >
            <Card sx={{ boxShadow: "none", width: "100%", height: "100%" }}>
              <CardMedia
                component="img"
                image={slide.url}
                alt={slide.title}
                sx={{
                 
                  objectFit:"contain",
                 width: "100%",
              height: "60vh",
                 
                }}
              />
            </Card>
            <Typography
              variant="h4"
              sx={{
                position: "absolute",
                bottom: 30,
                color: "#fff",
                textShadow: "0 0 6px black",
              }}
            >
              {slide.title}
            </Typography>
          </Box>
          </Link>
        ))}
      </Slider>
    </Box>
  );
}
