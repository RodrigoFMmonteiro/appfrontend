import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Cabecalho } from "./Cabecalho";
import '../Estilização/Estilo.css'

export default function Menu(props){
    return (
      <div className="tela">
        <Cabecalho texto="Sistema de Gestão"/>
        <Nav
          className="ms-5 mb-4"
          activeKey="/home"
          onSelect={(selectedKey) => alert(`selected ${selectedKey}`)}
        >

          <Nav.Item>
            <Nav.Link> <Link to="/">Início </Link></Nav.Link>
          </Nav.Item>

          <Nav.Item>
            <Nav.Link> <Link to="/TelaCadProjeto">Cadastro de Projetos</Link></Nav.Link>
          </Nav.Item>

          <Nav.Item>
            <Nav.Link> <Link to="/TelaCadPrestador">Cadastro de Prestradores</Link></Nav.Link>
          </Nav.Item>

          <Nav.Item>
            <Nav.Link> <Link to="/CadastroVendas">Vendas</Link></Nav.Link>
          </Nav.Item>

        </Nav>
    </div>
      );
}