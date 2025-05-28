import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from "././assets/colores/Paleta.jsx";
import Home from "./vistas/vistas_front/Inicio.jsx";
import Us from "./vistas/vistas_front/Nosotros.jsx";
import Contact from "./vistas/vistas_front/Contacto.jsx";
import Cotizar from "./vistas/vistas_front/Cotizador.jsx";
import Productos from "./vistas/vistas_front/Productos.jsx";

function App() {
  return (
    <>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/nosotros" element={<Us />} />
            <Route path="/contacto" element={<Contact />} />
            <Route path="/cotizador" element={<Cotizar />} />
            <Route path="/productos" element={<Productos />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App;
