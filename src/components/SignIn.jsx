import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import googleIcon from '../utils/pesquisa.png';
import facebookIcon from '../utils/facebook.png';
import linkedinIcon from '../utils/linkedin.png';

function SignInForm() {
  const navigate = useNavigate();
  const [state, setState] = useState({
    email: "",
    password: ""
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    // Verifica se o token já está presente
    const token = localStorage.getItem("token");
    if (token) {
      // Se houver token, redireciona para a página principal
      navigate("/"); // Ajuste o caminho de acordo com sua necessidade
    }

    // Preenche o campo de email se houver um e-mail armazenado no localStorage
    const storedEmail = localStorage.getItem("email");
    if (storedEmail) {
      setState((prevState) => ({
        ...prevState,
        email: storedEmail,
      }));
    }
  }, [navigate]);

  const handleChange = (evt) => {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value
    });
  };

  const handleOnSubmit = async (evt) => {
    evt.preventDefault();

    const { email, password } = state;

    try {
      const response = await fetch("http://localhost:8080/api/auth/cliente", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Falha na autenticação");
      }

      const data = await response.json();
      localStorage.setItem("token", data.token);

      // Armazena o e-mail no localStorage para uso futuro
      localStorage.setItem("email", email);

      alert("Login bem-sucedido!");
      console.log("Token armazenado com sucesso:", data.token);

      // Redireciona para a página principal após o login
      navigate("/"); // Ajuste o caminho de acordo com sua necessidade

      setState({
        email: "",
        password: ""
      });
      setError(null);
    } catch (error) {
      setError("Credenciais inválidas, tente novamente.");
    }
  };

  return (
    <div id="sign-in-form-container" className="form-container sign-in-container">
      <form onSubmit={handleOnSubmit} id="sign-up-form">
        <h1 id="login-heading">Entre na Shop Plus</h1>
        <div className="social-container">
          <a href="//shopplus-frontend" className="social">
            <img
              src={googleIcon}
              alt="Google"
              style={{
                width: "20px",
                height: "20px",
                borderRadius: "50%"
              }}
            />
          </a>
          <a href="//shopplus-frontend" className="social">
            <img
              src={facebookIcon}
              alt="Facebook"
              style={{
                width: "20px",
                height: "20px",
                borderRadius: "50%"
              }}
            />
          </a>
          <a href="//shopplus-frontend" className="social">
            <img
              src={linkedinIcon}
              alt="LinkedIn"
              style={{
                width: "20px",
                height: "20px",
                borderRadius: "50%"
              }}
            />
          </a>
        </div>
        <span id="or-login-with-email">ou entre com seu e-mail</span>
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={state.email}
          onChange={handleChange}
          id="email-input"
        />
        <input
          type="password"
          name="password"
          placeholder="Senha"
          value={state.password}
          onChange={handleChange}
          id="password-input"
        />
        <a href="//shopplus-frontend" id="forgot-password-link">Esqueceu sua senha?</a>
        <button type="submit" className="form-button" id="submit-button">Entrar</button>
        {error && <p id="error-message" style={{ color: "red" }}>{error}</p>}
      </form>
    </div>
  );
}

export default SignInForm;
