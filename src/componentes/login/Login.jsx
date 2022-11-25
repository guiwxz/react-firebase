import { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { auth, signInWithGoogle } from '../../firebaseConfig';
import Alerta from '../Alerta';
import './signin.css';

import { useAuthState } from "react-firebase-hooks/auth";


function Login() {

    //const { pegaAutenticacao, gravaAutenticacao } = Autenticacao;
    const [user, loading, error] = useAuthState(auth);

    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [alerta, setAlerta] = useState({ status: "", message: "" });

    const navigate = useNavigate();

    const acaoLogin = async e => {

        e.preventDefault();

        try {

        } catch (err) {
            console.error(err.message);
        }
    };

    useEffect(() => {
      if (loading) {
      // maybe trigger a loading screen
      return;
      }
      if (user) navigate("/");
    }, [user, loading]); 


    return (
        <div>
            <body className="text-center">
                <Alerta alerta={alerta} />
                <main className="form-signin">
                    <form onSubmit={acaoLogin}>
                        <button 
                          className="w-100 btn btn-lg btn-primary" 
                          type="submit"
                          onClick={signInWithGoogle}
                        >
                            Login com Google
                        </button>
                    </form>
                </main>
            </body>
        </div>
    )

}

export default Login;