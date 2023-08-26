import {Container, Form, FormGroup, Button, FormLabel} from "react-bootstrap";
import BarraBusca from "./BarraBusca";
import { useEffect, useState } from "react";
import './Estilo.css';

export default function Formulario(propd){
  const [lista, setLista] = useState([])

  useEffect(()=>{
    fetch("https://129.146.68.51/aluno39-pfsii/sugestoes", {method: "GET"}).then((resposta)=>{
      return resposta.json();
    }).then((dados)=>{
      setLista(dados);
    });
  },[])
  
  const [pessoaSlecionada, setPessoaSelecionada] = useState({});
    return (
        <Container>
          <div className="cabecalho">
            <h2 className="text-center ms-5">Cadastro de Ação de Melhoria</h2>
          </div>
          <Form>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Responsável</Form.Label>
                    <Form.Control type="text" placeholder="" required/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="">
                    <Form.Label>Descrição da Ação</Form.Label>
                    <Form.Control as="textarea" rows={3} required />
                </Form.Group>
                <FormGroup>
                    <FormLabel>Autor da sugestão</FormLabel>
                    <BarraBusca 
                        placeHolder={"Pesquise o autor da sugestão"}
                        dados={lista}
                        campoChave={"ID"}
                        campoBusca={"nome"}
                        funcaoSelecao={setPessoaSelecionada}
                        valor={""}>
                    </BarraBusca>
                </FormGroup>

                <Button className="mt-3" variant="primary" type="submit"> Cadastrar</Button>
                {' '}
                <Button className="mt-3" variant="dark" type="button">Voltar</Button>
            </Form>
        </Container>
    );

}