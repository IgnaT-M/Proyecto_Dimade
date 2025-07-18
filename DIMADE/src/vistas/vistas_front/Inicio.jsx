import Navbar from "../../componentes/NavBar.jsx";
import Footer from "../../componentes/Footer.jsx";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ProveedorSlider from "../../componentes/Slider.jsx";

import Carousel from "../../componentes/carusel.jsx";
import CategoriasSection from "../../componentes/CategoriasSection.jsx";
import MiniBannerNosotros from "../../componentes/MiniBannerNosotros.jsx";
import HeroSplit from "../../componentes/HeroSplit.jsx";
import BtnInicio from "../../componentes/BtnInicio.jsx";
import WhatsAppButton from "../../componentes/BtnWhatsApp.jsx";

// Componente principal de la página de inicio
const Home = () => {
  return (
    <>
      <Navbar />
      <Carousel />
      <CategoriasSection />
      <HeroSplit />
      <ProveedorSlider />
      <MiniBannerNosotros />
      <BtnInicio />
      <WhatsAppButton />
      <Footer />
    </>
  );
};

export default Home;
