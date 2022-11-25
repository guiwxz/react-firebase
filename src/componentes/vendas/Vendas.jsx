import { useState, useEffect, useMemo } from 'react';
import Tabela from './Tabela';
import VendasContext from './VendasContext';
import Form from './Form';
import { auth, db } from '../../firebaseConfig';
import { useAuthState } from "react-firebase-hooks/auth";
import {
  doc, 
  addDoc, 
  collection, 
  query, 
  onSnapshot, 
  updateDoc,
  deleteDoc, 
  where
} from "firebase/firestore";


function Vendas() {
  const [user, loading, error] = useAuthState(auth);

  const [listaObjetos, setListaObjetos] = useState([]);
  const [alerta, setAlerta] = useState({
    status: "", message: ""
  });

  const initialState = useMemo(() => ({
    id: "",
    descricao: "",
    produto: "",
    qtde: "",
    valor: "",
    uid: user?.uid, 
    usuario: user?.displayName, 
    email: user?.email,

  }), [user])

  const [objeto, setObjeto] = useState(initialState);
  
  const novoObjeto = () => {
    setObjeto(initialState);
  }
  const [editar, setEditar] = useState(false);

  useEffect(() => {
    if (user?.uid != null) {
      const uid = user?.uid;

      const colRef = collection(db, "vendas");
      const q = query(colRef, where("uid", "==", uid))

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
    }
  }, [user]);
  
  const acaoCadastrar = async (e) => {
    e.preventDefault();

    if (editar) {
      try {
        const postDocRef = doc(db, 'vendas', objeto.id)
        await updateDoc(postDocRef, {
          descricao: objeto.descricao,
          produto: objeto.produto,
          qtde: objeto.qtde,
          valor: objeto.valor,
          uid: objeto.uid,
          usuario: objeto.usuario,
          email: objeto.email
        })

        setAlerta({
          status: "success", message: "Venda atualizado com sucesso"
        });

      } catch (err) {
        setAlerta({
          status: "error", message: "Erro ao atualizar a venda: " + err
        });
      }

    } else { // novo
      try {
        addDoc(collection(db, 'vendas'),
          {
            descricao: objeto.descricao,
            produto: objeto.produto,
            qtde: objeto.qtde,
            valor: objeto.valor,
            uid: objeto.uid,
            usuario: objeto.usuario,
            email: objeto.email
          }).then(function (docRef) {
            setObjeto({ ...objeto, id: docRef.id });
          })
        setEditar(true);
        setAlerta({
          status: "success", message: "Venda criada com sucesso"
        });

      } catch (err) {
        setAlerta({
          status: "error", message: "Erro ao criar a venda: " + err
        });
      }
    }
  };

  const acaoRemover = async (objeto) => {
    if (window.confirm("Remover este objeto?")) {
      try {
        const vendaDocRef = doc(db, 'vendas', objeto.id)
        await deleteDoc(vendaDocRef);
        setAlerta({
          status: "success", message: "Venda removida com sucesso!"
        });

      } catch (err) {
        setAlerta({
          status: "error", message: "Erro ao remover: " + err
        });
      }
    }
  }

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setObjeto({ ...objeto, [name]: value });
  }

  return (
    <VendasContext.Provider value={
      {
        listaObjetos, 
        setListaObjetos, 
        acaoRemover,
        alerta, 
        setAlerta,
        objeto, 
        setObjeto,
        editar, 
        setEditar,
        acaoCadastrar, 
        handleChange, 
        novoObjeto
      }}>
      <Tabela />
      <Form />
    </VendasContext.Provider>
  );
}

export default Vendas;