import {Container, Form, FormGroup, Button, FormLabel} from "react-bootstrap";
import BarraBusca from "./BarraBusca";
import { useEffect, useState } from "react";
import './Estilo.css';
import CaixaSelecao from "./CaixaSelecao";

export default function Formulario(props){


  function manipulaMudanca(e){
    const alvo = e.target.name;
    if (e.target.type === "checkbox"){
      setSugestao({ ...sugestao, [alvo]: e.target.checked});
    }
    else{
      setSugestao({ ...sugestao, [alvo]: e.target.value});
    }
  }

  const [sugestao, setSugestao] = useState({
    ID: 0,
    responsavel: "",
    descricao: "",
    autor: "",
    sugestao: {}
    })

  const [lista, setLista] = useState([])

  useEffect(()=>{
    fetch("https://129.146.68.51/aluno39-pfsii/sugestoes", 
          {method: "GET"})
          .then((resposta)=> {
            return resposta.json();
          })
          .then((dados)=>{
            setLista(dados);
    })
    .catch((erro)=>{
      alert("Não foi possível recuperar os dados do backend: "+erro)
    });
  },[])
  
  const [pessoaSlecionada, setPessoaSelecionada] = useState({});
  const [sugestaoSelecionada, setSugestaoSelecionada] = useState({});

  function gravarProjeto(){
    fetch("https://129.146.68.51/aluno39-pfsii/sugestoes",
    {method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
      "ID": sugestao.ID,
      "responsavel": sugestao.responsavel,
      "descricao":sugestao.descricao,
      "autor": sugestao.autor,
      "sugestao": sugestaoSelecionada

    })}
    )
  }

    return (
        <Container>
          <div className="cabecalho">
            <h2 className="text-center ms-5">Cadastro de Ação de Melhoria</h2>
          </div>
          
          <Form onSubmit={gravarProjeto}>

                <Form.Group className="mb-3">
                    <Form.Label>ID</Form.Label>
                    <Form.Control value={sugestao.ID} disabled/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Responsável</Form.Label>
                    <Form.Control type="text" placeholder="" value={sugestao.responsavel} onChange={manipulaMudanca} required/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="">
                    <Form.Label>Descrição da Ação</Form.Label>
                    <Form.Control as="textarea" rows={3} value={sugestao.descricao} onChange={manipulaMudanca} required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Autor</Form.Label>
                    <Form.Control type="text" placeholder="" value={sugestao.autor} onChange={manipulaMudanca} required/>
                </Form.Group>
                
                <FormGroup>
                    <FormLabel>ID da sugestão</FormLabel>
                    <BarraBusca 
                        placeHolder={"Pesquise o ID da sugestão"}
                        dados={lista}
                        campoChave={"ID"}
                        campoBusca={"nome"}
                        funcaoSelecao={setSugestaoSelecionada}
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