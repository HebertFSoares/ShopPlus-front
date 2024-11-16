import React, { useState } from "react";
import "../styles/styles.css";
import SignInForm from "./SignIn"; // Caminho atualizado
import SignUpForm from "./SignUp"; // Caminho atualizado

export default function App() {
  const [type, setType] = useState("signIn");

  const handleOnClick = (text) => {
    if (text !== type) {
      setType(text);
    }
  };

  const containerClass =
    "container " + (type === "signUp" ? "right-panel-active" : "");


  return (
    
    <div className="App">
      <div className={containerClass} id="container">
        <SignUpForm />
        <SignInForm />
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>Bem vindo de volta!</h1>
              <p>
                Para se manter conectado conosco, faça login com suas informações pessoais
              </p>
              <button
                className="ghost"
                id="signIn"
                onClick={() => handleOnClick("signIn")}
              >
                Entrar
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1>Olá amigo!</h1>
              <p>Insira seus dados pessoais e comece sua jornada conosco</p>
              <button
                className="ghost"
                id="signUp"
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
