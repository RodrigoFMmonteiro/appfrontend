import Menu from "../Templates/Menu";
import { Container } from "react-bootstrap";
import '../Estilo.css'

export default function Pagina(props){
    return (
        <div className="tela">
            <Menu/>
            <Container>
                {props.children}
            </Container>
        </div>
    );
}