import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

import { CustomThemeProvider } from "./componentes/BtnClarOscuro.jsx";
import ThemeToggleButton from "./componentes/ToggleButtonDiaNoche.jsx";

import Home from "./vistas/vistas_front/Inicio.jsx";
import Login from "./vistas/vistas_back/Login.jsx";
import Backoffice from "./vistas/vistas_back/Backoffice.jsx";
import RecuperarContrasena from "../src/componentes/RecuperarContrasena.jsx";
import ResetearContrasena from "../src/componentes/NuevaContrasena.jsx";

function App() {
  return (
    <CustomThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/Login" element={<Login />} />
          <Route path="/Backoffice" element={<Backoffice />} />
          <Route
            path="/RecuperarContrasena"
            element={<RecuperarContrasena />}
          />

          <Route path="/reset-password" element={<ResetearContrasena />} />
        </Routes>
      </BrowserRouter>
    </CustomThemeProvider>
  );
}

export default App;
