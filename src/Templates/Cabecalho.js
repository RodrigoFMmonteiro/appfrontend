import { Alert } from "react-bootstrap";

export function Cabecalho(props){
    return(
        <div className="mt-3">
            <Alert variant="primary" className="text-center me-5 ms-5">
                <h2>
                    {props.texto}
                </h2>
            </Alert>
        </div>
    );
}