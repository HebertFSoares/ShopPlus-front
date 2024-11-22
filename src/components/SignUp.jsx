import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import googleIcon from '../utils/pesquisa.png';
import facebookIcon from '../utils/facebook.png';
import linkedinIcon from '../utils/linkedin.png';

function SignUpForm() {
  const navigate = useNavigate();
  const [state, setState] = useState({
    name: "",
    email: "",
    password: "",
    cpf: "",
    cep: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [otpSent, setOtpSent] = useState(false);

  useEffect(() => {
    // Verifica se o token já está presente
    const token = localStorage.getItem("token");
    if (token) {
      // Se houver token, redireciona para a página principal
      navigate("/home"); // Ajuste o caminho de acordo com sua necessidade
    }
  }, [navigate]);

  const handleChange = (evt) => {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value,
    });
  };

  const handleOnSubmit = async (evt) => {
    evt.preventDefault();
  
    const { name, cpf, email, password, cep } = state;
  
    // Verificação de campos obrigatórios
    if (!name || !email || !password || !cpf || !cep) {
      setError("Por favor, preencha todos os campos.");
      return;
    }
  
    setLoading(true);
    setError(null);
  
    try {
      const response = await fetch("http://localhost:8080/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nome: name,
          cpf,
          email,
          password,
          cep,
        }),
      });
  
      const data = await response.json();
  
      if (response.status === 200 || response.status === 201) {
        alert("Cadastro realizado com sucesso! Enviamos um código de verificação para o seu e-mail.");
  
        localStorage.setItem('userEmail', email);
        setOtpSent(true);
        setState({
          name: "",
          email: "",
          password: "",
          cpf: "",
          cep: "",
        });
        navigate("/otp");
      } else {
        setError(data.message || "Erro ao realizar o cadastro.");
      }
    } catch (error) {
      setError("Ocorreu um erro ao tentar se cadastrar.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="sign-up-form-container" className="form-container sign-up-container">
      <form id="sign-up-form" onSubmit={handleOnSubmit} className="sign-up-form">
        <h1 id="login-heading">Crie sua conta</h1>
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
        <span id="or-login-with-email">ou cadastre-se com seu e-mail</span>
        <input
          id="input-name"
          type="text"
          placeholder="Nome"
          name="name"
          value={state.name}
          onChange={handleChange}
          className="form-input"
        />
        <input
          id="input-cpf"
          type="text"
          placeholder="CPF"
          name="cpf"
          value={state.cpf}
          onChange={handleChange}
          className="form-input"
        />
        <input
          id="input-email"
          type="email"
          placeholder="E-mail"
          name="email"
          value={state.email}
          onChange={handleChange}
          className="form-input"
        />
        <input
          id="input-password"
          type="password"
          placeholder="Senha"
          name="password"
          value={state.password}
          onChange={handleChange}
          className="form-input"
        />
        <input
          id="input-cep"
          type="text"
          placeholder="CEP"
          name="cep"
          value={state.cep}
          onChange={handleChange}
          className="form-input"
        />
        <button
          id="submit-button"
          type="submit"
          className="form-button"
          disabled={loading}
        >
          {loading ? "Cadastrando..." : "Cadastrar"}
        </button>
        {error && <p id="error-message" style={{ color: "red" }}>{error}</p>}
      </form>
    </div>
  );
}

export default SignUpForm;
