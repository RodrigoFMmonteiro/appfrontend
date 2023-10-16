import Formulario from "./Formulario";
import FormularioPrestador from "./FormularioPrestador";
import Pagina404 from "./Templates/Pagina404";
import TelaCadPrestador from "./Telas/TelaCadPrestador";
import TelaCadProjeto from "./Telas/TelaCadProjeto";
import Menu from "./Templates/Menu";
import './Estilização/Estilo.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";



function App() {
  
  return (
    <div className="banner">
      <BrowserRouter>
        <Routes>

          <Route path="/" exact element={<Menu/>} />
          <Route path="/TelaCadPrestador" element={<TelaCadPrestador/>} />
          <Route path="/TelaCadProjeto" element={<TelaCadProjeto/>} />
          <Route path="*" element={<Pagina404/>} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

//comentério