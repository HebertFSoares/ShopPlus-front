import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/styles.css";
import SignInForm from "../components/SignIn"; 
import SignUpForm from "../components/SignUp"; 
import LoginMobile from "../pages/LoginMobile"; // Importa o LoginMobile
import SignUpMobile from "../pages/SignUpMobile"; // Importa o SignUpMobile

export default function Login() {
  const [type, setType] = useState("signIn");
  const [isMobile, setIsMobile] = useState(false); // Estado para controlar a detecção do dispositivo
  const [email, setEmail] = useState(''); // Estado para armazenar o email
  const navigate = useNavigate();

  useEffect(() => {
    // Verifica se já existe um token de autenticação
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/"); 
    }

    // Verifica o email armazenado no localStorage e o define no estado
    const storedEmail = localStorage.getItem('userEmail');
    if (storedEmail) {
      setEmail(storedEmail); // Definir o email no estado
    }
  }, [navigate]);

  // Detecta se a largura da tela é menor que 768px para definir se é mobile
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // Define isMobile conforme o tamanho da tela
    };

    handleResize(); // Chama uma vez para definir o estado inicial
    window.addEventListener("resize", handleResize); // Adiciona event listener para redimensionamento

    return () => window.removeEventListener("resize", handleResize); // Limpa o event listener ao desmontar
  }, []);

  const handleOnClick = (text) => {
    if (text !== type) {
      setType(text);
    }
  };

  const containerClass = "container " + (type === "signUp" ? "right-panel-active" : "");

  useEffect(() => {
    document.body.id = "login-page";
    return () => {
      document.body.id = ""; 
    };
  }, []);

  const handleGoHome = () => {
    navigate("/"); // Redireciona para a página inicial
  };

  return (
    <div id="login-container" className="App">
      {/* Botão de voltar */}
      <button
        onClick={handleGoHome}
        className="absolute top-4 left-4 w-10 h-10 p-1 bg-purple-600 text-white rounded-full hover:bg-purple-400"
      >
        <span className="text-2xl">&lt;</span>
      </button>

      {/* Renderiza LoginMobile ou SignUpMobile para dispositivos móveis, ou os formulários para desktop */}
      {isMobile ? (
        type === "signUp" ? (
          <SignUpMobile /> // Exibe a tela de cadastro para mobile
        ) : (
          <LoginMobile /> // Exibe a tela de login para mobile
        )
      ) : (
        <div className={containerClass} id="container">
          {/* Exibe os formulários conforme o tipo (SignIn ou SignUp) */}
          {type === "signUp" ? (
            <SignUpForm id="sign-up-form" className="form sign-up-form" />
          ) : (
            <SignInForm 
              id="sign-in-form" 
              className="form sign-in-form"
              email={email} // Passa o email para o SignInForm
            />
          )}

          {/* Overlay exibido apenas em telas grandes */}
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
      )}
    </div>
  );
}
