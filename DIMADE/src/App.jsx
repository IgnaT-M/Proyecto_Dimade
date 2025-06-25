// Ubicación: src/App.jsx

import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { Box } from "@mui/material";

// --- RUTAS CORREGIDAS ---
// Antes: ../componentes/...
// Ahora, como App.jsx y la carpeta "componentes" son hermanos, usamos "./"
import { CustomThemeProvider } from "./componentes/BtnClarOscuro.jsx";
import ThemeToggleButton from "./componentes/ToggleButtonDiaNoche.jsx";

// Tus vistas (estas ya estaban correctas con "./")
import Home from "./vistas/vistas_front/Inicio.jsx";
import Us from "./vistas/vistas_front/Nosotros.jsx";
import Contact from "./vistas/vistas_front/Contacto.jsx";
import Cotizar from "./vistas/vistas_front/Cotizador.jsx";
import Productos from "./vistas/vistas_front/Productos.jsx";
import Login from "./vistas/vistas_back/Login.jsx";
import Backoffice from "./vistas/vistas_back/Backoffice.jsx";

function App() {
  return (
    <CustomThemeProvider>
      <BrowserRouter>
        <Routes>
          {/* Las rutas vuelven a estar como al principio, simples y directas */}
          <Route path="/" element={<Home />} />
          <Route path="/nosotros" element={<Us />} />
          <Route path="/contacto" element={<Contact />} />
          <Route path="/cotizador" element={<Cotizar />} />
          <Route path="/productos" element={<Productos />} />

          {/* Rutas que no usan el layout principal */}
          <Route path="/Login" element={<Login />} />
          <Route path="/Backoffice" element={<Backoffice />} />
        </Routes>
      </BrowserRouter>
    </CustomThemeProvider>
  );
}

export default App;
