import Pagina from "./Templates/Pagina";
import { Alert } from "react-bootstrap";

export default function Pagina404(props){
    return (
        <Pagina>
            <Alert className="text-center" variant="danger">
                <Alert.Heading>Página não encontrada</Alert.Heading>
            </Alert>
        </Pagina>
    );
}
