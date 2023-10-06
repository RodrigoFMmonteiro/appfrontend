import {Container, Form, FormGroup, Button, FormLabel} from "react-bootstrap";
import BarraBusca from "./BarraBusca";
import { useEffect, useState } from "react";
import './Estilo.css';
import Pagina from "./Templates/Pagina";

export default function Formulario(props){

  function manipulaMudanca(e){
    const alvo = e.target.name;
    setSugestao({ ...sugestao, [alvo]: e.target.value});
  }

  const [sugestao, setSugestao] = useState({
    ID: 0,
    responsavel: '',
    descricao: '',
    autor: '',
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
  
  const [sugestaoSelecionada, setSugestaoSelecionada] = useState({});

  function gravarProjeto(){
    fetch("https://129.146.68.51/aluno39-pfsii/projetos",
    {method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
      "responsavel": sugestao.responsavel,
      "descricao":sugestao.descricao,
      "autor": sugestao.autor,
      "sugestao": sugestaoSelecionada
    })}
    ).then((resposta)=> {
        return resposta.json();
    }).then((dados)=>{
      if (dados.status) {
          setSugestao({...sugestao, ID: dados.ID});
      }
      window.alert(dados.mensagem)
    }).catch((erro)=>{
      alert("Não foi possível cadastrar: " +erro.message)
    })
  }

    return (
      <Pagina>
        <Container>
          <div className="cabecalho">
            <h2 className="text-center ms-5">Cadastro de Projetos</h2>
          </div>
          <Form onSubmit={gravarProjeto}>
                <Form.Group className="mb-3">
                    <Form.Label>ID</Form.Label>
                    <Form.Control value={sugestao.ID} disabled/>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Responsável</Form.Label>
                    <Form.Control type="text"
                                  name="responsavel" 
                                  value={sugestao.responsavel} 
                                  onChange={manipulaMudanca} 
                                  required/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="">
                    <Form.Label>Descrição da Ação</Form.Label>
                    <Form.Control type="text"
                                  name="descricao" 
                                  rows={3} 
                                  value={sugestao.descricao} 
                                  onChange={manipulaMudanca} 
                                  required />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Autor</Form.Label>
                    <Form.Control type="text"
                                  name="autor"
                                  value={sugestao.autor} 
                                  onChange={manipulaMudanca} 
                                  required/>
                </Form.Group>
                
                <FormGroup>
                    <FormLabel>ID da sugestão</FormLabel>
                    <BarraBusca 
                        placeHolder={"Pesquise o ID da sugestão"}
                        dados={lista}
                        campoChave={"ID"}
                        campoBusca={"sugestao"}
                        funcaoSelecao={setSugestaoSelecionada}
                        valor={""}>
                    </BarraBusca>
                </FormGroup>

                <Button onClick={gravarProjeto} className="mt-3" variant="primary" type="submit"> Cadastrar</Button>
                {' '}
                <Button className="mt-3" variant="dark" type="button">Voltar</Button>
            </Form>
        </Container>
      </Pagina>
    );

}