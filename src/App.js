import Formulario from "./Formulario";
import logo from './assets/logo.png';
import './Estilo.css';


function App() {
  
  return (
    <div className="banner">
      <img src={logo} alt="logo"/>
      <Formulario></Formulario>
    </div>
  );
}

export default App;
