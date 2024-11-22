import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/styles.css";
import SignInForm from "../components/SignIn"; 
import SignUpForm from "../components/SignUp"; 

export default function Login() {
  const [type, setType] = useState("signIn");
  const navigate = useNavigate();

  useEffect(() => {
    // Verifica se o token já está presente
    const token = localStorage.getItem("token");
    if (token) {
      // Se houver token, redireciona para a página principal (home)
      navigate("/home"); 
    }
  }, [navigate]);

  const handleOnClick = (text) => {
    if (text !== type) {
      setType(text);
    }
  };

  const containerClass =
    "container " + (type === "signUp" ? "right-panel-active" : "");

  // Defina o id "login-page" para o body apenas nesta tela
  useEffect(() => {
    document.body.id = "login-page"; // Aqui você define o id no body

    return () => {
      document.body.id = ""; // Remove o id ao sair da tela de login/cadastro
    };
  }, []);

  return (
    <div id="login-container" className="App">
      <div className={containerClass} id="container">
        {/* Condicionalmente exibe o formulário com base no estado "type" */}
        {type === "signUp" ? (
          <SignUpForm id="sign-up-form" className="form sign-up-form" />
        ) : (
          <SignInForm id="sign-in-form" className="form sign-in-form" />
        )}
        
        <div id="overlay-container" className="overlay-container">
          <div id="overlay" className="overlay">
            <div id="overlay-left" className="overlay-panel overlay-left">
              <h1 id="welcome-back-title">Bem-vindo de volta!</h1>
              <p id="welcome-back-text">
                Para se manter conectado conosco, faça login com suas informações pessoais
              </p>
              <button
                id="submit-button"
                className="ghost"
                onClick={() => handleOnClick("signIn")}
              >
                Entrar
              </button>
            </div>
            <div id="overlay-right" className="overlay-panel overlay-right">
              <h1 id="welcome-back-title">Olá amigo!</h1>
              <p id="welcome-back-text">Insira seus dados pessoais e comece sua jornada conosco</p>
              <button
                id="submit-button"
                className="ghost"
                onClick={() => handleOnClick("signUp")}
              >
                Inscrever-se
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
