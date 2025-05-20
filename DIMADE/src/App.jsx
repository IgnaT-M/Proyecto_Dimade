import { BrowserRouter, Routes, Route } from "react-router-dom";
import Contacto from "./vistas/vistas_front/Contacto";
import Cubicador from "./vistas/vistas_front/Cubicador";
import Inicio from "./vistas/vistas_front/Inicio";
import Nosotros from "./vistas/vistas_front/Nosotros";
import Cotizador from "./vistas/vistas_front/Cotizador";
import Productos from "./vistas/vistas_front/Productos";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./assets/colores/Paleta"; // Asegúrate de que la ruta sea correcta

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="/Nosotros" element={<Nosotros />} />
            <Route path="/Contacto" element={<Contacto />} />
            <Route path="/Cotizador" element={<Cotizador />} />
            <Route path="/Productos" element={<Productos />} />
            {/* <Route path="*" element={<div>404 Not Found</div>} /> */}
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App;
