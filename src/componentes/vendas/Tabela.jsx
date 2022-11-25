import { useContext } from 'react'
import Alerta from '../Alerta';
import PostsContext from './VendasContext';

const Tabela = () => {

    const { listaObjetos, acaoRemover, alerta, setObjeto, setEditar, setAlerta, novoObjeto } = useContext(PostsContext);

    return (
        <div style={{ padding: '20px' }}>
            <h1>Posts</h1>
            <Alerta alerta={alerta} />
            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modalEdicao"
                onClick={() => {
                  //  setObjeto({
                  //      id: 0, texto: "", titulo: ""
                  //  });
                  novoObjeto();                 
                    setEditar(false);
                    setAlerta({ status: "", message: "" });
                }}>
                Novo <i className="bi bi-file-earmark-plus"></i>
            </button>
            {listaObjetos.length === 0 && <h2>Nenhum registro encontrado</h2>}
            {listaObjetos.length > 0 && (
                <div className="table-responsive">
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col" width="17%">ID</th>
                                <th scope="col">Descrição</th>
                                <th scope="col">Produto</th>
                                <th scope="col">Quantidade</th>
                                <th scope="col">Valor</th>
                                <th scope="col">Usuario</th>
                                <th scope="col">Email</th>
                                <th scope="col">UID</th>
                                <th scope="col" style={{ textAlign: 'center' }}>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listaObjetos.map(objeto => (
                                <tr key={objeto.id}>
                                    
                                    <td>{objeto.id}</td>
                                    <td>{objeto.descricao}</td>
                                    <td>{objeto.produto}</td>
                                    <td>{objeto.qtde}</td>
                                    <td>{objeto.valor}</td>
                                    <td>{objeto.usuario}</td>
                                    <td>{objeto.email}</td>
                                    <td>{objeto.uid}</td>

                                    <td align="center">
                                      <button 
                                        className="btn btn-danger" 
                                        title="Remover"
                                        onClick={() => { 
                                          acaoRemover(objeto); 
                                        }}
                                      >
                                        <i className="bi bi-trash"></i>
                                      </button>
                                      <button 
                                        className="btn btn-info"
                                        data-bs-toggle="modal" 
                                        data-bs-target="#modalEdicao"
                                        onClick={() => {
                                          setObjeto(objeto);
                                          setEditar(true);
                                          setAlerta({ status: "", message: "" });
                                        }}
                                      >
                                        <i className="bi bi-pencil-square"></i>
                                      </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );

}

export default Tabela;
