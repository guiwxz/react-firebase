import { useState, useEffect } from 'react';
import { db } from '../firebaseConfig';
import { collection, query, onSnapshot } from "firebase/firestore";


const Home = () => {

  const [listaObjetos, setListaObjetos] = useState([]);

  useEffect(() => {
    const q = query(collection(db, 'vendas'))

    onSnapshot(q, (querySnapshot) => {
      setListaObjetos(querySnapshot.docs.map(doc => ({
        id: doc.id,
        descricao: doc.data().descricao,
        produto: doc.data().produto,
        qtde: doc.data().qtde,
        valor: doc.data().valor,
        usuario: doc.data().usuario,
        email: doc.data().email,
        uid: doc.data().uid
      })))
    })
  }, []);

  return (
    <div style={{ padding: '20px' }}>

      <div className="row" style={{ padding: '0 12vw' }}>
      <h1>Firebase com Firestore - VENDAS - PWA</h1>
        {listaObjetos.length === 0 && <h2>Nenhum registro encontrado</h2>}
        {listaObjetos.length > 0 && (

          listaObjetos.map(objeto => (
            <div className="col-sm-12" style={{ marginBottom: '24px' }}>
              <div className="card">
                <div className="card-body">
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <h5 className="card-title">{objeto.descricao}</h5>
                    <h5 className="card-title">R${objeto.valor}</h5>
                  </div>
                  <p className="card-text">{objeto.produto} - <small className="text-muted">Quantidade:</small> {objeto.qtde} </p>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span className="card-text"><small className="text-muted">Usuário: {objeto.usuario}</small></span>
                    <span className="card-text"><small className="text-muted">Email: {objeto.email}</small></span>

                  </div>
                </div>
              </div>
            </div>
          ))

        )}
      </div>
    </div>
  )
};

export default Home;