import Formulario from "./Formulario";
import FormularioPrestador from "./FormularioPrestador";
import Pagina404 from "./Pagina404";
import Menu from "./Templates/Menu";
import './Estilo.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";



function App() {
  
  return (
    <div className="banner">
      <BrowserRouter>
        <Routes>

          <Route path="/" exact element={<Menu/>} />
          <Route path="/FormularioPrestador" element={<FormularioPrestador/>} />
          <Route path="/Formulario" element={<Formulario/>} />
          <Route path="*" element={<Pagina404/>} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

//comentério