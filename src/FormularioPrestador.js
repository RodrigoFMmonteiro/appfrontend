import { Container, Form, Row, Col, FormLabel, Button} from "react-bootstrap";
import { useState, useEffect } from "react";
import './Estilo.css';
import CaixaSelecao from "./CaixaSelecao";
import TabelaItensSugestoes from "./tabelas/TabelaItens";
import Pagina from "./Templates/Pagina";
import ReactInputMask from "react-input-mask";

export default function FormularioPrestador(props){

    function manipulaMudanca(e){
        const alvo = e.target.name;
        setPrestador({ ...prestador, [alvo]: e.target.value});
      }

    function gravarPrestador(){
        let listaDeItens = [];
        for (const item of listaDeSugestoes){
            listaDeItens.push({
                ID: item.ID,
                nome: item.nome,
                sobrenome: item.sobrenome,
                telefone: item.telefone,
                data: item.data,
                sugestao: item.sugestao
            })
        }

        fetch('https://129.146.68.51/aluno39-pfsii/prestadores',{
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                "nome": prestador.nome,
                "telefone": prestador.telefone,
                "sugestoes": listaDeItens
            })
        }).then((resposta) =>{
            return resposta.json();
        }).then((dados)=>{
            if (dados.status) {
                setPrestador({ ...prestador, ID: dados.ID});
            }
            window.alert(dados.mensagem)
        }).catch((erro)=>{
            alert("Não foi possível cadastrar:" +erro.message)
        })
    }

    //useEffect


const [sugestaoSelecionada, setSugestaoSelecionada] = useState({});
//const [lista, setLista] = useState([]);
const [listaDeSugestoes, setListaDeSugestoes] = useState([]);
//const [produtoSelecionado, setProdutoSelecionado] = useState({});

const [prestador, setPrestador] = useState({
    ID: 0,
    nome: '',
    telefone: '',
    sugestoes: []            //conferir no backen
                          //Talvez seja listaDeSugestoes.
});

    return (
        <Pagina>
        <>
            <Container>
                <div className="cabecalho">
                <h2 className="text-center ms-5">Cadastro de Prestador</h2>
                </div>
                <Form>
                    <Row>
                        <Col>
                            <Form.Label>Nome</Form.Label>
                            <Form.Control
                                className="mb-3"
                                type="text"
                                required
                                name="nome"
                                value={prestador.nome}
                                onChange={manipulaMudanca}
                            />
                        </Col>
                        <Col>
                            <Form.Label>Telefone</Form.Label>
                            <ReactInputMask
                                mask={'(99) 99999-9999'}
                                value={prestador.telefone}
                                onChange={manipulaMudanca}>
                                {()=><Form.Control
                                       className="mb-3"
                                       type="text"
                                       required
                                       name="telefone"
                                />}
                            </ReactInputMask>
                            <Form.Control.Feedback type="invalid">Insira um número de Celular</Form.Control.Feedback>
                            
                        </Col>
                    </Row>  
            
                    <Row>
                        <Form.Label>Selecione uma ação</Form.Label>
                        <CaixaSelecao 
                            enderecoDado={'https://129.146.68.51/aluno39-pfsii/sugestoes'}
                            campoChave={"ID"}
                            campoExibicao={"sugestao"}
                            funcaoSelecao={setSugestaoSelecionada}/>
                    </Row>

                <Container className="mt-4">
                    <Row>
                        <Col md={1}>
                            <FormLabel >Código:</FormLabel>
                            <Form.Control
                                    className="mb-3"
                                    value={sugestaoSelecionada.ID}
                                    type="text"
                                    id=""
                                    disabled/>
                        </Col>
                        
                        <Col md={4}>
                            <FormLabel>Nome</FormLabel>
                            <Form.Control
                                    className="mb-3"
                                    value={sugestaoSelecionada.nome}
                                    type="text"
                                    id=""
                                    disabled/>
                        </Col>
                        <Col md={4}>
                            <FormLabel>Sugestão:</FormLabel>
                            <Form.Control
                                    className="mb-3"
                                    value={sugestaoSelecionada.sugestao}
                                    type="text"
                                    id=""
                                    disabled/>
                        </Col>
                        <Col md={2}>
                            <Button className="mt-4" onClick={()=>{
                                const item = {
                                    ID: sugestaoSelecionada.ID,
                                    nome: sugestaoSelecionada.nome,
                                    sobrenome: sugestaoSelecionada.sobrenome,
                                    telefone: sugestaoSelecionada.telefone,
                                    data: sugestaoSelecionada.data,
                                    sugestao: sugestaoSelecionada.sugestao
                                }
                                setListaDeSugestoes([...listaDeSugestoes, item]);
                            }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-file-plus-fill" viewBox="0 0 16 16">
                                    <path d="M12 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zM8.5 6v1.5H10a.5.5 0 0 1 0 1H8.5V10a.5.5 0 0 1-1 0V8.5H6a.5.5 0 0 1 0-1h1.5V6a.5.5 0 0 1 1 0z"/>
                                </svg>
                            </Button>
                        </Col>
                    </Row>
                    <Row>
                        <TabelaItensSugestoes 
                            listaItens={listaDeSugestoes}
                            setPrestador={setPrestador}
                            dados={prestador}
                            setListaItens={setListaDeSugestoes}/>
                    </Row>


                </Container>
                <Button onClick={gravarPrestador} className="mt-3" variant="primary" type="submit">Cadastrar</Button>
                {' '}
                <Button className="mt-3" variant="dark" type="button">Voltar</Button>
                </Form>

            </Container>

        </>
        </Pagina>
    )
}