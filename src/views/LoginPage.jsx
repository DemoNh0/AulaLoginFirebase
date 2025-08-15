// import { auth } from '../firebase/config.js';
import { useState } from 'react';
import { auth } from '../firebase/config';
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from 'firebase/auth';

function LoginPage() {
    const [loginType, setLoginType] = useState('login');
    const [userCredentials, setUserCredentials] = useState({})

    console.log(auth)

    function handleCredenciais(e) {
        setUserCredentials({...userCredentials,[e.target.name]:e.target.value})
    }

    function handleCriarConta(e) {
        e.preventDefault()

        createUserWithEmailAndPassword(auth, userCredentials.email, userCredentials.password)
        .then((userCredential) => {
            // Signed up 
            const user = userCredential.user;
            console.log(user);
            console.log('Sucesso')
            // ...
        })
        .catch((error) => {
            // const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorMessage);
            console.log('Erro');
            // ..
        });
    }

    function handleEntrarConta(e) {
        e.preventDefault()

        const auth = getAuth();
        signInWithEmailAndPassword(auth, userCredentials.email, userCredentials.password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            console.log(user);
            console.log('Sucesso');
            // ...
        })
        .catch((error) => {
            // const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorMessage);
            console.log('Erro');
        });
    }

    return (
        <>
            <div className="container login-page">
                <section>
                    <h1>Etec Albert Einstein</h1>
                    <p>Entre ou crie uma conta para continuar.</p>
                    <div className="login-type">
                        <button 
                            className={`btn ${loginType === 'login' ? 'selected' : ''}`}
                            onClick={() => setLoginType('login')}>
                            Entrar
                        </button>
                        <button 
                            className={`btn ${loginType === 'signup' ? 'selected' : ''}`}
                            onClick={() => setLoginType('signup')}>
                            Criar Conta
                        </button>
                    </div>
                    <form className="add-form login">
                        <div className="form-control">
                            <label>E-mail *</label>
                            <input onChange={(e) =>{handleCredenciais(e)}} type="text" name="email" placeholder="Informe seu email" />
                        </div>
                        <div className="form-control">
                            <label>Senha *</label>
                            <input onChange={(e) =>{handleCredenciais(e)}} type="password" name="password" placeholder="Informe a senha" />
                        </div>
                        {
                            loginType === 'login' ?
                            <button onClick={(e)=>{handleEntrarConta(e)}} className="active btn btn-block">Entrar</button>
                            : 
                            <button onClick={(e)=>{handleCriarConta(e)}} className="active btn btn-block">Criar Conta</button>
                        }
                        <button className="active btn btn-block">Login com Google</button>
                        <p className="forgot-password">Esqueci minha senha.</p>
                    </form>
                </section>
            </div>
        </>
    );
}

export default LoginPage;